import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import PubSub from 'pubsub-js';
import { CREATE_ROLE_SUCCESS, OPEN_CREATE_ROLE_MODAL } from 'Config/pubsub';
import { requestCreateRole } from 'Api/backend-api';

const CreateRole = () => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const token = PubSub.subscribe(OPEN_CREATE_ROLE_MODAL, subscriber);
		return () => {
			PubSub.unsubscribe(token);
		};
	}, []);

	const subscriber = () => {
		setVisible(true);
	};

	const handleOk = async name => {
		const result = await requestCreateRole(name);
		const { status, data } = result.data;
		if (status === 0) {
			setVisible(false);
			message.success('Created role successfully');
			PubSub.publish(CREATE_ROLE_SUCCESS, data);
		} else {
			message.error('Created role failed', 1);
			return Promise.reject('Created role failed');
		}
	};

	const handleCancel = () => {
		form.resetFields();
		setVisible(false);
	};

	return (
		<Modal
			visible={visible}
			title='Create a new role'
			okText='Confirm'
			cancelText='Cancel'
			onCancel={handleCancel}
			onOk={() => {
				form
					.validateFields()
					.then(values => {
						handleOk(values.name);
					})
					.then(() => {
						form.resetFields();
					})
					.catch(() => {});
			}}
		>
			<Form
				form={form}
				layout='vertical'
				name='form_in_modal'
				initialValues={{}}
			>
				<Form.Item
					name='name'
					label='Name'
					rules={[
						{
							required: true,
							message: 'Please enter the name of the role',
						},
					]}
				>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default CreateRole;
