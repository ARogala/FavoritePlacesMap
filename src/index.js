import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const LOCATIONS = [
	{title: 'Hawthorne Theaters', category: 'Movie Theater', location: {lat: 40.948469, lng: -74.155604}, id: 0},
	{title: 'Kirker\'s Inn', category: 'Restaurant', location: {lat: 40.949215, lng: -74.153104}, id: 1},
	{title: 'Justin\'s Ristorante', category: 'Restaurant', location: {lat: 40.946083, lng: -74.155604}, id: 2},
	{title: 'Bogie\'s Hoagies & Deli', category: 'Restaurant', location: {lat: 40.952615, lng: -74.155122}, id: 3},
	{title: 'Diamond Liquors & Tavern', category: 'Liquor Store', location: {lat: 40.949171, lng: -74.154434}, id: 4},
	{title: 'Goffle Brook Park', category: 'Park', location: {lat: 40.94779, lng: -74.161443}, id: 5},
	{title: 'Harriman State Park', category: 'Park', location: {lat: 41.174056, lng: -74.16854}, id: 6}
];

ReactDOM.render(<App locations={LOCATIONS} />, document.getElementById('root'));
registerServiceWorker();
