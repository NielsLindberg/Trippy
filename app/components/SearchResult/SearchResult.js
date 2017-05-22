import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class SearchResult extends Component{
	constructor(props){
		super(props);
		this.selectAddress = this.selectAddress.bind(this);
	}
	selectAddress(result){
		var latitude = this.props.geoLocation.latitude ? this.props.geoLocation.latitude : 50;
		var longitude = this.props.geoLocation.longitude ? this.props.geoLocation.longitude : 50;
		var {lat, lng} = result.geometry.location;
		var destination = 'trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocationKey;
		var search = 'mode=transit&origin=' + latitude + ',' + longitude + '&destination=' + lat + ',' + lng;
		this.props.getDirections(destination, result, search);
	}
	componentWillMount(){
		let string = this.props.searchResult.formatted_address;
		string = string.split(', ');
		this.setState({address: string});
	}
	render(){
		return(
			<TouchableOpacity style={styles.row} onPress={() => {this.selectAddress(this.props.searchResult)}}>
				<View style={styles.details}>
					<Text style={styles.detailsText}>{this.props.searchResult.name}</Text>
					<Text style={styles.detailsText}>{'Rating: ' + this.props.searchResult.rating}</Text>
				</View>
				<View style={styles.address}>
					{this.state.address.map((address, index) => {
		      	return (
		        <Text key={index} style={styles.addressText}>{address}</Text>
	      	)})}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		backgroundColor: CommonStyles.white,
		elevation: 2,
		borderRadius: 2,
		padding: 2,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 5,
		justifyContent: 'space-between'
	},
	address: {
		flexDirection: 'column'
	},
	addressText: {
		textAlign: 'right'
	},
	details: {
		flexDirection: 'column'
	},
	types: {

	},
	image: {
		width: 50,
		height: 50
	}

});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		geoLocation: state.map.geoLocation,
		currentTripKey: state.userTrips.currentTripKey,
		currentLocationKey: state.userTrips.currentLocationKey
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);