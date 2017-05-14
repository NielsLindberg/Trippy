import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';

class DirectionsPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			currentTripLocations: [],
			currentLocationKey: ''
		};
		this.selectDirections = this.selectDirections.bind(this);
	}
	selectDirections(location){
		this.setState({currentLocationKey: location})
		var {latitude, longitude} = this.props.geoLocation;
		var {lat, lng} = this.props.currentTripLocations.child(location).val().place.geometry.location;
		this.props.getDirections('mode=transit&origin=' + latitude + ',' + longitude + '&destination=' + lat + ',' + lng);
	}
	componentWillReceiveProps(){
		if(this.props.currentTripLocations) {
			var items = [];
			this.props.currentTripLocations.forEach((child) => {
				items.push(child);
			});
			this.setState({currentTripLocations: items});
			if(!this.props.currentTripLocationsVal && Object.keys(this.props.currentTripLocations).length > 0) {
				this.setState({currentLocationKey: Object.keys(this.props.currentTripLocations)[0].key})
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
		elevation: 2
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		geoLocation: state.map.geoLocation,
		currentTripLocations: typeof state.trips.currentTrip.child === 'function' ? state.trips.currentTrip.child('locations') : null,
		currentTripLocationsVal: typeof state.trips.currentTrip.val === 'function' ? state.trips.currentTrip.val().locations : null,
		currentTripFetching: state.trips.currentTripFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsPicker);