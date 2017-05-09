import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity, TimePickerAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';
import moment from 'moment';
import _ from 'lodash';

class LocationHeader extends Component{
	constructor(props){
		super(props);
		this.state = {
			location: {
				title: '',
				place: {},
				arrival: {},
				end: {}
			}
		};
		this.updateItem = this.updateItem.bind(this);	
		this.timePicker = this.timePicker.bind(this);
	}
  updateItem() {
  	this.props.updateUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key, this.state.location);
  }
	timePicker(key){
		TimePickerAndroid.open({
		    is24Hour: false
		})
		.then((response) => {
			if(response.action !== TimePickerAndroid.dismissedAction) {
				let newState = {};
				newState.hour = response.hour;
				newState.minute = response.minute;
				this.props.updateUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key, {[key]: newState});
			}
		})
		.catch((error) => {
		  console.log('Cannot open time picker', error);
		})
	}
	componentWillReceiveProps() {
		if(Object.keys(this.props.currentLocation).length > 0) {
			this.setState({
				location: {
				title: this.props.currentLocation.val().title,
				place: this.props.currentLocation.val().place,
				arrival: this.props.currentLocation.val().arrival,
				end: this.props.currentLocation.val().end,
				}
			});
		}
	}
	render() {
		return (
			<View style={styles.locationDetails}>
				<View style={styles.datePicker}>
					<Icon style={styles.icon} name="access-time"/>
					<Text style={styles.subTitle}>Arrival: </Text>
					<TouchableOpacity onPress={() => {this.timePicker('arrival')}}>
						<Text style={styles.datePickerText}>{this.state.location.arrival.hour}:{this.state.location.arrival.minute}</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.datePicker}>
					<Icon style={styles.icon} name="access-time"/>
					<Text style={styles.subTitle}>End: </Text>
					<TouchableOpacity onPress={() => {this.timePicker('end')}}>
						<Text style={styles.datePickerText}>{this.state.location.end.hour}:{this.state.location.end.minute}</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5,
		flexDirection: 'column'
	},
	locationDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: CommonStyles.white,
		elevation: 2,
		borderRadius: 2,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	icon: {
		color: CommonStyles.colorAccent,
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5
	},
	datePicker: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'flex-start',
		padding: 5
	},
	datePickerText: {
		fontSize: 18,
		paddingLeft: 5,
		paddingRight: 5,
		margin: 0,
		color: CommonStyles.darkText.primary
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTrip: state.trips.currentTrip,
		currentLocation: state.trips.currentLocation,
		currentLocationFetching: state.trips.currentLocationFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHeader);