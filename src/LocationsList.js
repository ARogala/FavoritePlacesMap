/**
 *
 * @authors ARogala
 * @date    2018-08-21 07:12:58
 * @version 1.0
 */

import './LocationsList.css'
import React from 'react';
import PropTypes from 'prop-types';

class LocationsList extends React.Component {
	render() {
		const locations = this.props.locations;
		const locationTitle = locations.map((location) => {
			return (
				<li key={location.id}>{location.title}</li>
			);
		});

		return (
			<ul className="locationsList">
				{locationTitle}
			</ul>
		);
	}
}

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired
}

export default LocationsList;