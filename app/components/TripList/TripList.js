import React, {Component} from 'react';
import {AppRegistry, View, ActivityIndicator, Text, SectionList, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Trip from '../Trip/Trip';
import AddButton from '../AddButton/AddButton';
import Gradient from '../Gradient/Gradient';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';
import moment from 'moment';

class TripList extends Component{
	constructor(props){
		super(props);
		this.state = {
			sections: []
		};
		this.renderRow = this.renderRow.bind(this);
		this.renderSection = this.renderSection.bind(this);
		this.updateData = this.updateData.bind(this);
	}
	updateData(nextProps) {
		let dataSource = _.values(_.mapValues(nextProps.trips, (value, key) => { value.key = key; return value; }))
		dataSource = _.groupBy(dataSource, d => moment(d.date.day + '-' + d.date.month + '-' + d.date.year, 'DD-MM-YYYY').format('MMMM'));
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
	componentWillReceiveProps(nextProps) {
		this.updateData(nextProps);
	}
	componentWillMount(){
		
	}
	renderRow(trip) {
		return(
			<Trip
				setCurrentTrip={this.props.setCurrentTrip}
				trip={trip}
				navigation={this.props.navigation}
			/>
		)
	}
	renderSection(item) {
		let header = item.section.key ? item.section.key : 'No Title';
		return(
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionHeaderText}>{header}</Text>
			</View>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
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
	sectionList: {
		marginBottom: 5
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingBottom: 5,
	},
	sectionHeaderText: {
		fontSize: 18,
		color: CommonStyles.darkText.secondary,
	},
	indicator: {
		alignSelf: 'center',
		elevation: 5
	},
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		trips: state.userTrips.trips
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);