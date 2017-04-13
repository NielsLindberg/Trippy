import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class Trip extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: this.props.id,
			title: this.props.title,
			subTitle: this.props.subTitle,
			description: this.props.description
		}
		this.onTextChange = this.onTextChange.bind(this);
		this.onTextChangeDone = this.onTextChangeDone.bind(this);
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
		this.editDetails = this.editDetails.bind(this);
	}
	onTextChange(value, key){
		var newState = {};
		newState[key] = value;
		this.setState(newState);
	}
	onTextChangeDone(key){
		var newItem = {};
		newItem[key] = this.state[key];
		Backend.updateUserItem(this.props.id, newItem)
	}
	deletePressConfirm(){
		var self = this;
		Alert.alert(
		  'Delete Trip',
		  'WARNING: Deleting a trip is irreversable!',
		  [
		    {text: 'Cancel', style: 'cancel'},
		    {text: 'OK', onPress: () => self.deletePress()},
		  ],
		  { cancelable: false }
		)
	}
	deletePress(){
		Backend.deleteUserItem(this.state.id);
	}
	editDetails(){
		this.props.navigation.navigate('TripDetailScreen', {id: this.state.id});
	}
	render(){
		return(
			<View style={styles.row}>
				<View style={styles.rowContent}>
						<Text style={styles.title}>{this.state.title}</Text>
						<Text style={styles.subTitle}>{this.state.subTitle}</Text>
						<Text style={styles.description}>{this.state.description}</Text>
				</View>
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.editDetails} onPress={() => {this.editDetails()}}>
						<Icon name="mode-edit" style={styles.editDetailsText}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1
	},
	rowContent: {
		flexDirection: 'column',
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16
	},
	buttons: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingTop: 12,
		paddingBottom: 12,
		paddingRight: 16		
	},
	title: {
		fontSize: 16,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	subTitle: {
		fontSize: 14,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	description: {
		fontSize: 12,
		margin: 0,
		padding: 0,
    fontFamily: CommonStyles.fontPrimary
	},
	editDetails: {
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 20,
		alignSelf: 'flex-start',
		elevation: 2
	},
	editDetailsText: {
		fontFamily: CommonStyles.fontPrimary,
		padding: 5,
		fontSize: 14,
		color: CommonStyles.colorAccentText
	},
	delete: {
		alignSelf: 'flex-end'
	}
});

AppRegistry.registerComponent('Trip', () => Trip);