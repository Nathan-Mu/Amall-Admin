import React, { Component } from 'react';
import {
	Form,
	Card,
	Input,
	Button,
	Select,
	Switch,
	message,
	Spin,
	InputNumber,
} from 'antd';
import ImageUploader from './ImageUploader/ImageUploader';
import RichTextEditor from './TextEditor/RichTextEditor';
import {
	requestSearchCategoryById,
	requestSearchProductById,
	requestAllCategories,
	requestCreateProduct,
	requestUpdateProduct,
} from 'Api/backend-api';
const { Option } = Select;
const { TextArea } = Input;

export default class Editable extends Component {
	state = { isLoading: true, reload: false, categories: [] };

	shouldComponentUpdate(nextProps, nextState) {
		if (
			nextProps.location.pathname === '/admin/products/create' &&
			this.props.location.pathname !== '/admin/products/create'
		) {
			this.setState({ reload: true });
		}
		if (nextState.reload) {
			this.setState({ reload: false });
		}
		return true;
	}

	async componentDidMount() {
		let product = await this.getProduct();
		if (product) {
			const {
				// status: isSelling,
				imgs: images,
				name,
				categoryId: category,
				desc: description,
				price,
				detail: details,
			} = product;
			this.formRef.current.setFieldsValue({
				// isSelling: isSelling === 1,
				images,
				name,
				description,
				category,
				price,
				details,
			});
		}
		let categories = await this.retrieveAllCategories();
		if (categories) this.setState({ categories });
		this.setState({ isLoading: false });
	}

	getProduct = async () => {
		const { pathname, state } = this.props.history.location;
		const { id } = this.props.match.params;
		if (state && state.product) {
			this.props.history.replace(pathname);
			return state && state.product;
		} else if (id) {
			return await this.retrieveProductById(id);
		}
	};

	retrieveAllCategories = async () => {
		let result = await requestAllCategories();
		const { data, status } = result.data;
		if (status !== 0) {
			message.error('request categories failed');
		} else {
			return data;
		}
	};

	retrieveProductById = async id => {
		let result = await requestSearchProductById(id);
		const { data, status } = result.data;
		if (status !== 0) {
			message.error('request product failed');
		} else {
			return data;
		}
	};

	formRef = React.createRef();

	retrieveCategory = async product => {
		if (product) {
			let result = await requestSearchCategoryById(product.categoryId);
			const { data, status } = result.data;
			if (status !== 0) {
				message.error('request category failed');
			} else {
				return data;
			}
		}
	};

	onFinish = async values => {
		const { location, history } = this.props;
		const { pathname } = location;
		const { params } = this.props.match;
		let requestData = {
			categoryId: values.category,
			name: values.name,
			desc: values.description,
			price: values.price,
			detail: values.details,
			imgs: values.images,
		};
		let isCreating = pathname === '/admin/products/create';
		if (!isCreating) requestData._id = params.id;
		let result = isCreating
			? await requestCreateProduct(requestData)
			: await requestUpdateProduct(requestData);
		const { status, data } = result.data;
		if (status === 0) {
			const id = data ? data._id : params.id;
			history.replace(`/admin/products/details/${id}`);
		} else {
			message.error('Create/Update product failed');
		}
	};

	uploaderRef = React.createRef();

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	layout = {
		regularLayout: {
			labelCol: { span: 5 },
			wrapperCol: { span: 10 },
		},
		shortLayout: {
			labelCol: { span: 5 },
			wrapperCol: { span: 5 },
		},
		longLayout: {
			labelCol: { span: 5 },
			wrapperCol: { span: 14 },
		},
		tailLayout: {
			wrapperCol: { offset: 5, span: 10 },
		},
	};

	render() {
		const { regularLayout, shortLayout, longLayout, tailLayout } = this.layout;
		const { categories, reload, isLoading } = this.state;
		return (
			<Card className='editable'>
				{!reload && (
					<Spin spinning={isLoading}>
						<Form
							{...regularLayout}
							onFinish={this.onFinish}
							onFinishFailed={this.onFinishFailed}
							ref={this.formRef}
						>
							<Form.Item
								label='Product Name'
								name='name'
								rules={[
									{ required: true, message: 'Please enter the product name' },
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label='Description'
								name='description'
								rules={[
									{ required: true, message: 'Please enter the description' },
								]}
							>
								<TextArea />
							</Form.Item>

							<Form.Item
								label='Category'
								name='category'
								{...shortLayout}
								rules={[{ required: true }]}
							>
								<Select>
									{categories.map(category => (
										<Option value={category._id} key={category._id}>
											{category.name}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item
								label='Price'
								name='price'
								{...shortLayout}
								rules={[
									{ required: true, message: 'Please enter the price' },
									{
										pattern: /^[1-9][0-9]*(.[0-9]{1,2})?$/,
										message: `Please enter a valid price`,
									},
								]}
							>
								<InputNumber
									style={{ width: '100%' }}
									formatter={value =>
										`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
								/>
							</Form.Item>

							{/* <Form.Item
								label='Selling'
								name='isSelling'
								valuePropName='checked'
								initialValue={false}
								rules={[
									{ required: true, message: 'Please choose the status' },
								]}
							>
								<Switch />
							</Form.Item> */}

							{!this.state.isLoading && (
								<Form.Item
									label='Images'
									name='images'
									{...longLayout}
									rules={[
										{
											required: true,
											message: 'Please upload at least one image',
										},
									]}
								>
									<ImageUploader ref={this.uploaderRef} />
								</Form.Item>
							)}

							{!this.state.isLoading && (
								<Form.Item
									{...longLayout}
									name='details'
									label='Details'
									rules={[
										{ required: true, message: 'Please enter the details' },
									]}
								>
									<RichTextEditor />
								</Form.Item>
							)}

							<Form.Item {...tailLayout}>
								<Button type='primary' htmlType='submit'>
									Submit
								</Button>
							</Form.Item>
						</Form>
					</Spin>
				)}
			</Card>
		);
	}
}
