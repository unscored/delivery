import React from 'react';
import PropTypes from 'prop-types';

import css from './User.scss';


const User = ({ name }) => {
  return (
    <div className={css.user}>
      <p>{name}</p>
      <div className={css.fakeAvatar}>
        <p>{name.charAt(0).toUpperCase()}</p>
      </div>
    </div>
  );
}

User.propTypes = {

};

export default User;