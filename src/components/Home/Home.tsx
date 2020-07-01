import React, { useEffect } from 'react';
import home from './home.json';
import './Home.css';

const Home = () => {
  useEffect(() => {
    document.title = 'Emerald Palace';
  }, []);

  return (
    <div className="home">
      <div className="center">
        <span className="name">{home.name.zh}</span>
        <span className="name">{home.name.en.toUpperCase()}</span>
        <span className="description">{home.description.toUpperCase()}</span>
        <div className="contact-info">
          <a href={`https://maps.google.com/?q=${home.address}`}>
            {home.address.toUpperCase()}
          </a>
          <a href={`tel:${home.phone.href}`}>{home.phone.display}</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
