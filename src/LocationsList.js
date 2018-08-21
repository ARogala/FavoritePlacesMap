/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-08-21 07:12:58
 * @version $Id$
 */

import './LocationsList.css'
import React from 'react';

class LocationsList extends React.Component {
	render() {

		return (
			<ul className="locationsList">
				<li>Bogies Hogies</li>
				<li>Justin's</li>
				<li>Diamond Bridge Liquors</li>
				<li>Hawthorne Movie Theater</li>
				<li>Goffel Brook Park</li>
				<li>Billy's Arcade</li>
			</ul>
		);
	}
}

export default LocationsList;