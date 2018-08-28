import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const LOCATIONS = [
	{title: 'Hawthorne Theaters', category: 'Movie Theater', state: 'New Jersey', location: {lat: 40.948469, lng: -74.155604}, id: 0},
	{title: 'Kirker\'s Inn', category: 'Restaurant', state: 'New Jersey', location: {lat: 40.949215, lng: -74.153104}, id: 1},
	{title: 'Justin\'s Ristorante', category: 'Restaurant', state: 'New Jersey', location: {lat: 40.946083, lng: -74.155604}, id: 2},
	{title: 'Bogie\'s Hoagies & Deli', category: 'Restaurant', state: 'New Jersey', location: {lat: 40.952615, lng: -74.155122}, id: 3},
	{title: 'Diamond Liquors & Tavern', category: 'Liquor Store', state: 'New Jersey', location: {lat: 40.949171, lng: -74.154434}, id: 4},
	{title: 'Goffle Brook Park', category: 'Park', state: 'New Jersey', location: {lat: 40.944145, lng: -74.16235}, id: 5},
	{title: 'Bear Mountain State Park', category: 'Park', state: 'New York', location: {lat: 41.314214, lng: -73.997840}, id: 6},
	{title: 'Wawayanda State Park', category: 'Park', state: 'New Jersey', location: {lat: 41.190122, lng: -74.429556}, id: 7},
	{title: 'Walkway Over the Hudson', category: 'Scenic Bridge', state: 'New York', location: {lat: 41.710614, lng: -73.945839}, id: 8},
	{title: 'Railroad Museum of Pennsylvania', category: 'Museum', state: 'Pennsylvania', location: {lat: 39.982486, lng: -76.160227}, id: 9},
	{title: 'Harriman State Park', category: 'Park', state: 'New York', location: {lat: 41.235898, lng: -74.144976}, id: 10},
	{title: 'Bronx Zoo', category: 'Zoo', state: 'New York', location: {lat: 40.850751, lng: -73.877003}, id: 11},
	{title: 'Cape May Lighthouse', category: 'Park', state: 'New Jersey', location: {lat: 38.933195, lng: -74.960376}, id: 12},
	{title: 'Menz Restaurant & Bar', category: 'Restaurant', state: 'New Jersey', location: {lat: 39.024300, lng: -74.896646}, id: 13},
	{title: 'NAS Wildwood Aviation Museum', category: 'Museum', state: 'New Jersey', location: {lat: 39.005568, lng: -74.909602}, id: 14},
	{title: 'Turtle Back Zoo', category: 'Zoo', state: 'New Jersey', location: {lat: 40.768188, lng: -74.280034}, id: 15}
];

ReactDOM.render(<App locations={LOCATIONS} />, document.getElementById('root'));
registerServiceWorker();
