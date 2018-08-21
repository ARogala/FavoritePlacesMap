import React from 'react';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {locations: [
      {title: 'Hawthorne Theaters', location: {lat: 40.948469, lng: -74.155604}, id: 0},
      {title: 'Kirker\'s Inn', location: {lat: 40.949215, lng: -74.153104}, id: 1},
      {title: 'Justin\'s Ristorante', location: {lat: 40.946083, lng: -74.155604}, id: 2},
      {title: 'Bogie\'s Hoagies & Deli', location: {lat: 40.952615, lng: -74.155122}, id: 3},
      {title: 'Diamond Liquors & Tavern', location: {lat: 40.949171, lng: -74.154434}, id: 4},
      {title: 'Goffle Brook Park', location: {lat: 40.94779, lng: -74.161443}, id: 5}
    ]};
  }

  onMapLoad(map, locations) {
    for(let i = 0; i < locations.length; i++) {
      //get the lat and long for each location in the array
      let position = locations[i].location;
      let title = locations[i].title;

      new window.google.maps.Marker({
      position: position,
      title: title,
      map: map,
      id: i,
      animation: window.google.maps.Animation.DROP});
    }

  }

  render() {
    return (
      <div className="container">
        <Map
          id = "map"
          //center is Hawthorne NJ
          options = {{
            center: {lat: 40.948910, lng: -74.155290},
            zoom: 15
          }}
          onMapLoad = {this.onMapLoad}
          locations = {this.state.locations}
        />
        <div className = "searchBox">
          <SearchBar />
          <LocationsList
            locations = {this.state.locations}
          />
        </div>
      </div>
    );
  }
}

export default App;
