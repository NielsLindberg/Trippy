import * as types from './types';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import RNFirebase from 'react-native-firebase';

const noEmailPassword = {message: 'Enter an email and password.'};
const clearErrorMessage = {message: ''};

export function setGoogleSigninConfigure() {
	return (dispatch) => {
		GoogleSignin.configure({
  		scopes: [
  		'email', 
  		'profile', 
  		'https://www.googleapis.com/auth/plus.login'],
       webClientId: '829908519527-ctbffmpd93dmoodqtug63ekd945nosa8.apps.googleusercontent.com',
       offlineAccess: false,
       forceConsentPrompt: true
		});
		dispatch(setGoogleSigninConfigureState());
	}
}

export function setGoogleSigninConfigureState() {
	return {
		type: types.SET_GOOGLE_CONFIG
	}
}

export function addFirestack() {
	const firestack = RNFirebase.initializeApp({
	});	
	return {
		type: types.SET_FIRESTACK,
		firestack
	}
}
export function setCurrentUser(user) {
	return {
		type: types.SET_FIREBASE_USER,
		user
	}
}

export function setGoogleUser(user) {
	return {
		type: types.SET_GOOGLE_USER,
		user
	}
}

export function getGoogleSignin() {
	return (dispatch, getState) => {
		if(getState().setGoogleConfig) {
		GoogleSignin.currentUserAsync().then((user) => {
		  if(user != null) {
		    dispatch(signInWithGoogle(user.idToken));
		    dispatch(setGoogleUser(user));
		  } else {
		    dispatch(letGoogleSignin());
		  }
		})
	} else {
		dispatch(setGoogleSigninConfigure());
		dispatch(getGoogleSignin());
	}
	}
}

export function letGoogleSignin() {
	return (dispatch) => {
		GoogleSignin.signIn()
		.then(() => {
			dispatch(getGoogleSignin())
		})
		.catch((err) => {
		  console.log('WRONG SIGNIN', err);
		})
	}
}

export function signUpWithEmail(email, password) {
	return (dispatch, getState) => {
		dispatch(setLoginResponse(clearErrorMessage));
		if(email && password) {
			dispatch(setLoginIndicator(true));
			getState().setFirestack.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				dispatch(setLoginResponse(response))
				dispatch(getCurrentUser())
			})
			.catch((err) => {
				dispatch(setLoginResponse(err))
				dispatch(setLoginIndicator(false));
			})
		} else {
				dispatch(setLoginResponse(noEmailPassword));
		}
	}
}

export function signInWithEmail(email, password) {
	return (dispatch, getState) => {
		dispatch(setLoginResponse(clearErrorMessage));
		if(email && password) {
			dispatch(setLoginIndicator(true));
			getState().setFirestack.auth().signInWithEmailAndPassword(email, password)
			.then((response) => {
				dispatch(setLoginResponse(response))
				dispatch(getCurrentUser())
			})
			.catch((err) => {
				dispatch(setLoginResponse(err));
				dispatch(setLoginIndicator(false));
			})
		} else {
			dispatch(setLoginResponse(noEmailPassword));
		}
	}
}

export function signInWithGoogle(idToken){
	return (dispatch, getState) => {
		dispatch(setLoginResponse(clearErrorMessage));
		dispatch(setLoginIndicator(true));
    getState().setFirestack.auth().signInWithCredential({provider: 'google', token: idToken})
    .then(() => {
    dispatch(getCurrentUser());
    })
    .catch((err) => {
			dispatch(setLoginResponse(err))
			dispatch(setLoginIndicator(false));
		})
  }
}

export function setLoginResponse(response) {
	return {
		type: types.SET_LOGIN_RESPONSE,
		payload: response
	}
}

export function setLoginIndicator(indicator) {
	return {
		type: types.SET_LOGIN_INDICATOR,
		payload: indicator
	}
}

export function setTripsIndicator(indicator) {
	return {
		type: types.SET_TRIPS_INDICATOR,
		payload: indicator
	}
}

export function getUserRef(user) {
  return (dispatch, getState) => {
     let userRef = getState().setFirestack.itemsRef.child("users/" + user.uid);
     dispatch(setUserRef(userRef));
     dispatch(getUserTrips());
  }
}

export function setUserRef(userRef) {
	return {
		type: types.SET_FIREBASE_USERREF,
		userRef
	}
}

export function getCurrentUser() {
	return (dispatch, getState) => {
    let user = getState().setFirestack.auth().currentUser
      dispatch(setCurrentUser(user))
      dispatch(getUserRef(user))
    	dispatch(setLoginIndicator(false));
  }
}

export function setUserTrips(trips) {
	return {
		type: types.SET_USER_TRIPS,
		trips
	}
}

export function addUserItem(dest, item){
	return (dispatch, getState) => {
		getState().setFirebaseUserRef.child(dest).push(item);
	}
}

export function updateUserItem(dest, item) {
	return (dispatch, getState) => {
		getState().setFirebaseUserRef.child(dest).update(item);
	}
}

export function deleteUserItem(dest) {
		return (dispatch, getState) => {
			getState().setFirebaseUserRef.child(dest).remove();
  }
}

export function getUserTrips() {
	 return (dispatch, getState) => {
	   	getState().setFirebaseUserRef.child('trips').on('value', (snap) => {
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
		type: types.SET_CURRENT_TRIP_INDICATOR,
		payload: indicator
	}
}

export function setCurrentUserTrip(dest) {
	return (dispatch, getState) => {
		dispatch(setCurrentTrip({}));
		dispatch(getUserTrip(dest));
	}
}

export function getUserTrip(dest) {
	 return (dispatch, getState) => {
	   	getState().setFirebaseUserRef.child(dest).on('value', (snap) => {
	   		dispatch(setCurrentTripIndicator(true));
	   		dispatch(setCurrentTrip(snap));
	   		dispatch(setCurrentTripIndicator(false));
		});
  }
}