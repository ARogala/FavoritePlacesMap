/**
 *
 * @authors A Rogala
 * @date    2018-08-20 11:27:37
 * @version 1.0
 * credit: http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/
 */

import React from 'react';
import PropTypes from 'prop-types';

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	//after the google script tag has been loaded init the map
	onScriptLoad() {
		let map;
		map = new window.google.maps.Map(
			document.getElementById(this.props.id), this.props.options);
		//add the marker
		this.props.onMapLoad(map, this.props.locations);

	}
	/*
		as soon as the div below is inserted in the DOM componentDidMount will run
		if google maps is not loaded: load it and when load is finished call
		onScriptLoad to init the map
		else it is safe to call onScriptLoad
	*/
	componentDidMount() {
		//insert the google map script tag
		//if google maps api has not been loaded load it
		if(!window.google) {
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDr6Zqd5wG2EaA2PvjNryTJuze26KQi9PE&v=3';
			//get the first script tag in the html doc
			let x = document.getElementsByTagName('script')[0];
			//insert the google maps script tag as the first script in the body of the dom
			x.parentNode.insertBefore(script, x);
			//call onScriptLoad after script tag is finished loading
			//We cannot access google.maps until it's finished loading
			script.addEventListener('load', e => {
				this.onScriptLoad();
			});
		}
		else {
			this.onScriptLoad();
		}

	}

	render() {
		return (
			<div id={this.props.id} />
		);
	}
}

Map.propTypes = {
	id: PropTypes.string.isRequired,
	options: PropTypes.object.isRequired,
	onMapLoad: PropTypes.func.isRequired,
	locations: PropTypes.array.isRequired
}

export default Map;