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
		var coords = [];
		if(state.geoLocation) {
			coords = action.payload.concat(state.geoLocation);
		} else {
			coords = action.payload;
		}
		return {...state, coordinates: coords}
	},
	[types.SET_MAP_POLYLINE](state, action) {
		return {...state, polyline: action.payload}
	},
	[types.SET_MAP_MARKERS](state, action) {
		return {...state, markers: action.payload}
	},
	[types.SET_DIRECTIONS_RESULTS](state, action) {
		return {...state, directions: action.payload}
	},
	[types.SET_DIRECTIONS_FETCHING](state, action) {
		return {...state, directionsFetching: action.payload}
	},
	[types.SET_MAP_GEOLOCATION](state, action) {
		return {...state, geoLocation: action.payload}
	}
});