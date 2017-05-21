import * as types from '../actions/types';

export const fetchingReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_LOGIN_FETCHING: {
			state = {...state, login: action.payload};
			break;
		}
		case types.SET_DIRECTIONS_FETCHING: {
			state = {...state, directions: action.payload};
			break;
		}
		case types.SET_USER_TRIPS_FETCHING: {
			state = {...state, trips: action.payload};
			break;
		}
		case types.SET_LOCATION_SEARCH_FETCHING: {
			state = {...state, locationSearch: action.payload};
			break;
		}
	}
	return state;
}
