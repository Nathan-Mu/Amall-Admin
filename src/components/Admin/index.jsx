import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Layout } from 'antd';
import { deleteUserInfo } from '../../redux/actions/login';
import Header from './Header';
import Home from '../Home';
import Categories from '../Categories';
import Products from '../Products';
import Users from '../Users';
import Roles from '../Roles';
import BarChart from '../BarChart';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import './index.css';

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
				<Sider>Sider</Sider>
				<Layout>
					<Header>Header</Header>
					<Content>
						<Switch>
							<Route path='/admin/home' component={Home} />
							<Route path='/admin/products/categories' component={Categories} />
							<Route path='/admin/products/all' component={Products} />
							<Route path='/admin/users' component={Users} />
							<Route path='/admin/roles' component={Roles} />
							<Route path='/admin/stats/barchart' component={BarChart} />
							<Route path='/admin/stats/linechart' component={LineChart} />
							<Route path='/admin/stats/piechart' component={PieChart} />
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
