import { combineReducers } from 'redux';
import * as backendReducer from './backend';
import * as layoutReducer from './layout';
import * as userReducer from './user';
import * as tripsReducer from './trips';

export default combineReducers(Object.assign(
	layoutReducer,
	backendReducer,
	userReducer,
	tripsReducer
));