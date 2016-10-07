/**
* RootReducer.js
* The root reducer to combine all other reducers used in the application
**/

import {combineReducers} from 'redux';
import dummyReducer from './DummyReducer';

export default combineReducers({
	dummy: dummyReducer
});
