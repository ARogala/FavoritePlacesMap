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
		let handleFilterTextChange = this.props.onFilterTextChange;
		return (
			<div className="searchBarContainer">
				<label htmlFor="filterLocations" className="locationsLabel">Filter Locations:</label>
            	<input
            		type="text"
            		placeholder="Search..."
            		id="filterLocations"
            		value={filterText}
            		onChange={(e) => {
            			handleFilterTextChange(e.target.value);
            		}}
            	/>
			</div>
		);
	}

}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired
}

export default SearchBar;