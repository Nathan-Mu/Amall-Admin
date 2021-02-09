import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './containers/Login';
import Index from './containers/Admin';

class App extends Component {
  render() {
    return (
        <div className='app'>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/admin' component={Index}/>
          </Switch>
        </div>
    );
  }
}

export default App;
