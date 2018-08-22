/**
 *
 * @authors ARogala
 * @date    2018-08-21 07:12:58
 * @version 1.0
 */

import './LocationsList.css'
import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class LocationsList extends React.Component {
	render() {
		const locations = this.props.locations;
		let filterText = this.props.filterText;

		/* Filter logic
		secapeRegExp escapes special characters
		Regular expressions are patterns used to match character combinations in strings

		so pattern will be a regexp with special char and case 'i' ignored
		then filter the locations array useing test() to search for a match
		between the regular expression and a specified string ignoring case and
		special char.
		finally sort the filtered list by title
		*/

		const pattern = new RegExp(escapeRegExp(filterText), 'i');
		let filteredLocations = locations.filter((location) => pattern.test(location.title + location.category));
		filteredLocations.sort(sortBy('title'));

		//build the locationList elements
		const locationsList = filteredLocations.map((location) => {
			return (
				<li key={location.id}>{location.title + ' - ' + location.category}</li>
			);
		});

		return (
			<ul className="locationsList">
				{locationsList}
			</ul>
		);
	}
}

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired
}

export default LocationsList;