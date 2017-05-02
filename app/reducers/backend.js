import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const backend = createReducer({}, {
	[types.SET_BACKEND](state, action) {
		return {...state, ref: action.payload};
	},
	[types.SET_BACKEND_ITEMSREF](state, action) {
		return {...state, itemsRef: action.payload};
	},
	[types.SET_BACKEND_USERREF](state, action) {
		return {...state, userRef: action.payload};
	}
});