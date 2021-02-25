import React, { Component } from 'react';
import {
	Card,
	Button,
	Select,
	Input,
	Form,
	Table,
	Switch,
	message,
} from 'antd';
import {
	PlusCircleOutlined,
	SearchOutlined,
	CheckOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import {
	requestPagedProducts,
	requestUpdateProductStatus,
	requestSearchPagedProducts,
} from 'Api/backend-api';
import './Products.scss';
import { DEFAULT_PAGE_SIZE } from 'Config';
const { Option } = Select;

class Products extends Component {
	constructor(props) {
		super(props);
		const historyState = this.props.history.location.state || {};
		const {
			pageSize = DEFAULT_PAGE_SIZE,
			current = 1,
			keyword,
			searchBy,
		} = historyState;
		this.state = {
			products: [],
			total: 0,
			isLoading: true,
			pageSize,
			current,
			keyword,
			searchBy,
		};
	}

	async componentDidMount() {
		this.props.history.replace(this.props.location.pathname, {});
		this.retrievePagedProducts({});
	}

	handleStatusChange = async (id, checked) => {
		let result = await requestUpdateProductStatus(id, checked);
		let { status } = result.data;
		if (status === 0) {
			const { products } = this.state;
			products.forEach(product => {
				if (product._id === id) {
					product.status = checked ? 1 : 2;
				}
			});
			this.setState({ products });
		} else {
			message.error('Update status failed');
		}
	};

	savePageBeforeLeave = () => {
		const { history } = this.props;
		const { location } = history;
		const { keyword, pageNo, pageSize, searchBy } = this.state;
		history.replace(location.pathname, { keyword, pageNo, pageSize, searchBy });
	};

	handleFormSubmit = ({ keyword, searchBy }) => {
		this.setState({ isLoading: true });
		this.retrievePagedProducts({ keyword, searchBy });
	};

	handlePageChange = pagination => {
		const { current, pageSize } = pagination;
		this.setState({ isLoading: true });
		pageSize !== this.state.pageSize
			? this.retrievePagedProducts({ pageSize })
			: this.retrievePagedProducts({ current, pageSize });
	};

	retrievePagedProducts = async ({
		current = 1,
		pageSize = this.state.pageSize,
		keyword = this.state.keyword,
		searchBy = this.state.searchBy,
	}) => {
		let result = keyword
			? await requestSearchPagedProducts(keyword, searchBy, current, pageSize)
			: await requestPagedProducts(current, pageSize);
		const { data, status } = result.data;
		if (status === 0) {
			this.setState({
				products: data.list,
				total: data.total,
				current,
				pageSize,
				searchBy,
				keyword,
				isLoading: false,
			});
		} else {
			message.error('Retrieve products failed');
			// IMPROVE: show 404 page instead of no data
			this.setState({ isLoading: false });
		}
	};

	render() {
		const { total, current, pageSize, isLoading, keyword } = this.state;
		const dataSource = this.state.products;
		const columns = [
			{
				title: 'Product Name',
				dataIndex: 'name',
				align: 'center',
			},
			{
				title: 'Product Description',
				dataIndex: 'desc',
				align: 'center',
			},
			{
				title: 'Price',
				dataIndex: 'price',
				align: 'center',
				width: '10%',
				render: price => `$${price.toLocaleString()}`,
			},
			{
				title: 'Status',
				align: 'center',
				width: '12%',
				render: item => (
					<>
						<span>Selling:&nbsp;&nbsp;</span>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={item.status === 1}
							onChange={checked => this.handleStatusChange(item._id, checked)}
						/>
					</>
				),
			},
			{
				title: 'Actions',
				align: 'center',
				width: '18%',
				render: item => (
					<>
						<Button
							className='actions-button'
							onClick={() => {
								this.savePageBeforeLeave();
								this.props.history.push(`/admin/products/details/${item._id}`, {
									product: item,
								});
							}}
						>
							Details
						</Button>
						&nbsp;&nbsp;
						<Button
							className='actions-button'
							onClick={() => {
								this.savePageBeforeLeave();
								this.props.history.push(`/admin/products/edit/${item._id}`, {
									product: item,
								});
							}}
						>
							Edit
						</Button>
					</>
				),
			},
		];
		return (
			<Card
				className='products'
				title={
					<>
						<Form
							layout='inline'
							initialValues={{ searchBy: 'productName' }}
							onFinish={this.handleFormSubmit}
						>
							<Form.Item name='searchBy' rules={[{ required: true }]}>
								<Select className='search-select'>
									<Option value='productName'>search by name</Option>
									<Option value='productDesc'>search by description</Option>
								</Select>
							</Form.Item>
							<Form.Item name='keyword' initialValue={keyword}>
								<Input placeholder='keyword' allowClear />
							</Form.Item>
							<Form.Item>
								<Button type='primary' htmlType='submit'>
									<SearchOutlined />
									Search
								</Button>
							</Form.Item>
						</Form>
					</>
				}
				extra={
					<Button
						type='primary'
						onClick={() => {
							this.props.history.push('/admin/products/create');
						}}
					>
						<PlusCircleOutlined /> Create
					</Button>
				}
			>
				<Table
					dataSource={dataSource}
					columns={columns}
					loading={isLoading}
					bordered
					size='middle'
					rowKey='_id'
					onChange={this.handlePageChange}
					pagination={{
						total,
						current,
						pageSize,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: total => `Total ${total.toLocaleString()} items`,
						pageSizeOptions: [5, 10, 20, 50],
					}}
				/>
			</Card>
		);
	}
}

export default Products;
