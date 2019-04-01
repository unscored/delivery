import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, cssTransition } from "react-toastify";

import { ROUTES_MAP } from './constants';
import Main from './containers/Main';
import Cart from './containers/Cart';
import Contacts from './containers/Contacts';
import Header from './containers/Header';
import PopUpManager from './components/PopUpManager';
import Footer from './components/Footer';
import store from './redux/store';

import './images/share.jpg';

import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss';

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: 300,
});
export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
            <React.Fragment>
              <Header />
              <ToastContainer
                autoClose={2000}
                className={"cart-toast-container"}
                toastClassName={"cart-toast"}
                hideProgressBar
                transition={Zoom}
              />
              <Route exact path={ROUTES_MAP.main} component={Main}/>
              <Route path={ROUTES_MAP.contacts} component={Contacts}/>
              <Route path={ROUTES_MAP.cart} component={Cart}/>
              <Footer />
              <PopUpManager />
            </React.Fragment>
        </Router>
      </Provider>
    );
  }
}