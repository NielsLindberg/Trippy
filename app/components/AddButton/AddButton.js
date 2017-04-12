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
			title: 'Enter a Title',
			subTitle: 'Enter a Sub-Title',
			description: 'Enter a Description'
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
		bottom: 15,
		right: 15,
		padding: 15,
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		elevation: 4,
		borderRadius: 50,
	},
	addButtonIcon: {
		fontSize: 35,
		color: CommonStyles.colorAccentText
	},
});

AppRegistry.registerComponent('AddButton', () => AddButton);