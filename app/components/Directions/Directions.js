import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class Directions extends Component{
	constructor(props){
		super(props);
		this.state = {
			response: 'placeholder'
		};
		this.getDirections = this.getDirections.bind(this)
	}
	async getDirections() {
    try {
      let response = await fetch('https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=55.68,12.56&destination=55.69,12.56&key=AIzaSyA7a8aISd9T8geGAmFiQbag2H_tf2XQK8A');
      this.setState({
            response: response
        });
    } catch(error) {
      this.setState({
            response: error
        });
    }
  }
	componentWillMount(){
		this.getDirections();
	}

	render(){
		return (
	    <View style={styles.container}>
	        <View style={styles.wrapper}>
	        </View>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary50
	},
	wrapper: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
});

AppRegistry.registerComponent('Directions', () => Directions);