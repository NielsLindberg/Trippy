import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
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
				<ListView
					dataSource={this.props.userTrips}
					renderRow={this.renderRow}
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

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

function mapStateToProps(state) {
	return {
		userTrips: ds.cloneWithRows(state.setUserTrips)
	}
}

export default connect(mapStateToProps)(TripList);