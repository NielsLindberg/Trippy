import React, {Component} from 'react';
import {AppRegistry, Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class TripList extends Component{
	constructor(props){
		super(props);
	}
	static defaultProps = {
		response: ''
	}

	render(){
		return(
			<ScrollView style={styles.container}>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary100
	}
});

AppRegistry.registerComponent('TripList', () => TripList);