import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity, TimePickerAndroid, ActivityIndicator, TextInput} from 'react-native';
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
			address: [],
			search: ''
		};
		this.searchAddress = this.searchAddress.bind(this);
		this.timePicker = this.timePicker.bind(this);
	}
	searchAddress(){
		this.props.getLocationSearch(this.state.search);
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
		if(typeof this.props.currentLocation.place === 'object') {
			let string = this.props.currentLocation.place.formatted_address;
			string = string.split(', ');
			this.setState({address: string});
		}
	}
	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.container}>
					<View style={styles.column}>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="place"/>
							<View style={styles.address}>
								<Text style={styles.datePickerText}>{this.props.currentLocation.place ? this.props.currentLocation.place.name: 'Search for a location'}</Text>
								{this.state.address.map((address, index) => {
			      			return (
			        	<Text key={index} style={styles.addressText}>{address}</Text>
		      			)})}
							</View>
						</View>
					</View>
					<View style={styles.column}>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="star"/>
							<Text style={styles.subTitle}>Rating: </Text>
							<Text style={styles.datePickerText}>{this.props.currentLocation.place ? this.props.currentLocation.place.rating: null}</Text>
						</View>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.subTitle}>Arrival: </Text>
							<TouchableOpacity onPress={() => {this.timePicker('arrival')}}>
								<Text style={styles.datePickerText}>{this.props.currentLocation.arrival ? this.props.currentLocation.arrival.hour + ':' + this.props.currentLocation.arrival.minute: 'Select Arrival'}</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.subTitle}>End: </Text>
							<TouchableOpacity onPress={() => {this.timePicker('end')}}>
								<Text style={styles.datePickerText}>{this.props.currentLocation.end ? this.props.currentLocation.end.hour + ':' + this.props.currentLocation.end.minute: 'Select End'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.searchContainer}>
						{!this.props.locationSearchFetching ? 
						<Icon style={styles.searchIcon} name="search"/> : 
						<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/>}
						<TextInput 
							style={styles.search}
							placeholder='Search for a location'
							onChangeText={(search) => this.setState({search})}
							onEndEditing={() => {this.searchAddress()}}
						/>
					</View>
			</View>
		)	
	}
}

const styles = StyleSheet.create({
	indicator: {
		alignSelf: 'center',
		alignContent: 'center'
	},
	address: {
		flexDirection: 'column'
	},
	wrapper: {
		flexDirection: 'column',
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 2,
		borderRadius: 2,
		backgroundColor: CommonStyles.white,
		height: 180
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1
	},
	column: {
		flexDirection: 'column',
		flex: 1,
		paddingBottom: 5
	},
	searchContainer: {
		borderTopColor: CommonStyles.darkText.dividers,
		borderTopWidth: 1,
		flexDirection: 'row',
		padding: 5
	},
	search: {
		flex: 1,
		fontSize: 16,
	},
	searchIcon: {
		color: CommonStyles.colorAccent,
		alignSelf: 'center',
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5
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
	},
	datePickerText: {
		fontSize: 14,
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