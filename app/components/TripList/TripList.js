import React, {Component} from 'react';
import {AppRegistry, Text, View, FlatList, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import Trip from '../Trip/Trip';

class TripList extends Component{
	constructor(props){
		super(props);
		this.renderRow = this.renderRow.bind(this);
	}
	static defaultProps = {
	}
	renderRow(trip) {
		return(
			<Trip
				id={trip.key}
				title={trip.value.title}
				active={trip.value.active}
				navigation={this.props.navigation}
			/>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<FlatList
					data={this.props.userTrips}
					renderItem={({item}) => this.renderRow(item)}
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
	}
});

function mapStateToProps(state) {
	return {
		userTrips: state.setUserTrips
	}
}

export default connect(mapStateToProps)(TripList);