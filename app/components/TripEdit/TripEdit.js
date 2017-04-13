import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Trip from '../Trip/Trip';

export default class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: this.props.id
		}
		this.onTextChange = this.onTextChange.bind(this);
		this.onTextChangeDone = this.onTextChangeDone.bind(this);
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
		this.getUserItem - this.getUserItem.bind(this);
	}
	getUserItem() {
		Backend.getUserItem(this.props.id)
		.then((trip) => {
			this.setState({
				title: trip.title,
				subTitle: trip.subTitle,
				description: trip.description
			});
		})
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
	componentDidMount(){
		this.getUserItem();
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
});

AppRegistry.registerComponent('TripEdit', () => TripEdit);