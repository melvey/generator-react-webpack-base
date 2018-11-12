/**
* store.js
* Redux store definiation
**/
import {createStore} from 'redux';
import reducer from './reducers/RootReducer';

let preloadedState = {};
if(typeof(window) !== 'undefined') {
	preloadedState = window.__PRELOADED_STATE__;
	Object.getOwnPropertyNames(preloadedState).forEach((prop) => {
		preloadedState[prop] = preloadedState[prop];
	});
}

export default createStore(reducer, preloadedState);

