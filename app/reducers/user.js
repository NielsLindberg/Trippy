import * as types from '../actions/types';

export const userReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_GOOGLE_USER: {
			state = {...state, googleUser: action.payload};
			break;
		}
		case types.SET_LOGIN_RESPONSE: {
			state = {...state, loginResponse: action.payload};
			break;
		}
		case types.SET_BACKEND_USER: {
			state = {...state, backendUser: action.payload};
			break;
		}
		case types.SET_GOOGLE_CONFIG: {
			state = {...state, googleConfigured: true};
			break;
		}
	}
	return state;
}
