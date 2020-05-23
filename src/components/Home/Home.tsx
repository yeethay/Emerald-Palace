import React from 'react';
import home from './home.json';
import './Home.css';

const Home = () => (
  <div className="main">
    <div className="center">
      <span className="name">{home.name_zh}</span>
      <span className="name">{home.name.toUpperCase()}</span>
      <div className="contact-info">
        <span>{home.address.toUpperCase()}</span>
        <span>{home.phone}</span>
      </div>
    </div>
  </div>
);

export default Home;
