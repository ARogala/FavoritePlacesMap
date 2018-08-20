import React from 'react';
import './App.css';
import Map from './Map';

class App extends React.Component {

  onMapLoad(map) {
    new window.google.maps.Marker({
      position: { lat: 40.948910, lng: -74.155290 },
      map: map,
      title: 'Hello Hawthorn NJ!'});
  }

  render() {
    return (
      <Map
        id="map"
        options={{
          center: {lat: 40.948910, lng: -74.155290},
          zoom: 12
        }}
        onMapLoad={this.onMapLoad}
      />
    );
  }
}

export default App;
