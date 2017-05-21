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
	componentWillReceiveProps(nextProps) {
		if(typeof nextProps.locationSearchResults === 'object') {
			let dataSource = nextProps.locationSearchResults;
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
				currentLocation={this.props.currentLocation}
			/>
		)
	}
	render() {
		return (
			<View style={styles.container}>
				<LocationHeader/>
				{!this.props.fetchingAll ? 
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
		currentLocation: state.trips.currentLocation,
		currentLocationVal: typeof state.trips.currentLocation.val === 'function' ? state.trips.currentLocation.val() : null,
		currentLocationFetching: state.trips.currentLocationFetching,
		locationSearchResults: state.trips.locationSearchResults,
		locationSearchFetching: state.trips.locationSearchFetching,
    fetchingAll: state.trips.locationSearchFetching || state.trips.userTripsFetching || state.trips.currentTripFetching || state.trips.currentLocationFetching || state.map.directionsFetching ? true : false
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);