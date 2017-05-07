import React, {Component} from 'react';
import {AppRegistry, View, ActivityIndicator, Text, FlatList, Dimensions, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Trip from '../Trip/Trip';
import AddButton from '../AddButton/AddButton';
import CommonStyles from '../../lib/CommonStyles';

class TripList extends Component{
	constructor(props){
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
	}
	componentWillMount(){
		this.props.getUserTrips();
	}
	renderRow(trip) {
		return(
			<Trip
				trip={trip}
				navigation={this.props.navigation}
			/>
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
				<FlatList
					style={styles.flatList}
					data={this.props.userTrips}
					renderItem={({item}) => this.renderRow(item)}
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