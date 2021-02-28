import React, { Component } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { requestLogin } from 'Api/backend-api';
import { saveUserInfo } from 'Redux/actions/login';
import logo from 'Img/logo.png';
import './Login.scss';
import { Redirect } from 'react-router';

@connect(state => ({ isLogin: state.userInfo.isLogin }), {
	saveUserInfo,
})
class Login extends Component {
	onFinish = async values => {
		const { username, password } = values;
		const result = await requestLogin(username, password);
		const { data } = result;
		if (data.status === 0) {
			this.props.saveUserInfo(data.data);
			this.props.history.replace('/admin');
		} else {
			message.warning('Username and password do not match', 1);
		}
	};

	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	pwdValidator = (_, value) => {
		if (!value) {
			return Promise.reject('Please enter your Username');
		}
		if (value.length < 4) {
			return Promise.reject('Password cannot be shorter than 4 characters');
		}
		if (value.length > 12) {
			return Promise.reject('Password cannot be longer than 12 characters');
		}
		if (!/^\w+$/.test(value)) {
			return Promise.reject('Password can only be letters, numbers and _');
		}
		return Promise.resolve();
	};

	render() {
		if (this.props.isLogin) {
			return <Redirect to='/admin' />;
		}
		return (
			<div className='login'>
				<header>
					<img src={logo} alt='logo' />
					<div className='title'>AMall Admin</div>
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
									message: 'Username cannot be longer than 12 characters',
								},
								{ min: 4, message: 'Username cannot be shorter than 4 characters' },
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

export default Login;
