import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class Location extends Component{
	constructor(props){
		super(props);
		this.state = {
			address: [],
		};
		this.editDetails = this.editDetails.bind(this);
	}
	editDetails(){
		this.props.getCurrentLocation(this.props.location.ref);
		this.props.navigation.navigate('LocationScreen', {location: ''});
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.location.val()) {
			if(typeof nextProps.location.val().place === 'object') {
				let string = nextProps.location.val().place.formatted_address;
				string = string.split(', ');
				this.setState({address: string});
			}
		}
	}
	render(){
		return(
			<TouchableOpacity style={styles.wrapper} onPress={() => {this.editDetails()}}>
				<View style={styles.container}>
					<View style={styles.column}>
						<View style={styles.row}>
							<Icon style={styles.icon} name="place"/>
							<View style={styles.address}>
								<Text style={styles.text}>{this.props.location.val().place ? this.props.location.val().place.name: ''}</Text>
								{this.state.address.map((address, index) => {
			      			return (
			        	<Text numberOfLines={1} ellipseMode='head' key={index} style={styles.textSecondary}>{address}</Text>
		      			)})}
							</View>
						</View>
					</View>
					<View style={styles.column}>
						<View style={styles.row}>
							<Icon style={styles.icon} name="star"/>
							<Text style={styles.textSecondary}>Rating: </Text>
							<Text style={styles.text}>{this.props.location.val().place ? this.props.location.val().place.rating: null}</Text>
						</View>
						<View style={styles.row}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.textSecondary}>Arrival: </Text>
							<Text style={styles.text}>{this.props.location.val().arrival ? this.props.location.val().arrival.hour + ':' + this.props.location.val().arrival.minute: 'Select Arrival'}</Text>
						</View>
						<View style={styles.row}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.textSecondary}>End: </Text>
							<Text style={styles.text}>{this.props.location.val().end ? this.props.location.val().end.hour + ':' + this.props.location.val().end.minute: 'Select End'}</Text>
						</View>
					</View>
					<Icon name="keyboard-arrow-right" style={styles.editDetailsText}/>
				</View>
				
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	address: {
		flexDirection: 'column',
		width: 120
	},
	wrapper: {
		flexDirection: 'column',
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 2,
		borderRadius: 2,
		backgroundColor: CommonStyles.white
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1
	},
	column: {
		flexDirection: 'column',
		flex: 10,
		paddingBottom: 5
	},
	icon: {
		color: CommonStyles.colorAccent,
		fontSize: 14,
		paddingLeft: 5,
		paddingRight: 5
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	text: {
		fontSize: 14,
		padding: 0,
		margin: 0,
		color: CommonStyles.darkText.primary
	},
	textSecondary: {
		fontSize: 14,
		padding: 0,
		margin: 0,
		color: CommonStyles.darkText.secondary
	},
	editDetailsText: {
		fontSize: 20,
		paddingRight: 10,
		alignSelf: 'center',
		color: CommonStyles.darkText.primary,
		flex: 1
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTrip: state.trips.currentTrip
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);