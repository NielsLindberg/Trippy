import * as types from '../actions/types';

export const tripsReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_USER_TRIPS: {
			state = {...state, trips: action.payload};
			break;
		}
		case types.SET_CURRENT_TRIP: {
			state = {...state, currentTripKey: action.payload};
			break;
		}
		case types.SET_CURRENT_LOCATION: {
			state = {...state, currentLocationKey: action.payload};
			break;
		}
	}
	return state;
}