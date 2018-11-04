import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { PrivateRoute } from './containers/routes';
import LogIn from './containers/LogIn';
import Main from './components/Main';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Orders from './containers/Orders';
import Clients from './components/Clients';
import store from './redux/store';
import { ROUTES_MAP } from './constants';

import './styles/antd.less';
import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div className="content">
            <Header />
            <SideMenu />
            <div className="routeContent">
              <PrivateRoute exact path={ROUTES_MAP.main} component={Main}/>
              <Route exact path={ROUTES_MAP.login} component={LogIn}/>
              <PrivateRoute exact path={ROUTES_MAP.clients} component={Clients}/>
              <PrivateRoute exact path={ROUTES_MAP.orders} component={Orders}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}