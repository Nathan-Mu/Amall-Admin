import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import {
	CREATE_USER_SUCCESS,
	OPEN_USER_MODAL,
	UPDATE_USER_SUCCESS,
} from 'Config/pubsub';
import PubSub from 'pubsub-js';
import { requestCreateUser, requestUpdateUser } from 'Api/backend-api';
const { Option } = Select;

export default function UserModal() {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [action, setAction] = useState('Create');
	const [roles, setRoles] = useState([]);
	const [id, setId] = useState('');
	const isCreating = action === 'Create';

	useEffect(() => {
		const token = PubSub.subscribe(OPEN_USER_MODAL, subscriber);
		return () => {
			PubSub.unsubscribe(token);
		};
	}, []);

	const subscriber = (_, data) => {
		if (data) {
			setVisible(true);
			setRoles(data.roles);
			if (data.user) {
				setAction('Edit');
				setId(data.user.id);
				form.setFieldsValue(data.user);
			} else {
				setAction('Create');
			}
		}
	};

	const handleOk = async values => {
		const { username, password, email, mobile, roleId } = values;
		const result = isCreating
			? await requestCreateUser(username, password, mobile, email, roleId)
			: await requestUpdateUser(id, username, mobile, email, roleId);
		const { status, data } = result.data;
		if (status === 0) {
			isCreating
				? PubSub.publish(CREATE_USER_SUCCESS, data)
				: PubSub.publish(UPDATE_USER_SUCCESS, data);
			message.success(`${action} user successfully`);
			setVisible(false);
		} else {
			message.error('Username existed');
		}
	};

	const handleCancel = () => {
		form.resetFields();
		setVisible(false);
	};

	return (
		<Modal
			visible={visible}
			title={`${action} a user`}
			okText='Confirm'
			cancelText='Cancel'
			onCancel={handleCancel}
			onOk={() => {
				form
					.validateFields()
					.then(values => {
						handleOk(values);
					})
					.then(() => {
						form.resetFields();
					})
					.catch(() => {});
			}}
		>
			<Form form={form} layout='vertical' name='form_in_modal'>
				<Form.Item
					name='username'
					label='Username'
					rules={[
						{
							required: true,
							message: 'Please enter the username',
						},
						{
							max: 12,
							message: 'Username cannot be longer than 12 characters',
						},
						{ min: 4, message: 'Username cannot be shorter than 4 characters' },
						{
							pattern: /^\w+$/,
							message: `Username can only be letters, numbers and _`,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name='mobile'
					label='Mobile'
					validateTrigger={['onChange', 'onBlur']}
					rules={[
						{
							required: true,
							message: 'Please enter the mobile',
							validateTrigger: ['onChange', 'onBlur'],
						},
						{
							pattern: /^\d{1,9}$/,
							message: `Mobile number should be 9 digits`,
							validateTrigger: 'onChange',
						},
						{
							len: 9,
							message: `Mobile number should be 9 digits`,
							validateTrigger: 'onBlur',
						},
					]}
				>
					<Input addonBefore='+61' />
				</Form.Item>
				<Form.Item
					name='email'
					label='Email'
					validateTrigger={['onChange', 'onBlur']}
					rules={[
						{
							required: true,
							message: 'Please enter the email',
							validateTrigger: ['onChange', 'onBlur'],
						},
						{
							pattern: /^([\w\d_\-.])+@([\w\d_\-.])+\.([\w]{2,4})$/,
							message: 'Please a valid email address',
							validateTrigger: 'onBlur',
						},
					]}
				>
					<Input />
				</Form.Item>
				{isCreating && (
					<Form.Item
						name='password'
						label='Password'
						rules={[
							{
								required: true,
								message: 'Please enter the password',
							},
							{
								max: 12,
								message: 'Password cannot be longer than 12 characters',
							},
							{
								min: 4,
								message: 'Password cannot be shorter than 4 characters',
							},
							{
								pattern: /^\w+$/,
								message: `Password can only be letters`,
							},
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>
				)}
				{isCreating && (
					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error("The two passwords don't match!")
									);
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
				)}
				<Form.Item
					name='roleId'
					label='Role'
					rules={[
						{
							required: true,
							message: 'Please select the role',
						},
					]}
				>
					<Select placeholder='Select a role' allowClear>
						{roles.map(role => (
							<Option value={role.id} key={role.id}>
								{role.name}
							</Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}
