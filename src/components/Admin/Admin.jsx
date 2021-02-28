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
			permissions = user.role.menus
		}
		const { Footer, Sider, Content } = Layout;
		return (
			<Layout className='admin'>
				<Sider className='sider'>
					<Logo />
					<Nav matchedKey={matchedKey} />
				</Sider>
				<Layout className='right'>
					<Header className='header' breadcrumbItems={breadcrumbItems} />
					<Content className='content'>
						<Switch>
							{routes.map(
								(route, index) => {
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
								}
								// route.path ? <Route {...route} key={index}/> : <Redirect {...route} key={index}/>
							)}
							{/* <Route path='/admin/home' component={Home} />
							<Route path='/admin/products'>
								<Switch>
									<Route
										path='/admin/products/all-products'
										component={Products}
									/>
									<Route path='/admin/products/create' component={Editable} />
									<Route path='/admin/products/edit/:id' component={Editable} />
									<Route
										path='/admin/products/details/:id'
										component={Details}
									/>
									<Redirect to='/admin/products/all-products' />
								</Switch>
							</Route>
							<Route path='/admin/categories' component={Categories} />
							<Route path='/admin/users' component={Users} />
							<Route path='/admin/roles' component={Roles} />
							<Route path='/admin/stats/bar-charts' component={BarChart} />
							<Route path='/admin/stats/line-charts' component={LineChart} />
							<Route path='/admin/stats/pie-charts' component={PieChart} />
							<Redirect to='/admin/home' /> */}
						</Switch>
					</Content>
					<Footer className='footer'>Amall ©2020 Created by Amall</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default Admin;
