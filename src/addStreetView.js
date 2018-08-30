/**
 *
 * @authors A Rogala
 * @date    2018-08-30 17:08:25
 * @version $Id$
 */

 export default function addStreetView(marker) {
	let errorDiv = document.getElementById('error');
	let streetViewService = new window.google.maps.StreetViewService();
	let radius = 50;
	let panorama = new window.google.maps.StreetViewPanorama(document.getElementById('pano'));
	// Use streetview service to get the closest streetview image within
	// 50 meters of the markers position
	streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
	// In case the status is OK, which means the pano was found, compute the
	// position of the streetview image, then calculate the heading, then get a
	// panorama from that and set the options
	function getStreetView(data, status) {
		if(status === window.google.maps.StreetViewStatus.OK) {
			errorDiv.innerText = '';
			let nearStreetViewLocation = data.location.latLng;
			let heading = window.google.maps.geometry.spherical.computeHeading(
			nearStreetViewLocation, marker.position);
			panorama.setOptions({addressControl: false});
			panorama.setPosition(nearStreetViewLocation);
			panorama.setPov({
				heading: heading,
				pitch: 10
			});

		}
		else {
			errorDiv.innerText = 'Sorry no street view image for this location';
		}
	}
}