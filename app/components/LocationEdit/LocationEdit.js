import React, {Component} from 'react';
import {AppRegistry, Alert, Text, View, SectionList, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import SearchResult from '../SearchResult/SearchResult';
import LocationHeader from '../LocationHeader/LocationHeader';
import moment from 'moment';
import _ from 'lodash';

class LocationEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			location: {
				title: '',
				place: {},
				arrival: {},
				end: {}
			},
			search: '',
			sections: []
		};
		this.searchAddress = this.searchAddress.bind(this);
		this.extractKey = this.extractKey.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.renderSection = this.renderSection.bind(this);
	}
	searchAddress(){
		this.props.getLocationSearch(this.state.search);
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
		dataSource = _.groupBy(dataSource, d => d.types[0]);
		dataSource = _.reduce(dataSource, (acc, next, index) => {
			acc.push({
				key: index,
				data: next
			})
			return acc}, [])
		dataSource = _.sortBy(dataSource, 'key');
		this.setState({sections: dataSource});
	}
	renderSection(item) {
		let header = item.section.key ? item.section.key : 'No Title';
		return(
			<Text style={styles.sectionHeader}>{_.capitalize(header)}</Text>
		)
	}
	extractKey(item) {
		return(item.id)
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
			<View style={styles.container}>
				<LocationHeader/>
				<View style={styles.searchContainer}>
					{!this.props.locationSearchFetching ? 
					<Icon style={styles.icon} name="search"/> : 
					<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/>}
					<TextInput 
						style={styles.search}
						placeholder='Search for a location'
						onChangeText={(search) => this.setState({search})}
						onEndEditing={() => {this.searchAddress()}}
					/>
				</View>
				{!this.props.currentLocationFetching ? 
				<SectionList
					style={styles.sectionList}
					renderItem={({item}) => this.renderRow(item)}
					keyExtractor={(item) => this.extractKey(item)}
					renderSectionHeader={(item) => this.renderSection(item)}
					sections={this.state.sections}		
				/> : <ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.darkText.secondary}/>}
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
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 18,
		color: CommonStyles.darkText.secondary,
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
	indicator: {
		paddingLeft: 5,
		paddingRight: 5
	},
	searchContainer: {
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 10,
		elevation: 2,
		borderRadius: 2,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 5,
		backgroundColor: CommonStyles.white
	},
	search: {
		flex: 1,
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
		justifyContent: 'flex-start',
		padding: 5
	},
	subTitle: {
		color: CommonStyles.darkText.secondary,
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
		currentLocationFetching: state.trips.currentLocationFetching,
		locationSearchResults: state.trips.locationSearchResults,
		locationSearchFetching: state.trips.locationSearchFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);