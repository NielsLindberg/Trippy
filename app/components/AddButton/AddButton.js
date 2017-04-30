import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class AddButton extends Component {
	constructor(props){
		super(props);
		this.addItem = this.addItem.bind(this);
	}
	addItem(){
		this.props.addItem(this.props.destination, this.props.item);
	}
	render(){
		return(
				<TouchableOpacity
        	style={styles.addButton}
        	onPress={this.addItem}
        	activeOpacity={0.8}
        	>
        	<Icon name="add" style={styles.addButtonIcon}/>
        </TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	addButton: {
		padding: 15,
		marginBottom: 5,
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		elevation: 2,
		borderRadius: 50,
	},
	addButtonIcon: {
		fontSize: 25,
		color: CommonStyles.colorAccentText
	},
});

AppRegistry.registerComponent('AddButton', () => AddButton);