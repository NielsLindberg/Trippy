import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const layout = createReducer({
}, {
	[types.SET_ORIENTATION](state, action) {
		payload = action.payload;
		return {...state, dimensions: payload};
	}
});