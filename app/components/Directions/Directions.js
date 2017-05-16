import React, {Component} from 'react';
import {AppRegistry, ScrollView, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import DirectionsStep from '../DirectionsStep/DirectionsStep';
import DirectionsHeader from '../DirectionsHeader/DirectionsHeader';
import DirectionsPicker from '../DirectionsPicker/DirectionsPicker';
import TripPicker from '../TripPicker/TripPicker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import CommonStyles from '../../lib/CommonStyles';

class Directions extends Component{
	constructor(props){
		super(props);
		this.renderRow = this.renderRow.bind(this);
	}
	renderRow(item, index) {
		return(
			<DirectionsStep
				step={item}
				key={item.polyline.points}
			/>
		)
	}
	render(){
		return (
	    <ScrollView style={styles.container}>
	    	{Object.keys(this.props.directions).length === 0 ? null : 
	    	<DirectionsHeader
	    		directions={this.props.directions}
	    		key={this.props.directionsPolyline}
	    	/>}
	    	{this.props.fetchingAll ? <ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> :
	    	<FlatList
					style={styles.stepContainer}
					data={this.props.steps}
					keyExtractor={(item, index) => {return(item.polyline.points)}}
					renderItem={({item, index}) => this.renderRow(item, index)}
				/>}
	    </ScrollView>
    )
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	indicator: {
		flex: 1,
		alignSelf: 'center',
		alignContent: 'center'
	},
	stepContainer: {
		margin: 10,
		elevation: 2,
		borderRadius: 2
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	var directionsReady = typeof state.trips.currentLocation.val === 'function' && state.trips.currentLocation.val() && typeof state.trips.currentLocation.val().directions === 'object' ? true : false;
	return {
		directionsFetching: state.map.directionsFetching,
		directionsPolyline: directionsReady ? state.trips.currentLocation.val().directions.routes[0].overview_polyline.points : null,
		directions: directionsReady ? state.trips.currentLocation.val().directions.routes[0].legs[0] : {},
		steps: directionsReady ? state.trips.currentLocation.val().directions.routes[0].legs[0].steps : [],
    fetchingAll: state.trips.userTripsFetching || state.trips.currentTripFetching || state.trips.currentLocationFetching || state.map.directionsFetching ? true : false
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Directions);