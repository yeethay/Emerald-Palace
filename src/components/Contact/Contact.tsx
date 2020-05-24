import React, {Component}  from 'react';
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

class Contact extends Component {
  googleMapRef = React.createRef<HTMLDivElement>();
  googleMap : google.maps.Map<Element> | undefined;
  marker : google.maps.Marker | undefined;
  restaurantLocation : Location = { lat: 51.098501, lng: -113.962162 };

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current as Element, {
      zoom: 16,
      center: this.restaurantLocation,
      disableDefaultUI: true
    })

  createMarker = () =>
    new window.google.maps.Marker({
      position: this.restaurantLocation,
      map: this.googleMap,
    })

  componentDidMount() {
    const googleMapScript = document.createElement('script');

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
      this.marker = this.createMarker()
    })
  }

  render() {
    return (
      <div className="contact">
        <h1 className="header"> Contact Us </h1>
        <div
          id="google-map"
          ref={this.googleMapRef}
        />
      </div>
    )
  }
}

export default Contact;
