import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class Trip extends Component{
	constructor(props){
		super(props);
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.navigation.navigate('TripDetailScreen', {tripState: this.props});
	}
	render(){
		return(
			<View style={styles.row}>
				<View style={styles.rowContent}>
						<Text style={styles.title}>{this.props.title}</Text>
						<Text style={styles.subTitle}>{this.props.subTitle}</Text>
						<Text style={styles.description}>{this.props.description}</Text>
				</View>
				<View style={styles.buttons}>
					<TouchableOpacity style={styles.editDetails} onPress={() => {this.editDetails()}}>
						<Icon name="mode-edit" style={styles.editDetailsText}/>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1
	},
	rowContent: {
		flexDirection: 'column',
		flex: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16
	},
	buttons: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingTop: 12,
		paddingBottom: 12,
		paddingRight: 16		
	},
	title: {
		fontSize: 16,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	subTitle: {
		fontSize: 14,
		margin: 0,
		padding: 0,
		fontFamily: 'Roboto'
	},
	description: {
		fontSize: 12,
		margin: 0,
		padding: 0,
    fontFamily: CommonStyles.fontPrimary
	},
	editDetails: {
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 20,
		alignSelf: 'flex-start',
		elevation: 2
	},
	editDetailsText: {
		fontFamily: CommonStyles.fontPrimary,
		padding: 5,
		fontSize: 14,
		color: CommonStyles.colorAccentText
	},
	delete: {
		alignSelf: 'flex-end'
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Trip);