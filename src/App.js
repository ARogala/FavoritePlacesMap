import React from 'react';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          locations = {this.props.locations}
        />
        <div className = "searchBox">
          <SearchBar />
          <LocationsList
            locations = {this.props.locations}
          />
        </div>
      </div>
    );
  }
}

export default App;
