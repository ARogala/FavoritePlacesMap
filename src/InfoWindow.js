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
		let marker = this.props.marker;
		console.log(marker);
		return (
			<div>{marker.title}</div>
		);
	}
}

InfoWindow.propTypes = {
  marker: PropTypes.object.isRequired
}

export default InfoWindow;