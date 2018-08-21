import React from 'react';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';

class App extends React.Component {


  onMapLoad(map) {
    new window.google.maps.Marker({
      position: { lat: 40.948910, lng: -74.155290 },
      map: map,
      title: 'Hello Hawthorne NJ!'});
  }

  render() {
    let locations = [
      {title: 'Hawthorne Theaters', location: {lat: 40.948569, lng: -74.155620}},
      {title: 'Kirkers Inn', location: {lat: 40.949331, lng: -74.153089}},
      {title: 'Justins Ristorante', location: {lat: 40.946203, lng: -74.155600}},
      {title: 'Bogies Hoagies & Deli', location: {lat: 40.952652, lng: -74.155101}},
      {title: 'Diamond Liquors & Tavern', location: {lat: 40.949249, lng: -74.154441}},
      {title: 'Goffle Brook Park', location: {lat: 40.947875, lng: -74.161451}}
    ];
    return (
      <div className="container">
        <Map
          id="map"
          options={{
            center: {lat: 40.948910, lng: -74.155290},
            zoom: 12
          }}
          onMapLoad={this.onMapLoad}
        />
        <div className="searchBox">
          <SearchBar />
          <LocationsList />
        </div>
      </div>
    );
  }
}

export default App;
