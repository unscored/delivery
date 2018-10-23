import React from 'react';

import css from './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className={css.top}>
        <div className={css.contacts}>
          <p>+38 093 093 39 62</p>
          <p className={css.email}>pizza-belvedere@gmail.com</p>
        </div>
      </div>
      <div className={css.bottom}>
        <p>Copyright © 2018 <span>Belvedere</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;