import React, { Component } from 'react';
import { Modal, Button, Breadcrumb } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import { withRouter, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { deleteUserInfo } from 'Redux/actions/login';
import { weatherRequest } from 'Api/weather-api';
import MENU from 'Config/menu';
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
		let weatherResult = await weatherRequest();
		if (weatherResult) {
			let { main, icon } = weatherResult.data.weather[0];
			let weather = { main, icon };
			this.setState({ weather });
		}
	}

	fullscreen = () => {
		screenfull.toggle();
	};

	getWeather = async () => {};

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
		const { userInfo, breadcrumbItems } = this.props;
		return (
			<header className='header'>
				<div className='header-top'>
				{React.createElement(
						this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: 'trigger',
							onClick: this.props.handleCollapseClick,
						}
					)}
					<div className='top-right'>
						<Button size='small' onClick={this.fullscreen}>
							{isFullScreen ? (
								<FullscreenExitOutlined />
							) : (
								<FullscreenOutlined />
							)}
						</Button>
						<span className='header-username'>
							Welcome, {userInfo.user.username}
						</span>
						<Button type='link' onClick={this.logout}>
							Logout
						</Button>
					</div>
				</div>
				<div className='header-btm'>
					<Breadcrumb separator='>' className='header-btm-breadcrumbs'>
						<Breadcrumb.Item key='root'>
							<Link to={MENU.root.path}>Amall Admin</Link>
						</Breadcrumb.Item>
						{breadcrumbItems.map(item => {
							return (
								<Breadcrumb.Item key={item.key}>
									{item.path || item.defaultPath ? (
										<Link to={item.path || item.defaultPath}>{item.title}</Link>
									) : (
										<>{item.title}</>
									)}
								</Breadcrumb.Item>
							);
						})}
					</Breadcrumb>
					<div className='header-btm-info'>
						<Clock />
						{weather.main && (
							<>
								<span> |</span>
								<img
									src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
									alt='Weather'
								/>
								<span>{weather.main}</span>
							</>
						)}
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
