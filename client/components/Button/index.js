import React from "react";

import image from '../../images/1528376723124715851.jpg';

import css from './Button.scss';

const Button = () => {
  return (
    <React.Fragment>
      {/* <div className={css.buttonMe}>Press Me</div> */}
      <img src={image} />
    </React.Fragment>
  );
};

export default Button;