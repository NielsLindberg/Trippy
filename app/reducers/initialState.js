export default initialState = {
	layout: {
		dimensions: {
			height: 1,
			width: 1,
			orientation: 'PORTRAIT'
		}
	},
	fetching: {
		trips: false,
		directions: false,
		login: false,
		locationSearch: false
	},
	userTrips: {
		trips: {},
		currentTripKey: '',
		currentLocationKey: ''
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
	map: {
		coordinates: [],
		markers: [],
		polyline: [],
		geoLocation: {latitude: 50, longitude: 12},
		directions: {}
	}
};