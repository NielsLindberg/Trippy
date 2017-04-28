import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CommonStyles from '../../modules/CommonStyles/CommonStyles';

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
        	style={[styles.navItem, this.state.tripsPageActive && styles.navItemActive]}
        	onPress={() => {this.onPressNavItem('trips', 'Trips')}}
        	activeOpacity={0.5}
        >
        	<Icon name="playlist-add" style={[styles.navItemIcon, this.state.tripsPageActive && styles.navItemIconActive]}/>
        </TouchableOpacity>
        <TouchableOpacity
        	style={[styles.navItem, this.state.mapPageActive && styles.navItemActive]}
        	onPress={() => {this.onPressNavItem('map', 'Map')}}
        	activeOpacity={0.5}
        >
        	<Icon name="map" style={[styles.navItemIcon, this.state.mapPageActive && styles.navItemIconActive]}/>
        </TouchableOpacity>
        <TouchableOpacity
        	style={[styles.navItem, this.state.directionsPageActive && styles.navItemActive]}
        	onPress={() => {this.onPressNavItem('directions', 'Directions')}}
        	activeOpacity={0.5}
        >
        	<Icon name="directions" style={[styles.navItemIcon, this.state.directionsPageActive && styles.navItemIconActive]}/>
        </TouchableOpacity>
        <TouchableOpacity
        	style={[styles.navItem, this.state.settingsPageActive && styles.navItemActive]}
        	onPress={() => {this.onPressNavItem('settings', 'Settings')}}
        	activeOpacity={0.5}
        >
        	<Icon name="settings" style={[styles.navItemIcon, this.state.settingsPageActive && styles.navItemIconActive]}/>
        </TouchableOpacity>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
    backgroundColor: CommonStyles.colorPrimary800,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
	},
	navItem: {
		flex: 1,
		borderTopWidth: 3,
		borderTopColor: CommonStyles.colorPrimary800,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width / 4
	},
	navItemActive: {
		backgroundColor: CommonStyles.colorAccent20P,
		borderTopColor: CommonStyles.colorAccent,
	},
	navItemIcon: {
		padding: 10,
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		fontSize: 30,
		color: CommonStyles.colorPrimary800Text,
	},
	navItemIconActive: {
		color: CommonStyles.colorPrimary800Text
	},
});

AppRegistry.registerComponent('BottomNavigation', () => BottomNavigation);