import React, { useEffect, useState } from 'react';
import './Home.css';
import firebase from '@firebase/app';
import '@firebase/storage';
import { IRestaurant } from '../../types/types';

const Home = (props: { restaurant?: IRestaurant }) => {
  const { restaurant } = props;

  useEffect(() => {
    document.title = 'Emerald Palace';
  }, []);

  return (
    <div className="home">
      <div className="center">
        <span className="name">{restaurant?.name.zh}</span>
        <span className="name">{restaurant?.name.en.toUpperCase()}</span>
        <span className="description">
          {restaurant?.description.toUpperCase()}
        </span>
        <div className="contact-info">
          <a
            href={`https://maps.google.com/?q=${restaurant?.location.address}`}
          >
            {restaurant?.location.address.toUpperCase()}
          </a>
          <a href={`tel:${restaurant?.phone.href}`}>
            {restaurant?.phone.label}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
