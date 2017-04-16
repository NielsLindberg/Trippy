import { Root } from '../config/router';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import { NavigationActions } from 'react-navigation';

const initialState = {
  index: 0,
  routes: [{
    routeName: 'LoginScreen',
    key: 'init'
  }]
};

export const setNavigationState = createReducer(initialState, {
	[types.SET_NAVIGATION_STATE](state, action) {
		const newState = Root.router.getStateForAction(action, state);
		return newState;
	}
});