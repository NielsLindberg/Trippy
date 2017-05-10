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
			if(this.props.currentLocationFetching) {
				return (<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/>)
			} else {
				return (
			<View style={styles.container}>
				<View style={styles.row}>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="place"/>
						<View style={styles.address}>
							<Text style={styles.datePickerText}>{this.props.currentLocation.place ? this.props.currentLocation.place.name: null}</Text>
							{this.state.address.map((address, index) => {
		      			return (
		        	<Text key={index} style={styles.addressText}>{address}</Text>
	      			)})}
						</View>
					</View>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="star"/>
						<Text style={styles.subTitle}>Rating: </Text>
						<Text style={styles.datePickerText}>{this.props.currentLocation.place ? this.props.currentLocation.place.rating: null}</Text>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="access-time"/>
						<Text style={styles.subTitle}>Arrival: </Text>
						<TouchableOpacity onPress={() => {this.timePicker('arrival')}}>
							<Text style={styles.datePickerText}>{this.props.currentLocation.arrival.hour}:{this.props.currentLocation.arrival.minute}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="access-time"/>
						<Text style={styles.subTitle}>End: </Text>
						<TouchableOpacity onPress={() => {this.timePicker('end')}}>
							<Text style={styles.datePickerText}>{this.props.currentLocation.end.hour}:{this.props.currentLocation.end.minute}</Text>
						</TouchableOpacity>
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
}

const styles = StyleSheet.create({
	indicator: {
		alignSelf: 'center',
		alignContent: 'center'
	},
	address: {
		flexDirection: 'column'
	},
	container: {
		flexDirection: 'column',
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 2,
		borderRadius: 2,
		backgroundColor: CommonStyles.white
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
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
		alignSelf: 'flex-start',
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