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
		const clickBtnFunc = this.props.onListBtnClick;
		const filterMarkers = this.props.filterMarkers;
		let filterText = this.props.filterText.trim();
		filterText = filterText.replace(/ /g, '');

		/* Filter logic
		escapeRegExp escapes special characters
		Regular expressions are patterns used to match character combinations in strings

		so pattern will be a regexp with special char and case 'i' ignored
		then filter the locations array useing test() to search for a match
		between the regular expression and a specified string ignoring case and
		special char.
		finally sort the filtered list by state
		*/

		const pattern = new RegExp(escapeRegExp(filterText), 'i');
		let filteredLocations = locations.filter((location) => pattern.test((location.title + location.category + location.state).replace(/ /g,'')));
		filteredLocations.sort(sortBy('state'));
		//console.log(filteredLocations);
		filterMarkers(filteredLocations);

		//Build the DOM with the filteredLocations

		//https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
		function toTitleCase(str) {
			return str.replace(/\w\S*/g, function(txt){
			    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
		function groupBy(objectArray, property) {
			return objectArray.reduce(function (acc, obj) {
				//remove case sensitivity
				obj[property] = toTitleCase(obj[property]);
				//store the category in key
				let key = obj[property];
				//if the accumulator object at key is undefined place empty array
				if (!acc[key]) {
				  acc[key] = [];
				}
				//push objects with the same key into their array
				//return accumulator
				acc[key].push(obj);
				return acc;
			}, {});
		}

		//groupedLocations is an object with arrays of locations for each state {state1: [{...}], state2:[{...}]}
		let groupedLocations = groupBy(filteredLocations, 'state');
		//console.log(groupedLocations);
		let allStates = Object.keys(groupedLocations);
		allStates.sort();
		//console.log(allStates);

		/*
			for each state if the number of locations is greater than 1
			build the DOM
		*/
		let dropDownUL = [];
		for(let i = 0; i < allStates.length; i++) {
			if(groupedLocations[allStates[i]].length > 1) {
				//build the dropDownUL
				dropDownUL.push(
					<li key={i}>
						<span>{allStates[i]}:</span>
						<ul aria-label="submenu" className="dropDown">
							{groupedLocations[allStates[i]].map((location) => {
								return (
									<li
										key={location.id} onClick={(e) => {clickBtnFunc(location.id, e.type)}}
										onKeyPress={(e) => {clickBtnFunc(location.id, e.key)}}
			 							role="button"
			 							tabIndex="0"
		 							>
		 								{location.title + ' - ' + location.category}
		 							</li>
								);
							})}
						</ul>
					</li>
				);
			}
		}

		//build the DOM for the states with one location
		let singleLocation = [];
		for(let i = 0; i < allStates.length; i++) {
			if(groupedLocations[allStates[i]].length === 1) {
				singleLocation.push(
				<li className="singleLocation"
					key={groupedLocations[allStates[i]][0].id}
					onClick={(e) => {clickBtnFunc(groupedLocations[allStates[i]][0].id, e.type)}}
					onKeyPress={(e) => {clickBtnFunc(groupedLocations[allStates[i]][0].id, e.key)}}
					role="button"
					tabIndex="0"
				>
					{groupedLocations[allStates[i]][0].title + ' - ' + groupedLocations[allStates[i]][0].category}
				</li>
				);
			}
		}

		return (
			<ul className="locationsList">
				{dropDownUL}
				<span>Single Locations:</span>
				{singleLocation}
			</ul>
		);
	}
}

LocationsList.propTypes = {
  locations: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  onListBtnClick: PropTypes.func.isRequired,
  filterMarkers: PropTypes.func.isRequired
}

export default LocationsList;