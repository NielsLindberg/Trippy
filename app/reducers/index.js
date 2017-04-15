import { combineReducers } from 'redux';
import * as backendReducer from './backend';

export default combineReducers(Object.assign(
	backendReducer,
));