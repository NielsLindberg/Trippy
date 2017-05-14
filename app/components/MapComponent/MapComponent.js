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
	componentWillReceiveProps(){
		if(this.props.coordinates.length > 0) {
			this.props.zoomMapToMarkers(this.mapRef);
		}
		if(Object.keys(this.props.userCoords).length > 0) {
			this.setState({userCoords: this.props.userCoords});
		}
	}
	render(){
		return (
	    <View style={styles.container}>
		        <MapView
		        	ref={(ref) => { this.mapRef = ref }}
	         		style={styles.map}
	       		>
	       		{_.compact(this.props.markers).map((marker) => {
	       			return(
					    <MapView.Marker
					    	pinColor={CommonStyles.colorAccent}
					    	key={marker.id}
					      coordinate={marker.latlng}
					      title={marker.title}
					      description={marker.description}
					    />)}
					   )}
					 		<MapView.Marker
					    	pinColor={CommonStyles.colorPrimary}
					    	key={'You'}
					      coordinate={this.state.userCoords}
					      title='Your Position'
					      description='Your Position'
					    />
					    {this.props.polyline.length == 0 ? null :
					   	<MapView.Polyline
					   	strokeColor={CommonStyles.colorSecondary}
					   	coordinates={this.props.polyline}
					   	strokeWidth={3}
					   	/>}
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
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTripVal: typeof state.trips.currentTrip.val === 'function' ? state.trips.currentTrip.val() : null,
		markers: state.map.markers,
		polyline: state.map.polyline,
		coordinates: state.map.coordinates,
		userCoords: state.map.geoLocation
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);