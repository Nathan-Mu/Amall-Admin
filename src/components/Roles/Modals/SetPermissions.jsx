import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Tree } from 'antd';
import menuConfig from 'Config/menu';
import { PubSub } from 'pubsub-js';
import { message } from 'antd';
import { requestSetPermissions } from 'Api/backend-api';
import {
	OPEN_SET_PERMISSIONS_MODAL,
	SET_PERMISSIONS_SUCCESS,
} from 'Config/pubsub';

const SetPermissions = () => {
	const [checkedKeys, setCheckedKeys] = useState(['home']);
	const [visible, setVisible] = useState(false);
	const [name, setName] = useState('');
	const [id, setId] = useState(0);
	
	const authorizedBy = useSelector(state => state.userInfo.user.username);

	useEffect(() => {
		const token = PubSub.subscribe(OPEN_SET_PERMISSIONS_MODAL, subscriber);
		return () => {
			PubSub.unsubscribe(token);
		};
	}, []);

	const subscriber = (msg, data) => {
		if (data) {
			setVisible(true);
			setName(data.name);
			setId(data.id);
			setCheckedKeys(['home', ...data.permissions]);
		}
	};

	const treeData = [
		{ title: 'Amall Admin', key: 'root', children: menuConfig.items },
	];

	const onCheck = checkedKeys => {
		setCheckedKeys(['home', ...checkedKeys]);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleOk = async () => {
		const result = await requestSetPermissions(id, checkedKeys, authorizedBy);
		const { status, data } = result.data;
		if (status === 0) {
			setVisible(false);
			message.success('Set permissions successfully')
			PubSub.publish(SET_PERMISSIONS_SUCCESS, data);
		} else {
			message.error('Set permissions failed');
		}
	};

	return (
		<Modal
			visible={visible}
			title={`Set Permissions for ${name}`}
			okText='Create'
			cancelText='Cancel'
			onCancel={handleCancel}
			onOk={handleOk}
		>
			<Tree
				checkable
				onCheck={onCheck}
				selectable={false}
				checkedKeys={checkedKeys}
				treeData={treeData}
				defaultExpandAll
			/>
		</Modal>
	);
};

export default SetPermissions;
