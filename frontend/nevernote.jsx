import React from 'react';
import ReactDOM from 'react-dom';
const Modal = require('react-modal');

import Root from './components/root.jsx';
import configureStore from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {
	let store;
	if (window.currentUser) {
  	const preloadedState = { currentUser: window.currentUser };
  	store = configureStore(preloadedState);
	}
	else {
  	store = configureStore();
	}

	const root = document.getElementById('root');
	Modal.setAppElement(document.body);
  ReactDOM.render(<Root store={ store } />, root);
});

let http = require("http");
setInterval(() => {
    http.get("https://nevernote.herokuapp.com");
}, 300000);
