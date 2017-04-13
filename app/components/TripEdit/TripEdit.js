import React, {Component} from 'react';
import {AppRegistry, Alert, Text, View, ListView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Trip from '../Trip/Trip';

export default class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = this.props.tripState;
		this.onTextChange = this.onTextChange.bind(this);
		this.onTextChangeDone = this.onTextChangeDone.bind(this);
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
	}
	onTextChange(value, key){
		var newState = {}
		newState[key] = value;
		this.setState(newState);
		this.props.childHandler(newState);
	}
	onTextChangeDone(key){
		var newItem = {};
		newItem[key] = this.props.tripState[key];
		Backend.updateUserItem(this.props.tripState.id, newItem);
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
		Backend.deleteUserItem(this.props.tripState.id);
		this.props.navigation.goBack();
	}
	componentWillMount(){
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<TextInput 
					style={styles.title}
					value={this.state.title}
					onChangeText= {(value) => this.onTextChange(value, 'title')}
					onSubmitEditing= {this.onTextChangeDone('title')}
				/>
				<TextInput 
					style={styles.subTitle}
					value={this.state.subTitle}
					onChangeText= {(value) => this.onTextChange(value, 'subTitle')}
					onSubmitEditing= {this.onTextChangeDone('subTitle')}
				/>
				<TextInput 
					style={styles.description}
					value={this.state.description}
					onChangeText= {(value) => this.onTextChange(value, 'description')}
					onSubmitEditing= {this.onTextChangeDone('description')}
				/>
				<TouchableOpacity style={styles.deleteButton} onPress={() => {this.deletePressConfirm()}}>
						<Icon name="delete" style={styles.deleteButtonText}/>
					</TouchableOpacity>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary50
	},
	separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E'
  },
  deleteButton: {
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 20,
		alignSelf: 'flex-start',
		elevation: 2
	},
	deleteButtonText: {
		fontFamily: CommonStyles.fontPrimary,
		padding: 5,
		fontSize: 14,
		color: CommonStyles.colorAccentText
	}
});

AppRegistry.registerComponent('TripEdit', () => TripEdit);