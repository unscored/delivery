import React from 'react';
import { FaInstagram } from 'react-icons/fa';

import { cssMQ } from '../../utils';
import css from './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className={css.top}>
        <div className={css.contacts}>
          <p>+38 063 37 32 915</p>
          <a href='https://www.instagram.com/cafe_belvedere/' target="_blank" className={css.insta}>
            <FaInstagram size={cssMQ.isMobile() ? 22 : 38} color={'#000'}/>
            <span>cafe_belvedere</span>
          </a>
        </div>
      </div>
      <div className={css.bottom}>
        <p>Copyright © {new Date().getFullYear()} <span>Belvedere</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;