import React, { useRef, useEffect, useState } from 'react';
import './Contact.css';
import { Location } from '../../types/types';
import firebase from '@firebase/app';
import '@firebase/storage';
import { IRestaurant } from '../../types/types';

declare global {
  interface Window {
    google: typeof google;
  }
}

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Contact = () => {
  let googleMapRef = useRef<HTMLDivElement>(null);
  let googleMap = useRef<google.maps.Map>();
  let marker = useRef<google.maps.Marker>();
  const [contact, setContact] = useState<IRestaurant>();

  useEffect(() => {
    const restaurantLocation: Location = { lat: 51.098501, lng: -113.962162 };
    const createGoogleMap = () =>
      new window.google.maps.Map(googleMapRef.current as Element, {
        zoom: 16,
        center: restaurantLocation,
        disableDefaultUI: true,
      });

    const createMarker = () =>
      new window.google.maps.Marker({
        position: restaurantLocation,
        map: googleMap.current,
      });

    const googleMapScript = document.createElement('script');

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      googleMap.current = createGoogleMap();
      marker.current = createMarker();
    });
  }, []);

  useEffect(() => {
    const getContactJson = async () => {
      const storage = firebase.storage!();
      const storageRef = storage.ref();
      const storageUrl = await storageRef
        .child('restaurant.json')
        .getDownloadURL();
      const res = await fetch(storageUrl);
      const data = await res.json();
      setContact(data);
    };
    try {
      getContactJson();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    document.title = 'Contact | Emerald Palace';
  }, []);

  return (
    <div className="contact">
      <h2>CONTACT US</h2>
      <div className="desktop">
        <div className="google-map" ref={googleMapRef} />
        <div className="contact-info">
          <div className="section">
            <h3>LOCATION</h3>
            <a href={contact?.location.href}>
              {contact?.location.address.split(',').map((line, index) => (
                <span key={index} className="address">
                  {line}
                </span>
              ))}
            </a>
          </div>
          <div className="section">
            <h3>PHONE</h3>
            <a href={contact?.phone.href}>{contact?.phone.label}</a>
          </div>
          <div className="section">
            <h3>HOURS</h3>
            <div className="times">
              <ul className="days">
                {contact?.hours.map((item, index) => (
                  <li key={index}>{item.day}</li>
                ))}
              </ul>
              <ul className="hours">
                {contact?.hours.map((item, index) => (
                  <li key={index}>{item.hours}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
