import * as types from './types';
import RNFirebase from 'react-native-firebase';

export function addBackendRef(backend) {
	return {
		type: types.SET_BACKEND,
		payload: backend
	}
}

export function addBackendItemsRef(itemsRef) {
	return {
		type: types.SET_BACKEND_ITEMSREF,
		payload: itemsRef
	}
}

export function addBackend() {
	return (dispatch, getState) => {
		const firebase = RNFirebase.initializeApp({
			persistence: true,
			debug: false
		});
		const itemsRef = firebase.database().ref();
		dispatch(addBackendRef(firebase))
		dispatch(addBackendItemsRef(itemsRef))
	}
}

export function setUserRef(userRef) {
	return {
		type: types.SET_BACKEND_USERREF,
		payload: userRef
	}
}
