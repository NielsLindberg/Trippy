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
		this.state = {
			userCoords: {
				latitude: 0,
				longitude: 0
			}
		};
		this.mapRef = null;
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.coordinates.length > 0) {
			this.props.zoomMapToMarkers(this.mapRef);
		}
		if(Object.keys(nextProps.userCoords).length > 0) {
			this.setState({userCoords: nextProps.userCoords});
		}
	}
	render(){
		return (
	    <View style={styles.container}>
		        <MapView
		        	ref={(ref) => { this.mapRef = ref }}
	         		style={styles.map}
	       		>
	       		{this.props.markers ? this.props.markers.map((marker) => {
	       			return(
					    <MapView.Marker
					    	key={marker.id}
					      coordinate={marker.latlng}
					    >
					    <View style={styles.markerWrap}>
					    	<View style={styles.customMarker}>
					    		<Text style={styles.customMarkerText}>{this.props.pad(marker.arrival.hour,2) + ':' + this.props.pad(marker.arrival.minute,2)}</Text>
					    	</View>
					    	<View style={styles.markerPin}>
					    	</View>
					    </View>
					    </MapView.Marker>
					    )}
					   ) : null}
					 		<MapView.Marker
					      coordinate={this.state.userCoords}
					    >
					    	<View style={styles.userMarker}>
					    	</View>
					    </MapView.Marker>
					    {this.props.currentLocationVal && this.props.currentLocationVal.polylines ? this.props.currentLocationVal.polylines.map((polyline, index) =>
		       		 	<MapView.Polyline
		       		 	key={index}
						   	strokeColor={Object.keys(polyline)[0] === 'WALKING' ? CommonStyles.grey['400'] : CommonStyles.grey['700']}
						   	coordinates={polyline[Object.keys(polyline)[0]]}
						   	strokeWidth={Object.keys(polyline)[0] === 'WALKING' ? 2 : 3}
						   	/>
	       			) : null}
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
		currentLocation: _.get(state.userTrips.trips, state.userTrips.currentTripKey + '.locations.' + state.userTrips.currentLocationKey, {}),
		markers: state.map.markers,
		coordinates: state.map.coordinates,
		userCoords: state.map.geoLocation
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);