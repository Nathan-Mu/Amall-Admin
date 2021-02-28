import React, { Component } from 'react';
import logo from 'Img/logo.png'
import { withRouter } from 'react-router';

@withRouter
class Logo extends Component {
	render() {
		return (
			<div onClick={() => this.props.history.push('/admin/home')} style={{cursor: 'pointer'}}>
				<header className='nav-header'>
					<img src={logo} alt='logo' />
					<h1>Amall Admin</h1>
				</header>
			</div>
		);
	}
}

export default Logo;
