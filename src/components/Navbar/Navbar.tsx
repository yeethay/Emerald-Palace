import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [transparent, setTransparent] = useState(true);
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setTransparent(true);
    else setTransparent(false);
  }, [location]);
  return (
    <div className={`navbar ${transparent ? 'transparent' : ''}`}>
      <Link to="/">
        <div className="nav-item">HOME</div>
      </Link>
      <Link to="about">
        <div className="nav-item">ABOUT</div>
      </Link>
      <Link to="menu">
        <div className="nav-item">MENU</div>
      </Link>
      <Link to="takeout-menu">
        <div className="nav-item">T/O MENU</div>
      </Link>
      <Link to="contact">
        <div className="nav-item">CONTACT</div>
      </Link>
    </div>
  );
};

export default Navbar;
