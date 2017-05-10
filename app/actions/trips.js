import * as types from './types';
import { googleApi } from '../lib/Secrets';

const webServicePlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
export function snapToObject(snap) {
	return Object.assign({}, {key: snap.key}, snap.val());
}
export function setTripsIndicator(indicator) {
	return {
		type: types.SET_USER_TRIPS_FETCHING,
		payload: indicator
	}
}

export function setUserTrips(trips) {
	return {
		type: types.SET_USER_TRIPS,
		payload: trips
	}
}

export function addUserItem(dest, item){
	return (dispatch, getState) => {
		dispatch(setTripsIndicator(true));
		getState().backend.userRef.child(dest).push(item);
	}
}

export function updateUserItem(dest, item) {
	return (dispatch, getState) => {
		getState().backend.userRef.child(dest).update(item);
		console.log(getState().backend.userRef.child(dest));
		console.log(item);
	}
}

export function deleteUserItem(dest) {
		return (dispatch, getState) => {
			dispatch(setTripsIndicator(true));
			getState().backend.userRef.child(dest).remove();
  }
}

export function getUserTrips() {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child('trips').on('value', (snap) => {
				var items = [];
					snap.forEach((child) => {
						items.push(child);

				});
				dispatch(setUserTrips(items));
				dispatch(setTripsIndicator(false))
				
		})
  }
}
export function setCurrentTrip(trip) {
	return {
		type: types.SET_CURRENT_TRIP,
		payload: trip
	}
}

export function setCurrentTripIndicator(indicator) {
	return {
		type: types.SET_CURRENT_TRIP_FETCHING,
		payload: indicator
	}
}

export function setCurrentUserTrip(dest) {
	return (dispatch, getState) => {
		dispatch(getUserTrip(dest));
	}
}

export function getUserTrip(dest) {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child(dest).on('value', (snap) => {
	   		dispatch(setCurrentTripIndicator(true));
	   		dispatch(setCurrentTrip(snap));
	   		dispatch(setCurrentTripIndicator(false));
		});
  }
}

export function setCurrentLocation(location) {
	return {
		type: types.SET_CURRENT_LOCATION,
		payload: location
	}
}

export function setCurrentLocationFetching(indicator) {
	return {
		type: types.SET_CURRENT_LOCATION_FETCHING,
		payload: indicator
	}
}

export function getCurrentLocation(dest) {
	return (dispatch, getState) => {
		dispatch(setCurrentLocationFetching(true));
		dispatch(getLocation(dest));
	}
}

export function getLocation(dest) {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child(dest).on('value', (snap) => {
	   		dispatch(setCurrentLocation(snapToObject(snap)));
	   		dispatch(setCurrentLocationFetching(false));
		});
  }
}

export function setLocationSearchResults(results) {
	return {
		type: types.SET_LOCATION_SEARCH_RESULTS,
		payload: results
	}
}

export function setLocationSearchFetching(indicator) {
	return {
		type: types.SET_LOCATION_SEARCH_FETCHING,
		payload: indicator
	}
}

export function getLocationSearch(searchString) {
	return (dispatch, getState) => {
		dispatch(setLocationSearchFetching(true));
		fetch(webServicePlaceSearch + searchString + '&key=' + googleApi)
		.then((response) => {
			response.json()
			.then((results) => {
				dispatch(setLocationSearchResults(results.results))
				dispatch(setLocationSearchFetching(false))
			})
		})
		.catch((error) => {
			error.json()
			.then((results) => {
				dispatch(setLocationSearchFetching(false))
			})
		})
  }
}