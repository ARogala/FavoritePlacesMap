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
	{title: 'Goffle Brook Park', category: 'Park', state: 'New Jersey', location: {lat: 40.94779, lng: -74.161443}, id: 5},
	{title: 'Harriman State Park', category: 'Park', state: 'New York', location: {lat: 41.2354960, lng: -74.1449013}, id: 6},
	{title: 'Wawayanda State Park', category: 'Park', state: 'New Jersey', location: {lat: 41.190122, lng: -74.429556}, id: 7},
	{title: 'Walkway Over the Hudson', category: 'Scenic Bridge', state: 'New York', location: {lat: 41.710614, lng: -73.945839}, id: 8},
	{title: 'Railroad Museum of Pennsylvania', category: 'Museum', state: 'Pennsylvania', location: {lat: 39.982486, lng: -76.160227}, id: 9}
];

ReactDOM.render(<App locations={LOCATIONS} />, document.getElementById('root'));
registerServiceWorker();
