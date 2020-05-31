import React from 'react';
import home from './home.json';
import './Home.css';

const Home = () => (
  <div className="home">
    <div className="center">
      <span className="name">{home.name_zh}</span>
      <span className="name">{home.name.toUpperCase()}</span>
      <div className="contact-info">
        <span>{home.address.toUpperCase()}</span>
        <a href={`tel:${home.phone.href}`}>{home.phone.display}</a>
      </div>
    </div>
  </div>
);

export default Home;
