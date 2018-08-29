/**
 *
 * @authors A Rogala
 * @date    2018-08-23 10:33:50
 * @version $Id$
 */

import React from 'react';
import PropTypes from 'prop-types';

class InfoWindow extends React.Component {
	render() {
		const foursquareLink = this.props.foursquareURL;
		const addressArray = this.props.foursquareAddress;
		const marker = this.props.marker;
		const title = marker.title;
		const googleMapLink = 'https://www.google.com/maps/search/?api=1&query='+title;
		//const markerLat = marker.position.lat();
		//const markerLng = marker.position.lng();
		//const streetViewURL = 'https://maps.googleapis.com/maps/api/streetview?size=200x200&location='+markerLat+
		//','+markerLng+'&fov=120&pitch=10&key=AIzaSyDr6Zqd5wG2EaA2PvjNryTJuze26KQi9PE';
		//<div><img src={streetViewURL} alt='Google street view image'/></div>
		if(this.props.resultsReturned) {
			return (
				<div>
					<div>{title}</div>
					<div><a href={foursquareLink} target="_blank">View location on Foursquare</a></div>
					<div><a href={googleMapLink} target="_blank">Search location on Google Maps</a></div>
					<div>{addressArray[0]}</div>
					<div>{addressArray[1]}</div>
					<div>{addressArray[2]}</div>
					<br/>
					<div id="error"></div>
				</div>
			);
		}
		else if(this.props.resultsReturned === false) {
			return (
				<div>
					<div>{title}</div>
					<div><a href={googleMapLink} target="_blank">Search location on Google Maps</a></div>
					<div>Foursquare did not return an exact match for this location.<br/>
					Try different coordinates</div>
					<br/>
					<div id="error"></div>
				</div>
			);
		}
		else if(this.props.fetchError) {
			return (
				<div>
					<div>{title}</div>
					<div><a href={googleMapLink} target="_blank">Search location on Google Maps</a></div>
					<div>Sorry the Foursquare api returned an error</div>
					<div>{this.props.error}</div>
					<br/>
					<div id="error"></div>
				</div>
			);
		}
	}
}

InfoWindow.propTypes = {
  marker: PropTypes.object.isRequired,
  foursquareURL: PropTypes.string.isRequired,
  foursquareAddress: PropTypes.array.isRequired,
  resultsReturned: PropTypes.bool.isRequired,
  fetchError: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

export default InfoWindow;