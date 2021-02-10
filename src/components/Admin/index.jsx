import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { deleteUserInfo } from '../../redux/actions/login';

class AdminUI extends Component {
	logout = () => {
    this.props.deleteUserInfo();
  };

	render() {
		const { isLogin } = this.props.userInfo;
		if (!isLogin) {
			return <Redirect to='/login' />;
		}
		return <div>Admin</div>;
	}
}

export default connect(state => ({ userInfo: state.userInfo }), {
	deleteUserInfo,
})(AdminUI);
