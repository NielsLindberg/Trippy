import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class TopNavigation extends Component{
	constructor(props){
		super(props);
		this.state = {
		};

		this.onPressNavItem = this.onPressNavItem.bind(this);
	}

	onPressNavItem(page){

	}

	render(){
		return (
	    <View style={styles.container}>
            <Text style={styles.pageTitle}>Page Title Bar</Text>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
    backgroundColor: '#0097A7',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    elevation: 2
	},
	pageTitle: {
        paddingLeft: 10,
		alignSelf: 'center',
		color:'#FFF',
		fontSize: 25
	}
});

AppRegistry.registerComponent('TopNavigation', () => TopNavigation);