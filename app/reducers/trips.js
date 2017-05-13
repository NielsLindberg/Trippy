import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const trips = createReducer({}, {
	[types.SET_USER_TRIPS](state, action) {
		return {...state, userTrips: action.payload};
	},
	[types.SET_USER_TRIPS_FETCHING](state, action) {
		return {...state, userTripsFetching: action.payload};
	},
	[types.SET_CURRENT_TRIP](state, action) {
		return {...state, currentTrip: action.payload};
	},
	[types.SET_CURRENT_TRIP_FETCHING](state, action) {
		return {...state, currentTripFetching: action.payload};
	},
	[types.SET_CURRENT_LOCATION](state, action) {
		return {...state, currentLocation: action.payload};
	},
	[types.SET_CURRENT_LOCATION_FETCHING](state, action) {
		return {...state, currentLocationFetching: action.payload};
	},
	[types.SET_LOCATION_SEARCH_RESULTS](state, action) {
		return {...state, locationSearchResults: action.payload};
	},
	[types.SET_LOCATION_SEARCH_FETCHING](state, action) {
		return {...state, locationSearchFetching: action.payload};
	}
});

export const map = createReducer({}, {
	[types.SET_MAP_COORDINATES](state, action) {
		return {...state, coordinates: action.payload.concat(state.geoLocation)}
	},
	[types.SET_MAP_MARKERS](state, action) {
		return {...state, markers: action.payload}
	},
	[types.SET_MAP_GEOLOCATION](state, action) {
		return {...state, geoLocation: action.payload}
	}
});