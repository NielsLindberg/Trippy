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
				<View style={styles.wrapper}>
					<View style={styles.tripCard}>
						<View style={styles.tripCardTopWrapper}>
							<TextInput style={styles.tripCardName} selectionColor={CommonStyles.colorAccent20P} underlineColorAndroid={'transparent'}>Super Cool Placeholder Trip</TextInput>
							<TextInput style={styles.tripCardDate} underlineColorAndroid={'transparent'}>24/11/1989</TextInput>
						</View>
					</View>
					<TextInput
						value={this.props.text}
						placeholder='SearchString'
						onChangeText= {(value) => this.props.handleText(value)}
					/>
						<Text>{this.props.response}</Text>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary100
	},
	wrapper: {
		paddingHorizontal: 20,
		justifyContent: 'center',
		flex: 1
	},
	tripCard: {
		marginTop: 20,
		flexDirection: 'column',
		height: 400,
		borderRadius: 2,
		backgroundColor: '#FFF',
		elevation: 2
	},
	tripCardStarWrap: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	tripCardStar: {
		fontSize: 18
	},
	tripCardTopWrapper: {
		padding: 0,
		backgroundColor: CommonStyles.colorPrimary600,
		flexDirection: 'row'
	},
	tripCardName: {
		padding: 10,
		fontSize: 18,
		color: CommonStyles.colorPrimary600Text,
		alignSelf: 'flex-start',
		flex: 4
	},
	tripCardDate: {
		padding: 0,
		paddingRight: 10,
		fontSize: 12,
		color: CommonStyles.colorPrimary400Text,
		alignSelf: 'flex-start',
		textAlign: 'right',
		flex: 1
	}
});

AppRegistry.registerComponent('TripList', () => TripList);