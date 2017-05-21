import * as types from '../actions/types';

export const locationSearchReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_LOCATION_SEARCH_RESULTS: {
			state = {...state, results: action.payload};
			break;
		}
	}
	return state;
}