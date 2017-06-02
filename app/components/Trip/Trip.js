import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import * as Animatable from 'react-native-animatable';

const fadingEntrances = [
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig'
];


export default class Trip extends Component{
	constructor(props){
		super(props);
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.setCurrentTrip(this.props.trip.key);
		this.props.navigation.navigate('TripDetailScreen');
	}
	render(){
		return(
			<Animatable.View style={styles.container}  animation={fadingEntrances[3]}  useNativeDriver>
				<View style={styles.row}>
					<TouchableOpacity style={styles.rowContent} onPress={() => {this.editDetails()}}>
							<Text style={[styles.title, this.props.trip.title == '' ? styles.noTitle: null]}>{this.props.trip.title != '' ? this.props.trip.title : 'Add Title'}</Text>
							<Icon name="keyboard-arrow-right" style={styles.editDetailsText}/>		
					</TouchableOpacity>
				</View>
			</Animatable.View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		flex: 1,
		backgroundColor: CommonStyles.white,
		elevation: 2,
		borderRadius: 2
	},
	rowContent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 8
	},
	mapButton: {
		marginLeft: 8,
		marginTop: 8,
		marginBottom: 8,
		padding: 10,
		height: 40,
		width: 40,
		borderRadius: 40,
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: CommonStyles.darkIcons.inactive,
		justifyContent: 'space-around'
	},
	mapButtonActive: {
		backgroundColor: CommonStyles.colorAccent
	},
	activeText: {
		fontSize: 18,
		color: CommonStyles.lightText.primary
	},
	title: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		margin: 0,
		padding: 0,
	},
	noTitle: {
		color: CommonStyles.darkText.secondary,
		fontStyle: 'italic',
		fontSize: 16
	},
	editDetailsText: {
		fontSize: 20,
		paddingRight: 5,
		color: CommonStyles.darkText.primary
	}
});

AppRegistry.registerComponent('Trip', () => Trip);