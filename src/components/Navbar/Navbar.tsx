import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import navbar from './navbar.json';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className={`navbar ${open && 'open'}`}>
      <button className="hamburger" onClick={toggleOpen}>
        <FontAwesomeIcon icon={faBars} size="3x" />
      </button>
      {navbar.map((item, index) => (
        <Link key={index} to={item.route}>
          <div className={`nav-item ${open && 'open'}`}>{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
