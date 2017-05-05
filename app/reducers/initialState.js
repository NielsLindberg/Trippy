export default initialState = {
	layout: {
		dimensions: {
			height: 1,
			width: 1,
			orientation: 'PORTRAIT'
		}
	},
	backend: {
		userRef: {},
		ref: {},
		itemsRef: {}
	},
	user: {
		loginResponse: {
		message: ''
		},
		loginIndicator: false
	},
	trips: {
		currentTrip: {},
		currentLocation: {},
		userTrips: {},
		userTripsFetching: false,
		currentTripFetching: false,
		currentLocationFetching: false
	}
};