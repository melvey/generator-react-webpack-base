import actionTypes from '../core/actionTypes';

/**
 * @param {Object} dummy data to be saved to the store
 **/
export default function setDummyAction(location) {
	return {
		type: actionTypes.setDummy,
		payload: location
	};
}

