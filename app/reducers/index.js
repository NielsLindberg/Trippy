import { combineReducers } from 'redux';
import { backendReducer } from './backend';
import { layoutReducer } from './layout';
import { userReducer } from './user';
import { tripsReducer } from './trips';
import { mapReducer } from './map';
import { fetchingReducer } from './fetching';
import { locationSearchReducer } from './locationSearch';

export default reducers = combineReducers({
	backend: backendReducer,
	user: userReducer,
	userTrips: tripsReducer,
	map: mapReducer,
	layout: layoutReducer,
	fetching: fetchingReducer,
	locationSearch: locationSearchReducer
});