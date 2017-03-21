import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class AddButton extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
		this.onSubmit = this.onSubmit.bind(this);

		this.getPlacesSearch = this.getPlacesSearch.bind(this);
		this.webServicePlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
		this.apiKey = '&key=AIzaSyA7a8aISd9T8geGAmFiQbag2H_tf2XQK8A';
	}
	async getPlacesSearch() {
    try {
      let response = await fetch(this.webServicePlaceSearch + this.props.text + this.apiKey);
      let responseString = JSON.stringify(response)
      this.props.handleResponse(responseString)
    } catch(error) {
      let responseString = JSON.stringify(error)
      this.props.handleResponse(responseString)
    }
  }

	onSubmit(){
		this.getPlacesSearch();
	}

	render(){
		return(
				<TouchableOpacity
        	style={styles.addButton}
        	onPress={this.onSubmit}
        	activeOpacity={0.8}
        	>
        	<Icon name="add" style={styles.addButtonIcon}/>
        	</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	addButton: {
		margin: 5,
		top: 20,
		right: 10,
		padding: 10,
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		elevation: 10,
		borderRadius: 30,
	},
	addButtonIcon: {
		fontSize: 40,
		color: CommonStyles.colorPrimaryText
	},
});

AppRegistry.registerComponent('AddButton', () => AddButton);