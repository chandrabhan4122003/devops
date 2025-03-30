import React from 'react';
import style from '../style/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <span>COMMERCIFY</span>
      </div>
    </div>
  );
};

export default Navbar;