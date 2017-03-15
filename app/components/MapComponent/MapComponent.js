import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';

export default class MapComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	render(){
		return (
	    <View style={styles.container}>
		        <MapView
	         		style={styles.map}
	         		region={{
	           		latitude: 55.6761,
	           		longitude: 12.5683,
	           		latitudeDelta: 0.05,
	           		longitudeDelta: 0.05,
	         	}}
	       		>
	       		</MapView>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#00BCD4'
	},
	map: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
});

AppRegistry.registerComponent('MapComponent', () => MapComponent);