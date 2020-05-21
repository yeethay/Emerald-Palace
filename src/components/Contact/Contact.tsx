import React, {Component}  from 'react';
import './Contact.css';

declare global {
  interface Window {
    google: typeof google;
  }
}

class Contact extends Component {
  googleMapRef = React.createRef<HTMLDivElement>()
  googleMap : google.maps.Map<Element> | undefined;

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current as Element, {
      zoom: 16,
      center: {
        lat: 51.098501,
        lng: -113.962162,
      },
      disableDefaultUI: true
    })

  componentDidMount() {
    const googleMapScript = document.createElement('script');

    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDaM9x9uzk8LcfX6IGPhAS20B7g5rskYdo&callback=initMap`

    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap()
    })
  }

  render() {
    return (
      <div className="contact">
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '400px', height: '300px' }}
        />
      </div>
    )
  }
}

export default Contact;
