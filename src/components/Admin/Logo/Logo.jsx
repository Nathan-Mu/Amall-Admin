import React, { Component } from 'react';
import logo from 'Img/logo.png';
import { withRouter } from 'react-router';

@withRouter
class Logo extends Component {
	render() {
		return (
			<header
				className='nav-header'
				onClick={() => this.props.history.push('/admin/home')}
			>
				<div style={{ cursor: 'pointer', margin: '0 auto', display: 'flex', alignItems: 'center'}}>
					<img src={logo} alt='logo' style={{marginLeft: 0}}/>
					{!this.props.collapsed && <h1>Amall Admin</h1>}
				</div>
			</header>
		);
	}
}

export default Logo;
