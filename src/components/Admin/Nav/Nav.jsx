import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MENU from 'Config/menu-config';
import logo from 'Img/logo.png';
import './Nav.scss';

@withRouter
class Nav extends Component {
	state = {
		collapsed: false,
	};

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	getSelectedKeys = (entranceKey) => {
		let paths = this.props.history.location.pathname.split('/');
		let selectedKey = paths[paths.length-1];
		return selectedKey!== 'admin' ? selectedKey : entranceKey;
	};

	getDefaultSelectedKeys = () => {
		return this.props.history.location.pathname.split('/').splice(2)
	}

	generateMenu = config => {
		return (
			<Menu
				defaultSelectedKeys={this.getSelectedKeys(MENU.entranceKey)}
				defaultOpenKeys={this.getDefaultSelectedKeys()}
				mode='inline'
				theme='dark'
			>
				{this.generateMenuItems(config.items)}
			</Menu>
		);
	};

	generateMenuItems = items => {
		return items.map(item => {
			if (item.subItems) {
				return (
					<Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
						{this.generateMenuItems(item.subItems)}
					</Menu.SubMenu>
				);
			} else {
				return (
					<Menu.Item key={item.key} icon={item.icon}>
						<Link to={item.path}>{item.title}</Link>
					</Menu.Item>
				);
			}
		});
	};

	render() {
		return (
			<div>
				<header className='nav-header'>
					<img src={logo} alt='logo' />
					<h1>Amall Admin</h1>
				</header>
				{this.generateMenu(MENU)}
			</div>
		);
	}
}

export default Nav;
