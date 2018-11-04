import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ROUTES_MAP } from '../../constants';


const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={props => (
        user.token
          ? <Component {...props} />
          : <Redirect to={ROUTES_MAP.login} />
      )} 
    />
  );
}

PrivateRoute.propTypes = {
  
}

export default withRouter(connect(
  ({ user }) => ({ user }),
  null,
)(PrivateRoute));
