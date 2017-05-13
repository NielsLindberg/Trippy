import * as types from './types';
import { googleApi } from '../lib/Secrets';
import { GeoLocation } from 'react-native';

const webServicePlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
export function snapToObject(snap) {
	return Object.assign({}, {key: snap.key}, snap.val());
}
export function setUserTripsFetching(indicator) {
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
		dispatch(setUserTripsFetching(true));
		getState().backend.userRef.child(dest).push(item);
	}
}

export function updateUserItem(ref, item) {
	return (dispatch, getState) => {
		dispatch(setUserTripsFetching(true));
		ref.update(item);
	}
}

export function deleteUserItem(ref) {
		return (dispatch, getState) => {
			dispatch(setUserTripsFetching(true));
			ref.off();
			ref.remove();
  }
}

export function getUserTrips() {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child('trips').on('value', (snap) => {
				dispatch(setUserTrips(snap));
				dispatch(setUserTripsFetching(false))		
		})
  }
}
export function setCurrentTrip(trip) {
	return {
		type: types.SET_CURRENT_TRIP,
		payload: trip
	}
}

export function setCurrentTripFetching(indicator) {
	return {
		type: types.SET_CURRENT_TRIP_FETCHING,
		payload: indicator
	}
}

export function setCurrentUserTrip(dest) {
	return (dispatch, getState) => {
		dispatch(setCurrentTripFetching(true));
		dispatch(getUserTrip(dest));
	}
}

export function getUserTrip(dest) {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child(dest).on('value', (snap) => {
	   		dispatch(setCurrentTrip(snap));
	   		dispatch(getMarkers(snap));
	   		dispatch(setCurrentTripFetching(false));
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

export function getCurrentLocation(ref) {
	return (dispatch, getState) => {
		dispatch(setCurrentLocationFetching(true));
		dispatch(getLocation(ref));
	}
}

export function getLocation(ref) {
	 return (dispatch, getState) => {
	   		ref.on('value', (snap) => {
	   		dispatch(setCurrentLocation(snap));
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

export function getMarkers(trip){
	return (dispatch, getState) => {
		var items = [];
		if(typeof trip.val().locations === 'object') {
			trip.child('locations').forEach((child) => {
				if(child.val().place) {
					var marker = {
						id: child.val().place.id,
						title: child.val().place.name,
						description: child.val().place.name,
						latlng: {
							latitude: child.val().place.geometry.location.lat,
							longitude: child.val().place.geometry.location.lng
						}
					}
					items.push(marker);
				}
			});
		}
		dispatch(setMarkers(items));
		dispatch(getCoordinates(items));
	}
}

export function setMarkers(markers) {
	return {
		type: types.SET_MAP_MARKERS,
		payload: markers
	}
}


export function getCoordinates(markers) {
	return (dispatch, getState) => {
		var coordinates = [];
		markers.map((marker) => {
			coordinates.push(marker.latlng)
		})
		
		dispatch(setCoordinates(coordinates));
	}
}

export function setCoordinates(coordinates) {
	return {
		type: types.SET_MAP_COORDINATES,
		payload: coordinates
	}
}

export function zoomMapToMarkers(mapRef) {
	return (dispatch, getState) => {
		mapRef.fitToCoordinates(getState().map.coordinates, {
			edgePadding: {
				top: 150,
			  right: 150,
			  bottom: 50,
			  left: 150
			}, animated: false});
	}
}

export function getGeoLocation(){
	return (dispatch, getState) => {
		navigator.geolocation.getCurrentPosition(
		(position) => {
			let latlng = {latitude: position.coords.latitude, longitude: position.coords.longitude};
			dispatch(setGeoLocation(latlng));
		},
		(error) => alert(JSON.stringify(error)),
		{enableHighAccuracy: false, timeout: 20000, maximumAge: 10000});
	}
}

export function setGeoLocation(coordinates){
	return {
		type: types.SET_MAP_GEOLOCATION,
		payload: coordinates
	}
}