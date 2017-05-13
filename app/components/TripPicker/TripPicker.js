import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';

class TripPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			trips: []
		};
		this.selectTrip = this.selectTrip.bind(this);
	}
	selectTrip(trip){
		this.props.setCurrentUserTrip('trips/' + trip);
	}
	componentWillReceiveProps(){
		if(Object.keys(this.props.userTrips).length > 0) {
			var items = [];
			this.props.userTrips.forEach((child) => {
				items.push(child);
			});
			this.setState({trips: items});
		}
	}
	render(){
		return(
			<View style={styles.picker}>
			{this.props.currentTripFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> : 
				<Picker
					mode='dropdown'
				  selectedValue={this.props.currentTripVal ? this.props.currentTrip.key : null}
				  onValueChange={(trip) => this.selectTrip(trip)}>
				  {this.state.trips.map((trip, index) => {
				    return (
				      <Picker.Item key={index} label={trip.val().title ? trip.val().title : 'No Title'} value={trip.key} />
			     )})}
				</Picker>
			 }
			</View>
		)
	}
}
const styles = StyleSheet.create({
	picker: {
		position: 'absolute',
		backgroundColor: CommonStyles.white,
		elevation: 2,
		height: 40,
		borderRadius: 5,
		width: 200,
		flex: 1,
		top: 10,
		left: 10
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		userTrips: state.trips.userTrips,
		currentTrip: state.trips.currentTrip,
		currentTripVal: typeof state.trips.currentTrip.val === 'function' ? state.trips.currentTrip.val() : null,
		currentTripFetching: state.trips.currentTripFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripPicker);