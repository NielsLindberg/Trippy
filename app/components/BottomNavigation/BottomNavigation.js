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

	onPressNavItem(page){

	}

	render(){
		return (
	    <View style={styles.container}>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('map')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="playlist-add" style={styles.navItemIcon}/>
        		<Text style={styles.navItemText}>
        			Trips
        		</Text>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('map')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="map" style={styles.navItemIcon}/>
        		<Text style={styles.navItemText}>
        			Map
        		</Text>
        	</View>
        </TouchableOpacity>
        <TouchableOpacity
        	onPress={() => {this.onPressNavItem('directions')}}
        	activeOpacity={0.5}
        >
        	<View style={styles.navItem}>
        		<Icon name="directions" style={styles.navItemIcon}/>
        		<Text style={styles.navItemText}>
        			Directions
        		</Text>
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
		width: Dimensions.get('window').width / 3
	},
	navItemIcon: {
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		color: '#FFF',
		fontSize: 22
	},
	navItemText: {
		textAlign: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		color:'#FFF',
		fontSize: 18
	}
});

AppRegistry.registerComponent('BottomNavigation', () => BottomNavigation);