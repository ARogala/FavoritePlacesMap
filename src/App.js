import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';
import InfoWindow from './InfoWindow';
import PropTypes from 'prop-types';

//need these global variables in order to pass
//from handleListBtnClick to addInfoWindow()
let MARKERS = [];
let MAP;
let INFOWINDOW;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText.trim()
    });
  }
  /*
    on button click or enter key press
    check for the right marker by comparing the id's
    of the global MARKERS and the locationID from the LocationList
    store the right marker in the marker variable and call
    add infoInfoWindow.
    Not sure how to do this without global variables
    the needed variables are set up in Map.js and onMapLoad() function
    so a assigning a copy to a global var is the only way i know for now.
  */
  handleListBtnClick(locationID, e) {
    if(e === 'Enter' || e === 'click') {
      let marker;
      for(let i = 0; i < MARKERS.length; i++) {
        if(MARKERS[i].id === locationID) {
          marker = MARKERS[i];
        }
      }
      this.addInfoWindow(marker, MAP, INFOWINDOW);
    }
  }

  addInfoWindow(marker, map, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div id="infowindow"></div>');

      infowindow.addListener('domready', () => {
        ReactDOM.render(
          <InfoWindow
            marker = {marker}
          />,
          document.getElementById('infowindow')
        );
      });

      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
      });
    }
  }

  onMapLoad(map) {
    const infowindow = new window.google.maps.InfoWindow();
    const locations = this.props.locations;
    //set globals
    MAP = map;
    INFOWINDOW = infowindow;

    for(let i = 0; i < locations.length; i++) {
      //get the lat and long for each location in the array
      let position = locations[i].location;
      let title = locations[i].title;
      let marker;

      marker = new window.google.maps.Marker({
      position: position,
      title: title,
      map: map,
      id: i,
      animation: window.google.maps.Animation.DROP});

      //set global
      MARKERS.push(marker);

      marker.addListener('click', () => {
        this.addInfoWindow(marker, map, infowindow)
      });

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
          onMapLoad = {(map) => {
            this.onMapLoad(map);
          }}
        />
        <div className = "searchBox">
          <SearchBar
            filterText = {this.state.filterText}
            onFilterTextChange = {(filterText) => {
              this.handleFilterTextChange(filterText);
            }}
          />
          <LocationsList
            locations = {this.props.locations}
            filterText = {this.state.filterText}
            onListBtnClick = {(locationID, e) => {
              this.handleListBtnClick(locationID, e);
            }}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  locations: PropTypes.array.isRequired
}

export default App;
