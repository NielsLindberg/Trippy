import * as types from './types';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as tripActions from './trips';

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

export function setCurrentUser(user) {
	return {
		type: types.SET_BACKEND_USER,
		payload: user
	}
}

export function setGoogleUser(user) {
	return {
		type: types.SET_GOOGLE_USER,
		payload: user
	}
}

export function getGoogleSignin() {
	return (dispatch, getState) => {
		if(getState().user.googleConfigured) {
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
			dispatch(setLoginFetching(true));
			getState().backend.ref.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				dispatch(setLoginResponse(response))
				dispatch(getCurrentUser())
			})
			.catch((err) => {
				dispatch(setLoginResponse(err))
				dispatch(setLoginFetching(false));
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
			dispatch(setLoginFetching(true));
			getState().backend.ref.auth().signInWithEmailAndPassword(email, password)
			.then((response) => {
				dispatch(setLoginResponse(response))
				dispatch(getCurrentUser())
			})
			.catch((err) => {
				dispatch(setLoginResponse(err));
				dispatch(setLoginFetching(false));
			})
		} else {
			dispatch(setLoginResponse(noEmailPassword));
		}
	}
}

export function signInWithGoogle(idToken){
	return (dispatch, getState) => {
		dispatch(setLoginResponse(clearErrorMessage));
		dispatch(setLoginFetching(true));
    getState().backend.ref.auth().signInWithCredential({provider: 'google', token: idToken})
    .then(() => {
    dispatch(getCurrentUser());
    })
    .catch((err) => {
			dispatch(setLoginResponse(err))
			dispatch(setLoginFetching(false));
		})
  }
}

export function setLoginResponse(response) {
	return {
		type: types.SET_LOGIN_RESPONSE,
		payload: response
	}
}

export function setLoginFetching(fetching) {
	return {
		type: types.SET_LOGIN_FETCHING,
		payload: fetching
	}
}

export function getCurrentUser() {
	return (dispatch, getState) => {
    let user = getState().backend.ref.auth().currentUser
      dispatch(setCurrentUser(user))
      dispatch(getUserRef(user))
    	dispatch(setLoginFetching(false));
  }
}

export function getUserRef(user) {
  return (dispatch, getState) => {
     let userRef = getState().backend.itemsRef.child("users/" + user.uid);
     userRef.keepSynced(true);
     dispatch(setUserRef(userRef));
  }
}

export function setUserRef(userRef) {
	return {
		type: types.SET_BACKEND_USERREF,
		payload: userRef
	}
}