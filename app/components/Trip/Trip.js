import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class Trip extends Component{
	constructor(props){
		super(props);
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.navigateToDetails(this.props.id, this.props.navigation);
	}
	activateMap(){
		this.props.trips.forEach((trip) => {
			let value = trip.value;
			value.active = trip.key != this.props.id ? false: true;
			this.props.updateUserItem(trip.key, value)
		});
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.row}>
					<TouchableOpacity 
						style={[this.props.active ? styles.mapButtonActive: styles.mapButtonInActive, styles.mapButton]}
						onPress={() => {this.activateMap()}}>
						<Icon name='map' style={styles.activeText}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.rowContent} onPress={() => {this.editDetails()}}>
							<Text style={styles.title}>{this.props.title}</Text>
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
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		flex: 1,
		backgroundColor: '#FFFFFF',
		elevation: 2,
		borderRadius: 2
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
		borderRadius: 50,
		alignSelf: 'center',
		justifyContent: 'space-around',
		elevation: 2
	},
	mapButtonActive: {
		backgroundColor: CommonStyles.colorAccent
	},
	mapButtonInActive: {
		backgroundColor: CommonStyles.colorPrimary200
	},
	activeText: {
		fontSize: 18,
		color: CommonStyles.colorAccentText
	},
	buttons: {
		flexDirection: 'column',
		justifyContent: 'center',
		paddingTop: 12,
		paddingBottom: 12,
		paddingRight: 16		
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	editDetailsText: {
		fontFamily: CommonStyles.fontPrimary,
		fontSize: 20,
		paddingRight: 5,
		color: CommonStyles.colorPrimary800
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		trips: state.setUserTrips
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);