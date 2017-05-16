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
			trips: [],
			currentTripKey: 'default'
		};
		this.selectTrip = this.selectTrip.bind(this);
	}
	selectTrip(trip){
		if(trip !== 'default') {
			this.props.setCurrentUserTrip(this.props.userTrips.child(trip).ref);
			this.setState({currentTripKey: trip})
		}
	}
	componentWillReceiveProps(){
		if(Object.keys(this.props.userTrips).length > 0) {
			var items = [];
			this.props.userTrips.forEach((child) => {
				items.push(child);
			});
			this.setState({trips: items});
			if(this.props.currentTrip) {
				this.setState({currentTripKey: this.props.currentTrip.key});
			}
		}
	}
	render(){
		return(
			<View style={styles.picker}>
			{this.props.userTripsFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> :
				<Picker
					mode='dropdown'
					color={CommonStyles.lightText.secondary}
				  selectedValue={this.state.currentTripKey}
				  onValueChange={(trip) => this.selectTrip(trip)}>
				  <Picker.Item key='default' label='Trip' value='default'/>
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
		userTrips: state.trips.userTrips,
		userTripsVal: typeof state.trips.userTrips.val === 'function' ? state.trips.userTrips.val() : null,
		userTripsFetching: state.userTripsFetching,
		currentTrip: state.trips.currentTrip,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripPicker);