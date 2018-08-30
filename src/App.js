import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Map from './Map';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';
import InfoWindow from './InfoWindow';
import PropTypes from 'prop-types';

/*
  need these global variables in order to pass
  from handleListBtnClick to getFoursquareData()
  Did not add these var to state because MAP and INFOWINDOW
  don't change and MARKERS can be computed
  based on location props
*/
let MARKERS = [];
let MAP;
let INFOWINDOW;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      foursquareURL: '',
      foursquareAddress: [],
      resultsReturned: null,
      fetchError: null,
      error: ''
    };
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  /*
    place markers to be shown in an array
    clear all the markers
    then show only filtered markers
  */
  filterMarkers(filteredLocations) {
    //console.log(filteredLocations);
    let showMarkers = [];
    for(let i = 0; i < filteredLocations.length; i++) {
      for(let j = 0; j < MARKERS.length; j++) {
        if(MARKERS[j].id === filteredLocations[i].id) {
          showMarkers.push(MARKERS[j]);
        }
      }
    }
    //console.log(showMarkers);
    for(let i = 0; i < MARKERS.length; i++) {
      MARKERS[i].setVisible(false);
    }
    for(let i = 0; i < showMarkers.length; i++) {
      showMarkers[i].setVisible(true);
    }
  }

  /*
    on button click or enter key press
    check for the right marker by comparing the id's
    of the global MARKERS and the locationID from the LocationList.
    store the right marker in the marker variable and call
    getFoursquareData(). Foursquare data must be fetched and resolved before
    the call the addInfoWindow(). Parameters map and infowindow are not used in
    getFoursquareData() but are passed down to addInfoWindow().

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
      this.getFoursquareData(marker, MAP, INFOWINDOW);
      this.removeBounce();
      this.addBounce(marker);
    }
  }

  getFoursquareData(marker, map, infowindow) {

    let markerLat = marker.position.lat();
    let markerLng = marker.position.lng();
    let markerTitle = marker.title;
    let clientID = 'D2QY4QR2LLI5AIE1PMHR43G1FQSC25H035FBU420P3GQQXW1';
    let clientSecret = 'RJPKQG30WDTYQCVHWHA2WHE1TIUUGCTHDBV3OQHZH4JRL3LG';

    let url ='https://api.foursquare.com/v2/venues/search?client_id='+clientID+
    '&client_secret='+clientSecret+'&v=20180323&ll='+markerLat+','+markerLng+
    '&query='+markerTitle+'&intent=match';

    fetch(url)
    .then((response) => {
      // Code for handling API response
      if(response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      //console.log(data['response']['venues']);
      const locationObject = data['response']['venues'][0];
      if(typeof locationObject === 'undefined') {
        this.setState({foursquareURL: ''});
        this.setState({foursquareAddress: []});
        this.setState({resultsReturned: false});
      }
      else {
        const id = locationObject['id'] ;
        const foursquareURL = 'https://www.foursquare.com/v/'+id;
        const addressArray = locationObject['location']['formattedAddress'];
        this.setState({foursquareURL: foursquareURL});
        this.setState({foursquareAddress: addressArray});
        this.setState({resultsReturned: true});
      }
      this.addInfoWindow(marker, map, infowindow);
      this.setState({fetchError: false});
    })
    .catch((error) => {
      this.setState({error: error.toString()});
      this.setState({fetchError: true});
      console.log(error);
      this.addInfoWindow(marker, map, infowindow);
    });
  }

  addStreetView(marker) {
    let errorDiv = document.getElementById('error');
    let streetViewService = new window.google.maps.StreetViewService();
    let radius = 50;
    let panorama = new window.google.maps.StreetViewPanorama(document.getElementById('pano'));
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    // In case the status is OK, which means the pano was found, compute the
    // position of the streetview image, then calculate the heading, then get a
    // panorama from that and set the options
    function getStreetView(data, status) {
      if(status === window.google.maps.StreetViewStatus.OK) {
        errorDiv.innerText = '';
        let nearStreetViewLocation = data.location.latLng;
        let heading = window.google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position);
        panorama.setOptions({addressControl: false});
        panorama.setPosition(nearStreetViewLocation);
        panorama.setPov({
          heading: heading,
          pitch: 10
        });

      }
      else {
        errorDiv.innerText = 'Sorry no street view image for this location';
      }
    }
  }

  addInfoWindow(marker, map, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      //hide filter list when info window is rendered
      //makes for better mobile UX
      let searchBox = document.getElementsByClassName('searchBox');
      searchBox[0].setAttribute('style', 'z-index: -1;');

      infowindow.marker = marker;
      //clear previous content
      infowindow.setContent('');
      infowindow.setContent('<div id="infowindow"></div><div id="pano"></div>');

      //domready is a google infowindow event that fires when when the div
      //containing the InfoWindow's content is attached to the DOM
      infowindow.addListener('domready', () => {
        ReactDOM.render(
          <InfoWindow
            marker = {marker}
            foursquareURL = {this.state.foursquareURL}
            foursquareAddress = {this.state.foursquareAddress}
            resultsReturned = {this.state.resultsReturned}
            error = {this.state.error}
            fetchError = {this.state.fetchError}
          />,
          document.getElementById('infowindow')
        );
      });

      //once dom is ready and pano div is there addStreetView
      infowindow.addListener('domready',() => {
        this.addStreetView(marker);
      });

      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      // show filter list when info window is closed
      infowindow.addListener('closeclick', () => {
        searchBox[0].setAttribute('style', 'z-index: 1;');
        infowindow.marker = null;
        this.removeBounce();
      });
    }
  }

  removeBounce() {
    for(let i = 0; i < MARKERS.length; i++) {
      if(MARKERS[i].getAnimation() !== null) {
        MARKERS[i].setAnimation(null);
      }
    }
  }

  addBounce(marker) {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
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
        this.getFoursquareData(marker, map, infowindow);
        this.removeBounce();
        this.addBounce(marker);
      });
    }
  }

  render() {
    return (
      <main role="main" className="container">
        <Map
          id = "map"
          //center is Metuchen NJ
          options = {{
            center: {lat: 40.543255, lng: -74.362952},
            zoom: 8
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
            filterMarkers = {(filteredLocations) => {
              this.filterMarkers(filteredLocations);
            }}
          />
        </div>
      </main>
    );
  }
}

App.propTypes = {
  locations: PropTypes.array.isRequired
}

export default App;
