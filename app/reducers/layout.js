import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const layout = createReducer({}, {
	[types.SET_ORIENTATION](state, action) {
		return {...state, dimensions: action.payload};
	}
});