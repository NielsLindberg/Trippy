import * as types from './types';

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
		getState().backend.userRef.child(dest).push(item);
	}
}

export function updateUserItem(dest, item) {
	return (dispatch, getState) => {
		getState().backend.userRef.child(dest).update(item);
	}
}

export function deleteUserItem(dest) {
		return (dispatch, getState) => {
			getState().backend.userRef.child(dest).remove();
  }
}

export function getUserTrips() {
	 return (dispatch, getState) => {
	   	getState().backend.userRef.child('trips').on('value', (snap) => {
	   		dispatch(setTripsIndicator(true));
				dispatch(setUserTrips(snap));
				dispatch(setTripsIndicator(false));
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