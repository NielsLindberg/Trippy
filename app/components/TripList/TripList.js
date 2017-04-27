import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, FlatList, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Trip from '../Trip/Trip';
import AddButton from '../AddButton/AddButton';

class TripList extends Component{
	constructor(props){
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
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
	renderFooter = () => {
		return(
				<AddButton addItem={this.props.addUserItem} item={{title: '', active: false}}/>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				{this.props.tripsIndicator ? <ActivityIndicator size={35} color={CommonStyles.colorSemiBlack}/> : null}
				<FlatList
					style={styles.flatList}
					data={this.props.userTrips}
					renderItem={({item}) => this.renderRow(item)}
					ListFooterComponent={this.renderFooter}
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
		marginBottom: 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		userTrips: state.setUserTrips,
		tripsIndicator: state.tripsIndicator
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);