import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <div className="navbar">
    <Link to="/">
      <div className="nav-item">HOME</div>
    </Link>
    <Link to="about">
      <div className="nav-item">ABOUT</div>
    </Link>
    <Link to="menu">
      <div className="nav-item">MENU</div>
    </Link>
    <Link to="contact">
      <div className="nav-item">CONTACT</div>
    </Link>
  </div>
);

export default Navbar;
