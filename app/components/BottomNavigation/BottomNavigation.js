import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BottomNavigation extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: this.props.title,
			tripsPageActive: this.props.title == 'Trips',
			mapPageActive: this.props.title == 'Map',
			directionsPageActive: this.props.title == 'Directions',
			settingsPageActive: this.props.title == 'Settings'
		};
		this.onPressNavItem = this.onPressNavItem.bind(this);
	}

	static defaultProps = {
		title: 'Trips'
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
        		<Icon name="playlist-add" style={[this.state.tripsPageActive && styles.navItemIconActive, !this.state.tripsPageActive && styles.navItemIcon]}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('map', 'Map')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="map" style={[this.state.mapPageActive && styles.navItemIconActive, !this.state.mapPageActive && styles.navItemIcon]}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('directions', 'Directions')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="directions" style={[this.state.directionsPageActive && styles.navItemIconActive, !this.state.directionsPageActive && styles.navItemIcon]}/>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('settings', 'Settings')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="settings" style={[this.state.settingsPageActive && styles.navItemIconActive, !this.state.settingsPageActive && styles.navItemIcon]}/>
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
	navItemIconActive: {
		padding: 10,
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		fontSize: 30,
		color: '#fff',
		borderRadius: 25,
		backgroundColor: '#FF4081',
		elevation: 2
	},
	navItemIcon: {
		padding: 10,
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		fontSize: 30,
		color: '#fff',
		borderRadius: 25,
	}
});

AppRegistry.registerComponent('BottomNavigation', () => BottomNavigation);