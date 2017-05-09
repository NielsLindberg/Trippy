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
		this.state = {
			result: {}
		};
		this.selectAddress = this.selectAddress.bind(this);	
	}
	updateItem(){
		this.props.setCurrentLocationFetching(true);
		console.log('trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocationKey);
		this.props.updateUserItem('trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocationKey + '/place', this.state.result);
	}
	selectAddress(result){
		this.setState({
				result: result
		});
		this.updateItem();
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);