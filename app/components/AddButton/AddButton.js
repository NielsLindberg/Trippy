import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

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
        	style={[styles.addButton, {'alignSelf': this.props.align, 'backgroundColor': this.props.backgroundColor, 'borderColor': this.props.color}]}
        	onPress={this.addItem}
        	activeOpacity={0.5}
        	>
        	<Icon name="add" style={[styles.addButtonIcon, {'fontSize': this.props.size, 'color': this.props.color}]}/>
        </TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	addButton: {
		padding: 5,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
	}
});

AppRegistry.registerComponent('AddButton', () => AddButton);