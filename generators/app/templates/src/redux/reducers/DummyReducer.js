import actionTypes from '../core/actionTypes';

function copyDummyData(data) {
	const newDummy = {
		myData: dummy
	};
	return newDummy;
}

export default function setDummyReducer(state, action) {
	switch(action.type) {
		case actionTypes.setDummy:
			return copyDummyData(action.payload);
		default:
			return state || {};
	}
}
