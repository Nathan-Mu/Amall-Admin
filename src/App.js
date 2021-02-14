import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from 'Components/Login/Login';
import Admin from 'Components/Admin/Admin';

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/admin' component={Admin} />
					<Redirect to='/admin' />
				</Switch>
			</div>
		);
	}
}

export default App;
