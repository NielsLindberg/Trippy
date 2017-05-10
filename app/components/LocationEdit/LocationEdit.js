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
	componentWillReceiveProps() {
		if(typeof this.props.locationSearchResults === 'object') {
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
				{!this.props.locationSearchFetching ? 
				<SectionList
					style={styles.sectionList}
					renderItem={({item}) => this.renderRow(item)}
					keyExtractor={(item) => this.extractKey(item)}
					renderSectionHeader={(item) => this.renderSection(item)}
					sections={this.state.sections}		
				/> : null}
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
		paddingLeft: 5,
		paddingRight: 5
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