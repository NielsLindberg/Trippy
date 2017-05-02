import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const trips = createReducer({}, {
	[types.SET_USER_TRIPS](state, action) {
		return {...state, userTrips: action.payload};
	},
	[types.SET_CURRENT_TRIP](state, action) {
		return {...state, currentTrip: action.payload};
	},
	[types.SET_CURRENT_TRIP_FETCHING](state, action) {
		return {...state, currentTripFetching: action.payload};
	},
	[types.SET_USER_TRIPS_FETCHING](state, action) {
		return {...state, userTripsFetching: action.payload};
	}
});