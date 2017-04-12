import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class AddButton extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(){
		Backend.addUserItem({
			text: 'test'
		});
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
		top: 30,
		right: 10,
		padding: 15,
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		elevation: 6,
		borderRadius: 30,
	},
	addButtonIcon: {
		fontSize: 20,
		color: CommonStyles.colorAccentText
	},
});

AppRegistry.registerComponent('AddButton', () => AddButton);