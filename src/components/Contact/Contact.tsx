import React, { useRef, useEffect } from 'react';
import './Contact.css';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface Location {
  lat: number;
  lng: number;
}

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Contact = () => {
  let googleMapRef = useRef<HTMLDivElement>(null);
  let googleMap = useRef<google.maps.Map>();
  let marker = useRef<google.maps.Marker>();

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

  return (
    <div className="contact">
      <div className="contact-info">
        <div>
          <h2>Location</h2>
          <span>
            55 CASTLERIDGE BLVD NE
            <br />
            CALGARY, AB T3J 3J8
          </span>
          <h2>Contact</h2>
          <a href="tel:+1-403-568-2832">+1 (403) 568-2832</a>
          <h2>Hours</h2>
          <div className="times">
            <ul className="days">
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
              <li>Sun</li>
            </ul>
            <ul className="hours">
              <li>4PM - 1AM</li>
              <li>Closed</li>
              <li>4PM - 1AM</li>
              <li>4PM - 1AM</li>
              <li>4PM - 2AM</li>
              <li>4PM - 2AM</li>
              <li>4PM - 1AM</li>
            </ul>
          </div>
        </div>
        <div className="google-map" ref={googleMapRef} />
      </div>
    </div>
  );
};

export default Contact;
