import { combineReducers } from 'redux';
import * as backendReducer from './backend';
import * as layoutReducer from './layout';

export default combineReducers(Object.assign(
	layoutReducer,
	backendReducer
));