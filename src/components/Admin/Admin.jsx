import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Layout } from 'antd';
import { deleteUserInfo } from 'Redux/actions/login';
import Header from './Header/Header';
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
import Users from '../Users/Users';
import Roles from '../Roles/Roles';
import BarChart from '../BarCharts/BarCharts';
import LineChart from '../LineCharts/LineCharts';
import PieChart from '../PieCharts/PieCharts';
import './Admin.scss';
import Nav from './Nav/Nav';

@connect(state => ({ userInfo: state.userInfo }), {
	deleteUserInfo,
})
class Admin extends Component {
	logout = () => {
		this.props.deleteUserInfo();
	};

	render() {
		const { isLogin } = this.props.userInfo;
		if (!isLogin) {
			return <Redirect to='/login' />;
		}
		const { Footer, Sider, Content } = Layout;
		return (
			<Layout className='admin'>
				<Sider>
					<Nav/>
				</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>
						<Switch>
							<Route path='/admin/home' component={Home} />
							<Route path='/admin/products/categories' component={Categories} />
							<Route path='/admin/products/all-products' component={Products} />
							<Route path='/admin/users' component={Users} />
							<Route path='/admin/roles' component={Roles} />
							<Route path='/admin/stats/bar-charts' component={BarChart} />
							<Route path='/admin/stats/line-charts' component={LineChart} />
							<Route path='/admin/stats/pie-charts' component={PieChart} />
							<Redirect to='/admin/home' />
						</Switch>
					</Content>
					<Footer>Footer</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default Admin;
