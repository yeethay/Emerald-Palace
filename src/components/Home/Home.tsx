import React from 'react';
import home from './home.json';
import './Home.css';

const Home = () => (
  <div className="home">
    <div className="center">
      <span className="name">{home.name.zh}</span>
      <span className="name">{home.name.en.toUpperCase()}</span>
      <div className="contact-info">
        <a href={`https://maps.google.com/?q=${home.address}`}>
          {home.address.toUpperCase()}
        </a>
        <a href={`tel:${home.phone.href}`}>{home.phone.display}</a>
      </div>
    </div>
  </div>
);

export default Home;
