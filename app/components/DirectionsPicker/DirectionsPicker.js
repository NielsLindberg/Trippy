import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

class DirectionsPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			currentTripLocations: [],
			currentLocationKey: 'default'
		};
		this.selectDirections = this.selectDirections.bind(this);
	}
	selectDirections(location){
		if(location !== 'default') {
			this.props.getCurrentLocation(this.props.currentTripLocations.child(location).ref);
			this.setState({currentLocationKey: location})
		}
	}
	componentWillReceiveProps(){
		if(this.props.currentTripLocations) {
			var items = [];
			this.props.currentTripLocations.forEach((child) => {
				if(typeof child.val().place === 'object') {
					items.push(child);
				}
			});
			this.setState({currentTripLocations: items});
			if(this.props.currentLocation) {
				this.setState({currentLocationKey: this.props.currentLocation.key});
			}
		}
	}
	render(){
		return(
			<View style={styles.picker}>
			{this.props.currentTripFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> : 
				<Picker
					mode='dropdown'
					selectedValue={this.state.currentLocationKey}
				  onValueChange={(location) => this.selectDirections(location)}>
				  <Picker.Item key='default' label='Location' value='default'/>
				  {this.state.currentTripLocations.map((location, index) => {
				    return (
				      <Picker.Item key={index} label={location.val().place.name ? location.val().place.name : 'No Title'} value={location.key} />
			     )})}
				</Picker>
			 }
			</View>
		)
	}
}
const styles = StyleSheet.create({
	picker: {
		backgroundColor: CommonStyles.white,
		elevation: 2,
		height: 50,
		flex: 1
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		geoLocation: state.map.geoLocation,
		currentLocation: state.trips.currentLocation,
		currentTripLocations: typeof state.trips.currentTrip.child === 'function' ? state.trips.currentTrip.child('locations') : null,
		currentTripLocationsVal: typeof state.trips.currentTrip.val === 'function' ? typeof state.trips.currentTrip.val() : null,
		currentTripFetching: state.trips.currentTripFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsPicker);