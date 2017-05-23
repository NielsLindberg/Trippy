import * as types from '../actions/types';
import { addNavigationHelpers } from 'react-navigation';
import { Root } from '../navigator/router';
import { NavigationActions } from 'react-navigation';

const initialState = Root.router.getStateForAction(Root.router.getActionForPathAndParams('LoginScreen'));
const LoginAction = NavigationActions.reset(NavigationActions.reset({index: 0,actions: [NavigationActions.navigate({ routeName: 'Tabs'})]}));
const BackAction = NavigationActions.back();
export const navigatorReducer = (state = initialState, action) => {
	let nextState;
	switch(action.type) {
		case 'NAVIGATION_LOGIN': {
			nextState = Root.router.getStateForAction(LoginAction, state);
			break;
		}
		case 'Navigation/BACK': {
			nextState = Root.router.getStateForAction(BackAction, state);
			break;
		}
		case 'NAVIGATE_BY_STATE': {
			nextState = action.payload;
			break;
		}
		case 'Navigation/NAVIGATE': {
			nextState = Root.router.getStateForAction(NavigationActions.navigate({ routeName: action.routeName}), state)
			break;
		}
		default: {
			const nextState = Root.router.getStateForAction(action, state);
		}
  }
  return nextState || state;
};