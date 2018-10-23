import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { ToastContainer, cssTransition } from "react-toastify";

import { ROUTES_MAP } from './constants';
import store from './redux/store';
import Main from './containers/Main';
import Cart from './containers/Cart';
import Modal from './containers/Modal';
import Contacts from './containers/Contacts';
import Header from './containers/Header';
import Footer from './components/Footer';

import "react-toastify/dist/ReactToastify.css";

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
          <div>
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
            <Modal />
          </div>
        </Router>
      </Provider>
    );
  }
}

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}