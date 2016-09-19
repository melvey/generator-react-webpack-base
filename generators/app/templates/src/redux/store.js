/**
* store.js
* Redux store definiation
**/
import {createStore} from 'react-redux';
import reducer from './reducers/RootReducer';

export default createStore(reducer);

