import React, { useRef, useEffect } from 'react';
import './Contact.css';
import { Location } from '../../types/types';
import { IRestaurant } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

declare global {
  interface Window {
    google: typeof google;
  }
}

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Contact = (props: { restaurant?: IRestaurant }) => {
  const { restaurant } = props;
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

    return () => {
      window.document.body.removeChild(googleMapScript);
      googleMapScript.removeEventListener('load', () => {
        googleMap.current = createGoogleMap();
        marker.current = createMarker();
      });
    };
  }, []);

  useEffect(() => {
    document.title = 'Contact | Emerald Palace';
  }, []);

  return (
    <div className="contact">
      <h1>CONTACT US</h1>
      <div className="container">
        <div className="contact-info">
          <section className="location">
            <h2>
              <FontAwesomeIcon icon={faMapPin} /> Location
            </h2>
            <a href={restaurant?.location.href}>
              {restaurant?.location.address}
            </a>
          </section>
          <section className="phone">
            <h2>
              <FontAwesomeIcon icon={faPhone} /> Phone
            </h2>
            <a href={restaurant?.phone.href}>{restaurant?.phone.label}</a>
          </section>
          <section className="hours">
            <h2>
              <FontAwesomeIcon icon={faClock} /> Hours
            </h2>
            <table>
              <tbody>
                {restaurant?.hours.map((item, index) => (
                  <tr key={index}>
                    <td className="day">{item.day}</td>
                    <td>{item.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <div className="google-map" ref={googleMapRef} />
      </div>
    </div>
  );
};

export default Contact;
