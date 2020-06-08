import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import navbar from './navbar.json';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [transparent, setTransparent] = useState(true);
  let wrapperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const path = location.pathname;
  //   if (path === '/') setTransparent(true);
  //   else setTransparent(false);
  // }, [location]);

  const handleClick = () => {
    const wrapper = wrapperRef.current;
    wrapper?.classList.toggle('is-nav-open');
  };

  return (
    <div ref={wrapperRef} className="wrapper">
      <div className="navbar">
        <button className="hamburger" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        {navbar.map((item) => (
          <Link to={item.route}>
            <div className="nav-item">{item.name}</div>
          </Link>
        ))}
      </div>
      <div className="mobile-navbar">
        {navbar.map((item) => (
          <Link to={item.route}>
            <div className="">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
