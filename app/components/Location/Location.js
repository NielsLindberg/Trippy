import React, {Component} from 'react';
import {AppRegistry, Text, View, Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';

class Location extends Component{
	constructor(props){
		super(props);
		this.state = {
			address: [],
			arrivalString: '',
			endString: '',
			name: '',
			rating: ''
		};
		this.editDetails = this.editDetails.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}
	editDetails(){
		this.props.setCurrentLocation(this.props.location.key);
		this.props.navigation.navigate('LocationScreen');
	}
	updateItems(props) {
		if(props.location) {
			this.setState({
				name: _.get(props.location, 'place.name', 'No name'),
				rating: _.get(props.location, 'place.rating', 'No rating'),
				address: _.get(props, 'location.place.formatted_address', 'No Address Found').split(', '),
				arrivalString: _.pad(_.get(props.location, 'arrival.hour'),2, '0') + ':' + _.pad(_.get(props.location, 'arrival.minute'),2, '0'),
				endString: _.pad(_.get(props.location, 'end.hour'),2, '0') + ':' + _.pad(_.get(props.location, 'end.minute'),2, '0')
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateItems(nextProps);
	}
	componentWillMount(){
		this.updateItems(this.props);
	}
	render(){
		return(
			<TouchableOpacity style={styles.wrapper} onPress={() => {this.editDetails()}}>
				<Animatable.View style={styles.container} duration={1500} animation="bounceIn"  useNativeDriver>
					<View style={styles.column}>
						<View style={styles.row}>
							<Icon style={styles.icon} name="place"/>
							<View style={styles.address}>
								<Text style={styles.text}>{this.state.name}</Text>
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
							<Text style={styles.text}>{this.state.rating}</Text>
						</View>
						<View style={styles.row}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.textSecondary}>Arrival: </Text>
							<Text style={styles.text}>{this.state.arrivalString}</Text>
						</View>
						<View style={styles.row}>
							<Icon style={styles.icon} name="access-time"/>
							<Text style={styles.textSecondary}>End: </Text>
							<Text style={styles.text}>{this.state.endString}</Text>
						</View>
					</View>
					<Icon name="keyboard-arrow-right" style={styles.editDetailsText}/>
				</Animatable.View>
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
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		paddingTop: 10,
		paddingBottom: 10,
		elevation: 2,
		borderRadius: 2,
		backgroundColor: CommonStyles.white
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);