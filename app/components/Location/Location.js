import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class Location extends Component{
	constructor(props){
		super(props);
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.getCurrentLocation('trips/' + this.props.currentTrip.key + '/locations/' + this.props.id);
		this.props.navigation.navigate('LocationScreen', {location: ''});
	}
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.row}>
					<TouchableOpacity style={styles.rowContent} onPress={() => {this.editDetails()}}>
							<Text style={[styles.title, this.props.title == '' ? styles.noTitle: null]}>{this.props.title != '' ? this.props.title : 'Add Title'}</Text>
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
		justifyContent: 'space-around'
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
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	noTitle: {
		color: CommonStyles.colorSemiBlack,
		fontStyle: 'italic',
		fontSize: 16
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
		currentTrip: state.trips.currentTrip
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);