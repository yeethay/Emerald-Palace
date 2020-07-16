import React, { useEffect, useState } from 'react';
import './Home.css';
import firebase from '@firebase/app';
import '@firebase/storage';
import { IRestaurant } from '../../types/types';

const Home = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    document.title = 'Emerald Palace';
  }, []);

  useEffect(() => {
    const getRestaurantJson = async () => {
      const storage = firebase.storage!();
      const storageRef = storage.ref();
      const storageUrl = await storageRef
        .child('restaurant.json')
        .getDownloadURL();
      const res = await fetch(storageUrl);
      const data = await res.json();
      setRestaurant(data);
    };
    try {
      getRestaurantJson();
    } catch (error) {
      console.error(error);
    }
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
