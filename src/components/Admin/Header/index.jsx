import React, { Component } from 'react';
import { Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import screenfull from 'screenfull';
import './index.css';

export default class Header extends Component {
	state = {
		isFullScreen: false,
	};

	fullscreen = () => {
		screenfull.toggle();
	};

	componentDidMount() {
		screenfull.on('change', () => {
			let isFullScreen = !this.state.isFullScreen;
			this.setState({ isFullScreen });
		});
	}

	render() {
		const { isFullScreen } = this.state;
		return (
			<header>
				<div className='header-top'>
					<Button size='small' onClick={this.fullscreen}>
						{isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
					</Button>
					<span className='header-username'>Welcome, xxx</span>
					<Button type='link'>Logout</Button>
				</div>
				<div className='header-btm'>
					<div className='header-btm-breadcrumbs'>xxxx</div>
					<div className='header-btm-info'>
						2021-02-03 11:23:85 |
						<img
							src='http://api.map.baidu.com/images/weather/day/qing.png'
							alt='Weather'
						/>
						Sunny | Temp: 10 ~ 25
					</div>
				</div>
			</header>
		);
	}
}
