/**
 *
 * @authors A Rogala
 * @date    2018-08-21 07:12:01
 * @version 1.0
 */
import './SearchBar.css';
import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {

	render() {
		let filterText = this.props.filterText;
		return (
			<div className="searchBarContainer">
				<label htmlFor="filterLocations" className="locationsLabel">Filter Locations:</label>
            	<input
            		type="text"
            		id="filterLocations"
            		value={filterText}
            	/>
			</div>
		);
	}

}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired
}

export default SearchBar;