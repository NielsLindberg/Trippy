import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class Logout extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
  }
	render(){
		return (
	    <View>
        <TouchableOpacity
        	onPress={() => {Backend.signOut(this.props.navigation)}}
        	activeOpacity={0.5}
        >
        	<View>
        		<Text>
        			Logout
        		</Text>
        	</View>
        </TouchableOpacity>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('Logout', () => Logout);