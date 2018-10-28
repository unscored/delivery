import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ROUTES_MAP } from '../../constants';


const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={(props) => user.isLogged
          ? <Component {...props} />
          : <Redirect to={ROUTES_MAP.login} />
        } 
    />
  );
}

PrivateRoute.propTypes = {
  
}

export default connect(
  ({ user }) => ({ user }),
  null,
)(PrivateRoute);