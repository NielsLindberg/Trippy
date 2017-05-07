import React, {Component} from 'react';
import {AppRegistry, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

export default class AddButton extends Component {
	constructor(props){
		super(props);
		this.addItem = this.addItem.bind(this);
	}
	addItem(){
		console.log(this.props.addItem);
		this.props.addItem(this.props.destination, this.props.item);
	}
	render(){
		return(
				<TouchableOpacity
        	style={this.props.styles}
        	onPress={this.addItem}
        	activeOpacity={0.5}
        	>
        	<Icon name="add" style={this.props.textStyles}/>
        </TouchableOpacity>
		)
	}
}

AppRegistry.registerComponent('AddButton', () => AddButton);