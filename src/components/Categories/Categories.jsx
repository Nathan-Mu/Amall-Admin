import React, { Component } from 'react';
import { Card, Button, Table, message, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './Categories.scss';
import {
	requestAllCategories,
	requestCreateCategory,
	requestUpdateCategoryName,
} from 'Api/backend-api';

export default class Categories extends Component {
	state = {
		isModalVisible: false,
		categories: [],
		operation: '',
		selectedCategory: {},
		isLoading: true,
	};

	async componentDidMount() {
		this.initData();
	}

	initData = async () => {
		let result = await requestAllCategories();
		let { status, data } = result.data;
		if (status !== 0) {
			message.error('Network request failed');
			// IMPROVE: show 404 page instead of no data
			this.setState({ isLoading: false });
		} else {
			const categories = data.reverse();
			// this.props.stageCategories(categories);
			this.setState({ categories, isLoading: false });
		}
	};

	showCreateModal = () => {
		this.setState({
			isModalVisible: true,
			operation: 'create',
			selectedCategory: {},
		});
	};

	showUpdateModal = data => {
		this.setState({
			isModalVisible: true,
			operation: 'update',
			selectedCategory: data,
		});
	};

	handleOk = async (categoryName, categoryId) => {
		const { operation } = this.state;
		operation === 'update'
			? await this.updateCategory(categoryName, categoryId)
			: await this.createCategory(categoryName);
		this.setState({ isModalVisible: false });
	};

	createCategory = async categoryName => {
		let result = await requestCreateCategory(categoryName);
		const { status, data } = result.data;
		if (status === 0) {
			let categories = [data, ...this.state.categories];
			this.props.stageCategories(categories);
			this.setState({ isModalVisible: false, categories });
		} else {
			return new Promise((resolve, reject) => {
				reject({ msg: 'Item existed' });
			});
		}
	};

	updateCategory = async (categoryName, categoryId) => {
		let result = await requestUpdateCategoryName(categoryName, categoryId);
		const { status } = result.data;
		if (status === 0) {
			// TODO: should check if the name exists or not (backend)
			this.initData();
		} else {
			return new Promise((resolve, reject) => {
				reject({ msg: 'Update failed' });
			});
		}
	};

	handleCancel = () => {
		this.setState({ isModalVisible: false });
	};

	render() {
		const dataSource = this.state.categories;
		const columns = [
			{
				title: 'Category',
				dataIndex: 'name',
				key: 'categoryName',
				width: '60%',
			},
			{
				title: 'Action',
				key: 'action',
				render: data => (
					<Button
						type='link'
						className='edit-btn'
						onClick={() => {
							this.showUpdateModal(data);
						}}
					>
						Update
					</Button>
				),
			},
		];
		const {
			isModalVisible,
			operation,
			selectedCategory,
			isLoading,
		} = this.state;

		return (
			<>
				<Card
					extra={
						<Button type='primary' onClick={this.showCreateModal}>
							<PlusCircleOutlined /> Create
						</Button>
					}
					className='categories'
				>
					<Table
						dataSource={dataSource}
						columns={columns}
						size='small'
						bordered
						rowKey='_id'
						pagination={{ pageSize: 10, showQuickJumper: true }}
						loading={isLoading}
					/>
				</Card>
				<CategoryForm
					visible={isModalVisible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					operation={operation}
					selectedCategory={selectedCategory}
				/>
			</>
		);
	}
}

const CategoryForm = ({
	visible,
	operation,
	onOk,
	onCancel,
	selectedCategory,
}) => {
	const [form] = Form.useForm();
	const title =
		operation === 'update' ? 'Update a category' : 'Create a new category';
	const okText = operation === 'update' ? 'Update' : 'Create';
	const handleCancel = () => {
		form.resetFields();
		onCancel();
	};
	const handleOk = () => {
		form
			.validateFields()
			.then(values => onOk(values.categoryName, selectedCategory._id))
			.then(() => {
				form.resetFields();
				operation === 'update'
					? message.success('Successfully update a category')
					: message.success('Successfully create a new category');
			})
			.catch(error => {
				error.msg
					? message.warn(error.msg, 1)
					: message.warn('The form input is incorrect, please check', 1);
			});
	};
	React.useEffect(() => {
		form.setFieldsValue({ categoryName: selectedCategory.name });
	});
	return (
		<Modal
			visible={visible}
			title={title}
			okText={okText}
			cancelText='Cancel'
			onCancel={handleCancel}
			onOk={handleOk}
			forceRender
		>
			<Form form={form} layout='vertical' name='form_in_modal'>
				<Form.Item
					name='categoryName'
					rules={[{ required: true, message: 'Please enter a category name' }]}
				>
					<Input placeholder='Please enter a category name' />
				</Form.Item>
			</Form>
		</Modal>
	);
};
