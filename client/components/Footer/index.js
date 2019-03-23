import React from 'react';

import css from './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className={css.top}>
        <div className={css.contacts}>
          <p>+38 063 37 32 915</p>
          <p className={css.email}>pizza-belvedere@gmail.com</p>
        </div>
      </div>
      <div className={css.bottom}>
        <p>Copyright © {new Date().getFullYear()} <span>Belvedere</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;