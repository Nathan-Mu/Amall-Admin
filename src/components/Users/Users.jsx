import React, { Component } from 'react';
import { Card, Button, Table, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import PubSub from 'pubsub-js';
import {
	CREATE_USER_SUCCESS,
	OPEN_USER_MODAL,
	UPDATE_USER_SUCCESS,
	USERS,
} from 'Config/pubsub';
import UserModal from './UserModal/UserModal';
import { requestUsers } from 'Api/backend-api';
export default class Users extends Component {
	state = {
		users: [],
		roles: [],
		isLoading: true,
	};

	showModal = data => {
		PubSub.publish(OPEN_USER_MODAL, { user: data, roles: this.state.roles });
	};

	componentDidMount() {
		this.retrieveUsers();
		PubSub.subscribe(CREATE_USER_SUCCESS, this.createUserSubscriber);
		PubSub.subscribe(UPDATE_USER_SUCCESS, this.updateUserSubscriber);
	}

	componentWillUnmount() {
		PubSub.unsubscribe(USERS);
	}

	updateUserSubscriber = (msg, data) => {
		const updatedUser = this.renameUser(data);
		const users = this.state.users.map(user =>
			user.id === updatedUser.id ? updatedUser : user
		);
		this.setState({ users });
	};

	createUserSubscriber = (msg, data) => {
		const users = [this.renameUser(data), ...this.state.users];
		this.setState({ users });
	};

	retrieveUsers = async () => {
		const result = await requestUsers();
		const { status, data } = result.data;
		if (status === 0) {
			let { users, roles } = data;
			users = users.map(user => this.renameUser(user)).reverse();
			roles = roles.map(role => this.renameRole(role));
			this.setState({ users, roles, isLoading: false });
		} else {
			message.error('Retrieve users failed');
			this.setState({ isLoading: false });
		}
	};

	getRoleNameById = id => {
		return this.state.roles.filter(role => role.id === id)[0].name;
	};

	renameUser = user => {
		const {
			_id: id,
			username,
			password,
			phone: mobile,
			email,
			role_id: roleId,
			create_time: createdDate,
		} = user;
		return {
			id,
			username,
			password,
			mobile,
			email,
			roleId,
			createdDate,
		};
	};
	renameRole = role => {
		const { name, _id: id } = role;
		return { name, id };
	};

	render() {
		const createButton = (
			<Button type='primary' onClick={() => this.showModal()}>
				<PlusCircleOutlined /> Create
			</Button>
		);
		const columns = [
			{
				title: 'Username',
				dataIndex: 'username',
			},
			{
				title: 'Mobile',
				dataIndex: 'mobile',
				render: mobile => `+61 ${mobile}`,
			},
			{
				title: 'Email',
				dataIndex: 'email',
			},
			{
				title: 'Role',
				dataIndex: 'roleId',
				render: id => this.getRoleNameById(id),
			},
			{
				title: 'Date created',
				dataIndex: 'createdDate',
			},
			{
				title: 'Actions',
				render: item => (
					<Button onClick={() => this.showModal(item)}>Edit</Button>
				),
			},
		];
		const dataSource = this.state.users;
		const { isLoading } = this.state;
		return (
			<>
				<Card extra={createButton}>
					<Table
						dataSource={dataSource}
						columns={columns}
						bordered
						size='middle'
						rowKey='id'
						loading={isLoading}
					/>
				</Card>
				<UserModal />
			</>
		);
	}
}
