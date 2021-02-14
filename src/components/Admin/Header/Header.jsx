import React, { Component } from 'react';
import { Modal, Button, Breadcrumb, Menu } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import { withRouter, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { deleteUserInfo } from 'Redux/actions/login';
import { weatherRequest } from 'Api/weather-api';
import MENU from 'Config/menu-config';
import './Header.scss';

@connect(state => ({ userInfo: state.userInfo }), { deleteUserInfo })
@withRouter
class Header extends Component {
	state = {
		isFullScreen: false,
		weather: {
			main: '',
			icon: '',
		},
	};

	async componentDidMount() {
		screenfull.on('change', () => {
			let isFullScreen = !this.state.isFullScreen;
			this.setState({ isFullScreen });
		});
		let weather = await this.getWeather();
		this.setState({ weather });
	}

	fullscreen = () => {
		screenfull.toggle();
	};

	getBreadcrumbItems = items => {
		let { pathname } = this.props.history.location;
		let paths = pathname.split('/').splice(2);
		let result = [];
		let menuItems = items;
		for (let path of paths) {
			for (let menuItem of menuItems) {
				if (path === menuItem.key) {
					result.push(menuItem);
					menuItems = menuItem.subItems;
					break;
				}
			}
			if (!menuItems) {
				break;
			}
		}
		return result;
	};

	getWeather = async () => {
		let weatherResult = await weatherRequest();
		let { main, icon } = weatherResult.data.weather[0];
		return { main, icon };
	};

	logout = () => {
		Modal.confirm({
			title: 'Logout',
			icon: <ExclamationCircleOutlined />,
			content: 'Do you confirm to log out?',
			okText: 'Confirm',
			cancelText: 'Cancel',
			onOk: () => {
				this.props.deleteUserInfo();
			},
		});
	};

	render() {
		const { isFullScreen, weather } = this.state;
		const { userInfo } = this.props;
		return (
			<header className='header'>
				<div className='header-top'>
					<Button size='small' onClick={this.fullscreen}>
						{isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
					</Button>
					<span className='header-username'>
						Welcome, {userInfo.user.username}
					</span>
					<Button type='link' onClick={this.logout}>
						Logout
					</Button>
				</div>
				<div className='header-btm'>
					<Breadcrumb separator='>' className='header-btm-breadcrumbs'>
						<Breadcrumb.Item>
							<Link to={MENU.entrance.path}>Amall Admin</Link>
						</Breadcrumb.Item>
						{this.getBreadcrumbItems(MENU.items).map(item => {
							return (
								<Breadcrumb.Item>
									{item.path ? (
										<Link to={item.path}>{item.title}</Link>
									) : (
										<>{item.title}</>
									)}
								</Breadcrumb.Item>
							);
						})}
					</Breadcrumb>
					<div className='header-btm-info'>
						<Clock /> |
						<img
							src={
								weather.icon &&
								`http://openweathermap.org/img/wn/${weather.icon}.png`
							}
							alt='Weather'
						/>
						{weather.main}
					</div>
				</div>
			</header>
		);
	}
}

class Clock extends Component {
	state = {
		time: dayjs().format('dddd·, DD MMM YYYY hh:mm:ss A'),
		intervalIDs: [],
	};

	componentDidMount() {
		let id = setInterval(() => {
			this.setState({ time: dayjs().format('dddd, DD MMM YYYY hh:mm:ss A') });
		}, 1000);
		let intervalIDs = [...this.state.intervalIDs, id];
		this.setState({ intervalIDs });
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalIDs);
	}

	render() {
		return <>{this.state.time}</>;
	}
}

export default Header;
