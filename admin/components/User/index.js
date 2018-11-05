import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'antd';

import withUser from '../../redux/decorators/withUser';

import css from './User.scss';


const User = ({ user, logout }) => {
  return (
    <div className={css.user}>
      <p>{user.name}</p>
      <Icon
        className={css.logout}
        style={{ marginLeft: 10, fontSize: 20, color:'#FFF' }}
        type="logout"
        theme="outlined"
        onClick={logout}
      />
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  logout: PropTypes.func,
};

export default withUser(User);