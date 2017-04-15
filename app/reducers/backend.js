import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const setGoogleUser = createReducer({}, {
	[types.SET_GOOGLE_USER](state, action) {
		return action.user;
	}
});

export const setFirebaseUser = createReducer({}, {
	[types.SET_FIREBASE_USER](state, action) {
		return state.user = action.user;
	},
	[types.SET_FIREBASE_USERREF](state, action) {
		return state.UserRef = action.userRef;
	}
})

export const setFirestack = createReducer({}, {
	[types.SET_FIRESTACK](state, action) {
		let newState = {};
		newState = action.firestack;
		newState.itemsRef = action.firestack.database.ref();
		return newState;
	}
});