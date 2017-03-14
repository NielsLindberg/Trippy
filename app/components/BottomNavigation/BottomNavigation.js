import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BottomNavigation extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
		this.onPressNavItem = this.onPressNavItem.bind(this);
	}

	onPressNavItem(page, title){
		this.props.navigator.push({
			id: page,
			title: title 
		});
	}

	render(){
		return (
	    <View style={styles.container}>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('trips', 'Trips')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="playlist-add" style={styles.navItemIcon}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('map', 'Map')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="map" style={styles.navItemIcon}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('directions', 'Directions')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="directions" style={styles.navItemIcon}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('settings', 'Settings')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="settings" style={styles.navItemIcon}/>
        	</View>
        </TouchableOpacity>
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
    justifyContent: 'center',
    height: 68
	},
	navItem: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width / 4
	},
	navItemIcon: {
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		color: '#FFF',
		fontSize: 30
	}
});

AppRegistry.registerComponent('BottomNavigation', () => BottomNavigation);