import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MENU from 'Config/menu-config';
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

	getDefaultSelectedKeys = () => {
		return this.props.history.location.pathname.split('/').splice(2);
	};

	generateMenu = config => {
		const {matchedKey} = this.props;
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
		return items.map(item => {
			if (item.subItems) {
				return (
					<Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
						{this.generateMenuItems(item.subItems)}
					</Menu.SubMenu>
				);
			} else {
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
