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
	updateItem(){
		this.props.updateUserItem('trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocationKey, this.state);
	}
	selectAddress(result){
		this.setState({
				result: result
		});
		this.updateItem();
	}
	render(){
		return(
			<TouchableOpacity onPress={() => {this.selectAddress(this.props.searchResult)}}>
				<Text>{this.props.searchResult.formatted_address}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);