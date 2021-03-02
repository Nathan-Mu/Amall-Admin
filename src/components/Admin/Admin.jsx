import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Layout } from 'antd';
import { deleteUserInfo } from 'Redux/actions/login';
import Header from './Header/Header';
import routes from 'Config/route';
import './Admin.scss';
import Nav from './Nav/Nav';
import Logo from './Logo/Logo';
import MENU from 'Config/menu';

@connect(state => ({ userInfo: state.userInfo }), {
	deleteUserInfo,
})
class Admin extends Component {
	state = {
		collapsed: false,
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	logout = () => {
		this.props.deleteUserInfo();
	};

	render() {
		const { breadcrumbItems, matchedKey } = MENU.traverseItems(
			this.props.history.location.pathname
		);
		const { isLogin, user } = this.props.userInfo;
		let permissions = [];
		if (!isLogin) {
			return <Redirect to='/login' />;
		} else {
			permissions = user.role.menus;
		}
		const { Footer, Sider, Content } = Layout;
		const { collapsed } = this.state;
		return (
			<Layout className='admin'>
				<Sider
					className='sider'
					trigger={null}
					collapsible
					collapsed={collapsed}
				>
					<Logo collapsed={collapsed} />
					<Nav matchedKey={matchedKey} />
				</Sider>
				<Layout
				className='right'
				style={{marginLeft: collapsed ? 80 : 200, transitionDuration:'0.2s'}}
				>
					<Header
						className='header'
						breadcrumbItems={breadcrumbItems}
						handleCollapseClick={this.toggle}
					/>
					<Content className='content'>
						<div
							className='site-layout-background'
							style={{ padding: 24, minHeight: 360 }}
						>
							<Switch>
								{routes.map((route, index) => {
									const isSuper = user.username === 'admin';
									const isAccessible =
										isSuper ||
										!route.key ||
										route.key === 'home' ||
										permissions.some(permission => route.key === permission);
									if (route.path) {
										return isAccessible && <Route {...route} key={index} />;
									} else {
										return <Redirect {...route} key={index} />;
									}
								})}
							</Switch>
						</div>
					</Content>
					<Footer className='footer'>Amall ©2020 Created by Amall</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default Admin;
