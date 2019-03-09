import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { PrivateRoute } from './containers/routes';
import LogIn from './containers/LogIn';
import Main from './components/Main';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Orders from './containers/Orders';
import Clients from './containers/Clients';
import Products from './containers/Products';
import store from './redux/store';
import { ROUTES_MAP } from './constants';

import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
            <React.Fragment>
              <Header />  
              <SideMenu />
              <Switch>
                <PrivateRoute exact path={ROUTES_MAP.main} component={Main}/>
                <Route exact path={ROUTES_MAP.login} component={LogIn}/>
                <PrivateRoute exact path={ROUTES_MAP.clients} component={Clients}/>
                <PrivateRoute exact path={ROUTES_MAP.products} component={Products}/>
                <PrivateRoute exact path={ROUTES_MAP.orders} component={Orders}/>
                <Redirect exact from={ROUTES_MAP.default} to={ROUTES_MAP.main} />
              </Switch>
            </React.Fragment>
        </Router>
      </Provider>
    );
  }
}