import React, {Component} from 'react';
import {AppRegistry, Alert, Text, View, SectionList, ScrollView, StyleSheet, TextInput, TouchableOpacity, TimePickerAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import SearchResult from '../SearchResult/SearchResult';
import moment from 'moment';
import _ from 'lodash';

class LocationEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			location: {
				title: '',
				place: {},
				place: {},
				arrival: {},
				end: {}
			},
			search: '',
			sections: []
		};
		this.updateItem = this.updateItem.bind(this);	
		this.searchAddress = this.searchAddress.bind(this);
		this.timePicker = this.timePicker.bind(this);
	}
  updateItem() {
  	this.props.updateUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key, this.state.location);
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
	componentWillUnmount() {
    if (this.props.currentLocation.ref) {
      this.props.currentLocation.ref.off('value');
    }
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
		let dataSource = this.props.locationSearchResults;
		dataSource = _.groupBy(dataSource, d => d.rating);
		dataSource = _.reduce(dataSource, (acc, next, index) => {
			acc.push({
				key: index,
				month: moment().month(index).format("M"),
				data: next
			})
			return acc}, [])
		dataSource = _.sortBy(dataSource, 'month');
		this.setState({sections: dataSource});
	}
	renderRow(trip) {
		return(
			<Trip
				trip={trip}
				navigation={this.props.navigation}
			/>
		)
	}
	renderSection(item) {
		let header = item.section.key ? item.section.key : 'No Title';
		return(
				<Text style={styles.sectionHeader}>{header}</Text>
		)
	}
	renderRow(searchResult) {
		return(
			<SearchResult
				searchResult={searchResult}
				currentTripKey={this.props.currentTrip.key}
				currentLocationKey={this.props.currentLocation.key}
			/>
		)
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.sectionHeader}>Location Details</Text>
				<View style={styles.tripContainer}>
					<View style={styles.title}>
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
				<Text style={styles.sectionHeader}>Locations</Text>
				<TextInput 
					style={styles.title}
					placeholder='Search for a location'
					onChangeText={(search) => this.setState({search})}
					onEndEditing={() => {this.searchAddress()}}
				/>
				<Text>{this.state.address}</Text>
				 <SectionList
					style={styles.sectionList}
					renderItem={({item}) => this.renderRow(item)}
					renderSectionHeader={(item) => this.renderSection(item)}
					sections={this.state.sections}		
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5
	},
	flatList: {
		flex: 1
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 18,
		color: CommonStyles.darkText.secondary,
	},
	tripContainer: {
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
		fontSize: 25
	},
	title: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 5,
	},
	titleInput: {
		flex: 1,
		fontSize: 18,
		padding: 5,
		margin: 0
	},
	datePicker: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		paddingRight: 5,
	},
	datePickerText: {
		fontSize: 14,
		margin: 0
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTrip: state.trips.currentTrip,
		currentLocation: state.trips.currentLocation,
		currentLocationFetching: state.trips.currentLocationFetching,
		locationSearchResults: state.trips.locationSearchResults,
		locationSearchFetching: state.trips.locationSearchFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);