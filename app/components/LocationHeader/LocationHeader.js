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
		this.updateItems = this.updateItems.bind(this);
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
				this.props.updateUserItem('trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocation.key, {[key]: newState});
			}
		})
		.catch((error) => {
		  console.log('Cannot open time picker', error);
		})
	}
	updateItems(props) {
		if(props.currentLocation) {
			this.setState({
				name: _.get(props.currentLocation, 'place.name', 'No name'),
				rating: _.get(props.currentLocation, 'place.rating', 'No rating'),
				address: _.get(props.currentLocation, 'place.formatted_address', 'No Address Found').split(', '),
				arrivalString: _.padStart(_.get(props.currentLocation, 'arrival.hour'),2,'0') + ':' + _.padStart(_.get(props.currentLocation, 'arrival.minute'),2,'0'),
				endString: _.padStart(_.get(props.currentLocation, 'end.hour'),2,'0') + ':' + _.padStart(_.get(props.currentLocation, 'end.minute'),2,'0')
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateItems(nextProps);
	}
	componentWillMount(){
		this.updateItems(this.props);
	}
	render() {
		if(this.props.tripsFetching) {
			return(<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/>)
		} else {
		return (
			<View style={styles.wrapper}>
				<View style={styles.container}>
					<View style={styles.column}>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="place"/>
							<View style={styles.address}>
								<Text style={styles.datePickerText}>{this.state.name}</Text>
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
							<Text style={styles.datePickerText}>{this.state.rating}</Text>
						</View>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.subTitle}>Arrival: </Text>
							<TouchableOpacity onPress={() => {this.timePicker('arrival')}}>
								<Text style={styles.datePickerText}>{this.state.arrivalString}</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.datePicker}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.subTitle}>End: </Text>
							<TouchableOpacity onPress={() => {this.timePicker('end')}}>
								<Text style={styles.datePickerText}>{this.state.endString}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<View style={styles.searchContainer}>
						<Icon style={styles.searchIcon} name="search"/>
						<TextInput 
							style={styles.search}
							placeholder='Search for a location'
							onChangeText={(search) => this.setState({search})}
							onEndEditing={() => {this.searchAddress()}}
						/>
						<TouchableOpacity onPress={() => {this.props.setLocationSearchSection('types')}}>
							<Text style={[styles.filterText, this.props.filter === 'types' ? styles.activeFilter : null]}>Type</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {this.props.setLocationSearchSection('rating')}}>
							<Text style={[styles.filterText, this.props.filter === 'rating' ? styles.activeFilter: null]}>Rating</Text>
						</TouchableOpacity>
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
	},
	filterText: {
		width: 60,
		textAlign: 'center',
		fontSize: 15,
		padding: 5,
		borderColor: CommonStyles.colorAccent,
		borderWidth: 2,
		color: CommonStyles.colorAccent,
		backgroundColor: CommonStyles.white
	},
	activeFilter: {
		backgroundColor: CommonStyles.colorAccent,
		color: CommonStyles.white
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		filter: state.locationSearch.section,
		currentLocationKey: state.userTrips.currentLocationKey,
		currentTripKey: state.userTrips.currentTripKey,
		tripsFetching: state.fetching.trips,
		searchFetching: state.fetching.locationSearch,
		currentLocation: _.get(state.userTrips.trips, state.userTrips.currentTripKey + '.locations.' + state.userTrips.currentLocationKey, null)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHeader);