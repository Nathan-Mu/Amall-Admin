import React, { Component } from 'react';
import { Card, Button, Table, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { requestRoles } from 'Api/backend-api';
import dayjs from 'dayjs';
import PubSub from 'pubsub-js';
import CreateRoleModal from './Modals/CreateRole';
import SetPermissionsModal from './Modals/SetPermissions';
import {
	CREATE_ROLE_SUCCESS,
	OPEN_CREATE_ROLE_MODAL,
	OPEN_SET_PERMISSIONS_MODAL,
	ROLES,
	SET_PERMISSIONS_SUCCESS,
} from 'Config/pubsub';

export default class Roles extends Component {
	state = {
		roles: [],
	};

	componentDidMount() {
		this.retrieveRoles();
		PubSub.subscribe(SET_PERMISSIONS_SUCCESS, this.setPermissionsSubscriber);
		PubSub.subscribe(CREATE_ROLE_SUCCESS, this.createRoleSubscriber);
	}

	componentWillUnmount() {
		PubSub.unsubscribe(ROLES);
	}

	setPermissionsSubscriber = (_, data) => {
		const updatedRole = this.renameRetrievedRole(data);
		let roles = this.state.roles.map(role =>
			role.id === updatedRole.id ? updatedRole : role
		);
		this.setState({ roles });
	};

	createRoleSubscriber = (_, data) => {
		const newRole = this.renameRetrievedRole(data);
		const roles = [newRole, ...this.state.roles];
		this.setState({ roles });
	};

	showCreateRoleModal = () => {
		PubSub.publish(OPEN_CREATE_ROLE_MODAL);
	};

	showSetPermissionsModal = selectedRole => {
		PubSub.publish(OPEN_SET_PERMISSIONS_MODAL, selectedRole);
	};

	retrieveRoles = async () => {
		let result = await requestRoles();
		let { status, data } = result.data;
		if (status === 0) {
			const roles = data.map(item => this.renameRetrievedRole(item)).reverse();
			this.setState({ roles });
		} else {
			message.error('Request Roles Failed');
		}
	};

	renameRetrievedRole = role => {
		const {
			name,
			auth_name: authorizedBy,
			create_time: createdDate,
			auth_time: authorizedDate,
			menus: permissions,
			_id: id,
		} = role;
		return {
			name,
			authorizedBy,
			createdDate,
			authorizedDate,
			permissions,
			id,
		};
	};

	render() {
		const createButton = (
			<Button type='primary' onClick={this.showCreateRoleModal}>
				<PlusCircleOutlined /> Create
			</Button>
		);
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
			},
			{
				title: 'Date created',
				dataIndex: 'createdDate',
				render: time => {
					if (time) {
						return dayjs(time).format('DD MMM YYYY hh:mm:ss A');
					}
				},
			},
			{
				title: 'Date authorized',
				dataIndex: 'authorizedDate',
				render: time => {
					if (time) {
						return dayjs(time).format('DD MMM YYYY hh:mm:ss A');
					} else {
						return 'Not Authorized'
					}
				},
			},
			{
				title: 'Authorized By',
				dataIndex: 'authorizedBy',
				render: authorizedBy => authorizedBy ? authorizedBy : '-'
			},
			{
				title: 'Action',
				render: role => (
					<Button onClick={() => this.showSetPermissionsModal(role)}>
						Set permissions
					</Button>
				),
			},
		];
		const dataSource = this.state.roles;
		return (
			<Card extra={createButton}>
				<Table
					dataSource={dataSource}
					columns={columns}
					bordered
					size='middle'
					rowKey='id'
				/>
				<CreateRoleModal />
				<SetPermissionsModal />
			</Card>
		);
	}
}
