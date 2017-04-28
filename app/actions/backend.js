import * as types from './types';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Firestack from 'react-native-firestack';

const noEmailPassword = {errorMessage: 'Enter an email and password.'};
const clearErrorMessage = {errorMessage: ''};

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
	let firestack = new Firestack();
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
			getState().setFirestack.auth.createUserWithEmail(email, password)
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
			getState().setFirestack.auth.signInWithEmail(email, password)
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
    getState().setFirestack.auth.signInWithProvider('google', idToken)
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
     let userRef = getState().setFirestack.itemsRef.child("users/" + user.user.uid);
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
    getState().setFirestack.auth.getCurrentUser()
    .then(user => {
      dispatch(setCurrentUser(user))
      dispatch(getUserRef(user))
    })
    .catch(err => {
    	dispatch(setLoginIndicator(false));
      console.log(err)
    });
  }
}

export function setUserTrips(trips) {
	return {
		type: types.SET_USER_TRIPS,
		trips
	}
}

export function addUserItem(item){
	return (dispatch, getState) => {
		getState().setFirebaseUserRef.push(item);
	}
}

export function updateUserItem(key, item) {
	return (dispatch, getState) => {
		getState().setFirebaseUserRef.child(key).update(item);
	}
}

export function deleteUserItem(key) {
		return (dispatch, getState) => {
			getState().setFirebaseUserRef.child(key).remove();
  }
}

export function getUserTrips() {
	 return (dispatch, getState) => {
	   	getState().setFirebaseUserRef.on('value', (snap) => {
	   		dispatch(setTripsIndicator(true));
				var items = [];
				snap.forEach((child) => {
					items.push(child);
				});
				dispatch(setTripsIndicator(false));
				dispatch(setUserTrips(items));
		})
  }
}
export function setCurrentTrip(trip) {
	return {
		type: types.SET_CURRENT_TRIP,
		payload: trip
	}
}

export function navigateToDetails(key, navigation) {
	return (dispatch, getState) => {
				dispatch(getUserTrip(key, navigation));
	}
}

export function getUserTrip(key, navigation) {
	 return (dispatch, getState) => {
	   	getState().setFirebaseUserRef.child(key).once('value', (snap) => {
	   		dispatch(setCurrentTrip(snap));
	   		navigation.navigate('TripDetailScreen', {id: key});
		});
  }
}
