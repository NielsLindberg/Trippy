import * as types from '../actions/types';

export const backendReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_BACKEND: {
			state = {...state, ref: action.payload};
			break;
		}
		case types.SET_BACKEND_ITEMSREF: {
			state = {...state, itemsRef: action.payload};
			break;
		}
		case types.SET_BACKEND_USERREF: {
			state = {...state, userRef: action.payload};
			break;
		}
	}
	return state;
}