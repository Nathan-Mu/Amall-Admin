import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';

class App extends Component {
	render() {
		return (
			<div className='app'>
				<Switch>
					<Route path='/login' component={Login} />
					<Route path='/admin' component={Admin} />
				</Switch>
			</div>
		);
	}
}

export default App;
