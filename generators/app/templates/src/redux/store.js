/**
* store.js
* Redux store definiation
**/
import {createStore} from 'redux';
import reducer from './reducers/RootReducer';

let preloadedState = {};
if(typeof(window) !== 'undefined') {
	preloadedState = window.__PRELOADED_STATE__;
}

export default createStore(reducer, preloadedState);

