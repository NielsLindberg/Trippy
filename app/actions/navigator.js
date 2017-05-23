import * as types from './types';
import _ from 'lodash';

export function navigateByType(type) {
		return {
		type: type
	}
}

export function navigateByNewState(state) {
		return {
		type: 'NAVIGATE_BY_STATE',
		payload: state
	}
}


export function popLocationScreen() {
	return (dispatch, getState) => {
		let newState = JSON.parse(JSON.stringify(getState().navigator));
		let tripStack = _.get(newState, 'routes[0].routes[0]');
		if(tripStack.routes[tripStack.routes.length-1].routeName == 'LocationScreen') {
			tripStack.routes.pop();
			tripStack.index = tripStack.routes.length-1;
			newState.routes[0].routes[0] = tripStack;
			dispatch(navigateByNewState(newState));
		}
	}
}