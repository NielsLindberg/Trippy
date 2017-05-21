import * as types from '../actions/types';

export const layoutReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_ORIENTATION: {
			state = {...state, dimensions: action.payload};
			break;
		}
	}
	return state;
}