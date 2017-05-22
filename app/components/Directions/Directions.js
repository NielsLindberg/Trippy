import React, {Component} from 'react';
import {AppRegistry, ScrollView, View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import DirectionsStep from '../DirectionsStep/DirectionsStep';
import DirectionsHeader from '../DirectionsHeader/DirectionsHeader';

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
	    	{this.props.directionsFetching && this.props.searchFetching && this.props.tripsFetching ? <ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> :
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
	let tkey = state.userTrips.currentTripKey;
	let lkey = state.userTrips.currentLocationKey;
	return {
		directionsFetching: state.fetching.direcctions,
		tripsFetching: state.fetching.trips,
		searchFetching: state.fetching.locationSearch,
		directionsPolyline: _.get(state.userTrips.trips, tkey + '.locations.' + lkey + '.directions.routes[0].overview_polyline.points', null),
		directions: _.get(state.userTrips.trips, tkey + '.locations.' + lkey + '.directions.routes[0].legs[0]', {}),
		steps: _.get(state.userTrips.trips, tkey + '.locations.' + lkey + '.directions.routes[0].legs[0].steps', [])
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Directions);