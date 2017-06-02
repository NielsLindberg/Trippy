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
			sections: []
		};
		this.extractKey = this.extractKey.bind(this);
		this.renderRow = this.renderRow.bind(this);
		this.renderSection = this.renderSection.bind(this);
	}
	updateItems(props) {
		if(props.locationSearchResults) {
			let dataSource = props.locationSearchResults;
			let section = props.filter;
			let order = 'asc';
			switch(section) {
				case 'types': {
					dataSource = _.groupBy(dataSource, d => d[section][0]);
					break;
				}
				case 'rating': {
					dataSource = _.groupBy(dataSource, d => {
						let floorRating = Math.floor(d[section])
						if(floorRating == 5) {
							return floorRating;
						} else {
							return floorRating + ' - ' + (floorRating + 1);
						}
					});
					order = 'desc';
					break;
				}
				default: {
					dataSource = _.groupBy(dataSource, d => d['types'][0]);
				}
			}
			dataSource = _.reduce(dataSource, (acc, next, index) => {
				acc.push({
					key: index,
					data: next
				})
				return acc}, [])
			dataSource = _.orderBy(dataSource, 'key', order);
			this.setState({sections: dataSource});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateItems(nextProps);
	}
	componentWillMount(){
		this.updateItems(this.props);
	}
	renderSection(item) {
		var header = '';
		if(this.props.filter === 'types') {
			header = _.startCase(item.section.key ? item.section.key : 'Unknown Type');
		} else {
			header = item.section.key ? item.section.key : 'No Rating';
		}
		return(
			<Text style={styles.sectionHeader}>{header}</Text>
		)
	}
	extractKey(item) {
		return(item.id)
	}
	renderRow(searchResult) {
		return(
			<SearchResult
				searchResult={searchResult}
				currentLocation={this.props.currentLocation}
			/>
		)
	}
	render() {
		return (
			<View style={styles.container}>
				<LocationHeader/>
				{!this.props.searchFetching && !this.props.tripsFetching && !this.props.directionsFetching ? 
				<SectionList
					style={styles.sectionList}
					renderItem={({item}) => this.renderRow(item)}
					keyExtractor={(item) => this.extractKey(item)}
					renderSectionHeader={(item) => this.renderSection(item)}
					sections={this.state.sections}		
				/> : <ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/>}
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
	icon: {
		color: CommonStyles.colorAccent,
		fontSize: 25,
		paddingLeft: 5,
		paddingRight: 5
	},
	indicator: {
		flex: 1,
		alignContent: 'center',
		alignSelf: 'center'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentLocationKey: state.userTrips.currentLocationKey,
		filter: state.locationSearch.section,
		currentTripKey: state.userTrips.currentTripKey,
		tripsFetching: state.fetching.trips,
		searchFetching: state.fetching.locationSearch,
		directionsFetching: state.fetching.directions,
		currentLocation: _.get(state.userTrips.trips, state.userTrips.currentTripKey + '.locations.' + state.userTrips.currentLocationKey, null),
		locationSearchResults: _.get(state.locationSearch, 'results', null)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);