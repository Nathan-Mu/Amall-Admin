import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MENU from 'Config/menu';
import './Nav.scss';
import { connect } from 'react-redux';

@withRouter
@connect(state => ({
	permissions: state.userInfo.user.role.menus,
	username: state.userInfo.user.username,
}))
class Nav extends Component {
	state = {
		collapsed: false,
	};

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	getDefaultSelectedKeys = () => {
		return this.props.history.location.pathname.split('/').splice(2);
	};

	generateMenu = config => {
		const { matchedKey } = this.props;
		return (
			<Menu
				selectedKeys={matchedKey}
				defaultOpenKeys={this.getDefaultSelectedKeys()}
				mode='inline'
				theme='dark'
			>
				{this.generateMenuItems(config.items)}
			</Menu>
		);
	};

	generateMenuItems = items => {
		const { username, permissions } = this.props;
		const isSuper = username === 'admin';
		// eslint-disable-next-line array-callback-return
		return items.map(item => {
			const hasPermission =
				isSuper || item.key === 'home' || permissions.some(p => p === item.key);
			if (item.children) {
				const subMenu = this.generateMenuItems(item.children);
				return (
					subMenu.some(item => item) && (
						<Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
							{subMenu}
						</Menu.SubMenu>
					)
				);
			} else if (hasPermission) {
				return (
					!item.hiddenOnMenu && (
						<Menu.Item key={item.key} icon={item.icon}>
							<Link to={item.path}>{item.title}</Link>
						</Menu.Item>
					)
				);
			}
		});
	};

	render() {
		return <>{this.generateMenu(MENU)}</>;
	}
}

export default Nav;
