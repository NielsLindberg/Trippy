import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class Trip extends Component{
	constructor(props){
		super(props);
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.setCurrentUserTrip('trips/' + this.props.trip.key);
		this.props.navigation.navigate('TripDetailScreen', {trip: this.props.trip});
	}
	activateMap(){
		this.props.trips.forEach((trip) => {
			let value = trip.val();
			value.active = trip.key != this.props.trip.key ? false: true;
			this.props.updateUserItem('trips/' + trip.key, value)
		});
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.row}>
					<TouchableOpacity 
						style={[styles.mapButton, this.props.trip.val().active ? styles.mapButtonActive : null]}
						onPress={() => {this.activateMap()}}>
						<Icon name='map' style={styles.activeText}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.rowContent} onPress={() => {this.editDetails()}}>
							<Text style={[styles.title, this.props.trip.val().title == '' ? styles.noTitle: null]}>{this.props.trip.val().title != '' ? this.props.trip.val().title : 'Add Title'}</Text>
							<Icon name="keyboard-arrow-right" style={styles.editDetailsText}/>		
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
		backgroundColor: CommonStyles.white,
		borderTopWidth: 1,
		borderTopColor: CommonStyles.darkText.dividers
	},
	rowContent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 8
	},
	mapButton: {
		marginLeft: 8,
		marginTop: 8,
		marginBottom: 8,
		padding: 10,
		height: 40,
		width: 40,
		borderRadius: 40,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: CommonStyles.darkIcons.inactive,
		justifyContent: 'space-around'
	},
	mapButtonActive: {
		backgroundColor: CommonStyles.colorAccent
	},
	activeText: {
		fontSize: 18,
		color: CommonStyles.lightText.primary
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		margin: 0,
		padding: 0,
	},
	noTitle: {
		color: CommonStyles.darkText.secondary,
		fontStyle: 'italic',
		fontSize: 16
	},
	editDetailsText: {
		fontSize: 20,
		paddingRight: 5,
		color: CommonStyles.darkText.primary
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		trips: state.trips.userTrips
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);