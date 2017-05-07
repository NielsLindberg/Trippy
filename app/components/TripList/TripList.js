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

class TripList extends Component{
	constructor(props){
		super(props);
		this.state = {
			sections: []
		};
		this.renderRow = this.renderRow.bind(this);
		this.renderSection - this.renderSection.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
	}
	componentWillMount(){
		this.props.getUserTrips();
	}
	componentWillReceiveProps(){
		let dataSource = this.props.userTrips;
		dataSource = _.groupBy(dataSource, d => d.val().title.charAt(0));
		dataSource = _.reduce(dataSource, (acc, next, index) => {
			acc.push({
				key: index,
				data: next
			})
			return acc}, [])
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
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionHeaderText}>{_.toUpper(header)}</Text>
			</View>
		)
	}
	renderFooter() {
		return (
			<ActivityIndicator size={35} style={styles.indicator} animating={this.props.fetching} color={CommonStyles.darkText.secondary}/>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<SectionList
					style={styles.flatList}
					renderItem={({item}) => this.renderRow(item)}
					renderSectionHeader={(item) => this.renderSection(item)}
					sections={this.state.sections}
					ListFooterComponent={() => this.renderFooter()}
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
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingTop: 5,
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
		userTrips: state.trips.userTrips,
		fetching: state.trips.userTripsFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);