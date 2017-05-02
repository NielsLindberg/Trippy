import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const user = createReducer({}, {
	[types.SET_GOOGLE_USER](state, action) {
		return {...state, googleUser: action.payload};
	},
	[types.SET_LOGIN_RESPONSE](state, action) {
		return {...state, loginResponse: action.payload};
	},
	[types.SET_LOGIN_INDICATOR](state, action) {
		return {...state, loginIndicator: action.payload};
	},
	[types.SET_BACKEND_USER](state, action) {
		return {...state, backendUser: action.payload};
	},
	[types.SET_GOOGLE_CONFIG](state, action) {
		return {...state, googleConfigured: true};
	}
});