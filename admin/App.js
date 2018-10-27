import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/main.scss';
import css from './App.scss';

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
          <Button className={css.button}>
            CSS Modules
          </Button>
          </div>
        </Router>
      </Provider>
    );
  }
}