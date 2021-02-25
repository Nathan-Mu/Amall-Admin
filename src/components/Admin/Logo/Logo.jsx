import React, { Component } from 'react';
import logo from 'Img/logo.png'

export default class Logo extends Component {
	render() {
		return (
			<div>
				<header className='nav-header'>
					<img src={logo} alt='logo' />
					<h1>Amall Admin</h1>
				</header>
			</div>
		);
	}
}
