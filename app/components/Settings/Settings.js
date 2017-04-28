import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Logout from '../../components/Logout/Logout';

export default class Settings extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	render(){
		return (
	    <View style={styles.container}>
	        <View style={styles.wrapper}>
	        	<Logout navigation={this.props.navigation}/>
	        </View>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary100
	},
	wrapper: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
});

AppRegistry.registerComponent('Settings', () => Settings);