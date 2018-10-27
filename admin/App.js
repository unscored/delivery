import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './styles/main.scss';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            hi admin
          </div>
        </Router>
      </Provider>
    );
  }
}