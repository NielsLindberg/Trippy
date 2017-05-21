import * as types from '../actions/types';

export const mapReducer = (state={}, action) => {
	switch(action.type) {
		case types.SET_MAP_COORDINATES: {
			var coords = [];
			if(state.geoLocation) {
				coords = action.payload.concat(state.geoLocation);
			} else {
				coords = action.payload;
			}
			state = {...state, coordinates: coords};
			break;
		}
		case types.SET_MAP_MARKERS: {
			state = {...state, markers: action.payload};
			break;
		}
		case types.SET_MAP_GEOLOCATION: {
			state = {...state, geoLocation: action.payload};
			break;
		}
	}
	return state;
}