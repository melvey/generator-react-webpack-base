import {combineReducers} from 'redux';
import dummyReducer from './DummyReducer';

export default combineReducers({
	dummy: dummyReducer
});
