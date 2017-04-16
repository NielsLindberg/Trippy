import { combineReducers } from 'redux';
import * as backendReducer from './backend';
import * as navigationReducer from './navigation';

export default combineReducers(Object.assign(
	backendReducer,
	navigationReducer
));