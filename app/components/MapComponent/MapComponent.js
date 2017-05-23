import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import _ from 'lodash';

import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

import MapStyles from './MapStyles';
import CommonStyles from '../../lib/CommonStyles';

class MapComponent extends Component{
	constructor(props){
		super(props);
		this.mapRef = null;
		this.updateItems = this.updateItems.bind(this);
		this.transformCoordinates = this.transformCoordinates.bind(this);
	}
	updateItems(props) {
		this.setState({
			locations: _.values(_.mapValues(_.get(props, 'currentTrip.locations', null), (value, key) => { value.key = key; return value; }))
		})
		var coordinates = [];
		if (props.geoLocation) coordinates.push(props.geoLocation);
		_.values(_.mapValues(_.get(props, 'currentTrip.locations', null), (value, key) => { value.key = key; return value; })).map((location) => {
			if(_.get(location, 'place.geometry.location')) coordinates.push(this.transformCoordinates(location.place.geometry.location))
		})
		if(coordinates.length > 0 && this.mapRef) {
			props.zoomMapToMarkers(this.mapRef, coordinates);
		}
	}
	transformCoordinates(coordinates) {
		return {latitude: coordinates.lat, longitude: coordinates.lng};
	}
	componentWillReceiveProps(nextProps){
		this.updateItems(nextProps);
	}
	componentWillMount(){
		this.updateItems(this.props);
	}
	render(){
		return (
	    <View style={styles.container}>
		        <MapView
		        	ref={(ref) => { this.mapRef = ref }}
	         		style={styles.map}
	       		>
	       		{_.get(this.state, 'locations', []).map((location) => {
	       			if(_.get(location, 'place.geometry.location', null)) {
	       				return(
							    <MapView.Marker
							    	key={location.key}
							      coordinate={this.transformCoordinates(_.get(location, 'place.geometry.location', null))}
							    >
							    <View style={styles.markerWrap}>
							    	<View style={styles.customMarker}>
							    		<Text style={styles.customMarkerText}>{_.padStart(location.arrival.hour,2,'0') + ':' + _.padStart(location.arrival.minute,2,'0')}</Text>
							    	</View>
							    	<View style={styles.markerPin}>
							    	</View>
							    </View>
							    </MapView.Marker>
					    	)
	       			}
	       		})
					}
					 		<MapView.Marker
					      coordinate={this.props.geoLocation}
					    >
					    	<View style={styles.userMarker}>
					    	</View>
					    </MapView.Marker>
					    {_.get(this.props, 'currentLocation.polylines', []).map((polyline, index) =>
		       		 	<MapView.Polyline
		       		 	key={index}
						   	strokeColor={Object.keys(polyline)[0] === 'WALKING' ? CommonStyles.grey['400'] : CommonStyles.grey['700']}
						   	coordinates={polyline[Object.keys(polyline)[0]]}
						   	strokeWidth={Object.keys(polyline)[0] === 'WALKING' ? 2 : 3}
						   	/>
	       			)}
	       		</MapView>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.white
	},
	map: {
		justifyContent: 'center',
		flex: 1
	},
	userMarker: {
		width: 10,
		height: 10,
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 10
	},
	customMarker: {
		width: 40,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: CommonStyles.colorSecondary,
		elevation: 4,
		borderRadius: 2
	},
	customMarkerText: {
		color: CommonStyles.lightText.primary
	},
	markerPin:{
    width: 0,
    height: 0,
    borderTopWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: CommonStyles.colorSecondary,
    borderBottomColor: CommonStyles.colorSecondary,
    alignSelf: 'center',
    justifyContent: 'center'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentLocation: _.get(state.userTrips.trips, state.userTrips.currentTripKey + '.locations.' + state.userTrips.currentLocationKey, null),
		currentTrip: _.get(state.userTrips.trips, state.userTrips.currentTripKey, null),
		markers: state.map.markers,
		coordinates: state.map.coordinates,
		geoLocation: state.map.geoLocation
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
