import React, { Component } from 'react';
import './index.css';
import logo from './imgs/logo.png';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {
	onFinish = values => {
		console.log('Received values of form: ', values);
	};

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	pwdValidator = (_, value) => {
		if (!value) {
			return Promise.reject('Please enter your Username');
		}
		if (value.length < 4) {
			return Promise.reject('Password cannot be shorter than 4 digits');
		}
		if (value.length > 12) {
			return Promise.reject('Password cannot be longer than 12 digits');
		}
		if (!/^\w+$/.test(value)) {
			return Promise.reject('Password can only be letters, numbers and _');
		}
		return Promise.resolve();
	};

	render() {
		return (
			<div className='login'>
				<header>
					<img src={logo} alt='logo' />
					<div className='title'>B2C Admin</div>
				</header>
				<section>
					<h1 className='title'>Welcome</h1>
					<Form
						name='normal_login'
						className='login-form'
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item
							name='username'
							rules={[
								{ required: true, message: 'Please enter your Username' },
								{
									max: 12,
									message: 'Username cannot be longer than 12 digits',
								},
								{ min: 4, message: 'Username cannot be shorter than 4 digits' },
								{
									pattern: /^\w+$/,
									message: `Username can only be letters, numbers and _`,
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined
										className='site-form-item-icon'
										style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								}
								placeholder='Username'
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[{ validator: this.pwdValidator }]}
						>
							<Input
								prefix={
									<LockOutlined
										className='site-form-item-icon'
										style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								}
								type='password'
								placeholder='Password'
							/>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								Log in
							</Button>
						</Form.Item>
					</Form>
				</section>
			</div>
		);
	}
}
