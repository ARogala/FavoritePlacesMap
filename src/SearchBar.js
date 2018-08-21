/**
 *
 * @authors A Rogala
 * @date    2018-08-21 07:12:01
 * @version 1.0
 */
import './SearchBar.css';
import React from 'react';

class SearchBar extends React.Component {

	render() {
		return (
			<div className="searchBarContainer">
				<label for="filterLocations" className="locationsLabel">Filter Locations:</label>
            	<input type="text" id="filterLocations"/>
			</div>
		);
	}

}

export default SearchBar;