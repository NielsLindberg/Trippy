import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, Alert, Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class LocationEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			search: '',
			address: ''
		};
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
		this.updateItem = this.updateItem.bind(this);	
		this.searchAddress = this.searchAddress.bind(this);
		this.selectAddress = this.selectAddress.bind(this);	
	}
  updateItem() {
  	this.props.updateUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key, this.state);
  }
	deletePressConfirm(){
		var self = this;
		Alert.alert(
		  'Delete Trip',
		  'WARNING: Deleting a trip is irreversable!',
		  [
		    {text: 'Cancel', style: 'cancel'},
		    {text: 'OK', onPress: () => self.deletePress()},
		  ],
		  { cancelable: false }
		)
	}
	deletePress(){
		this.props.currentLocation.ref.off('value');
		this.props.deleteUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key);
		this.props.navigation.goBack();
		
	}
	searchAddress(){
		this.props.getLocationSearch(this.state.search);
	}
	selectAddress(result){
		this.setState({
				title: result.name ? result.name : result.formatted_address,
				address: result.formatted_address
		});
		this.updateItem();
	}
	componentWillUnmount() {
    if (this.props.currentLocation.ref) {
      this.props.currentLocation.ref.off('value');
    }
  }
	componentWillReceiveProps() {
		if(Object.keys(this.props.currentLocation).length > 0) {
			this.setState({
				title: this.props.currentLocation.val().title,
				address: this.props.currentLocation.val().address
			});
		}
	}
	render() {
		if(this.props.currentLocationIndicator) {
			return (<ActivityIndicator size={35} style={styles.indicator} color={CommonStyles.colorSemiBlack}/>)
		} else {
			return (<ScrollView style={styles.container}>
				<TextInput 
					style={styles.title}
					placeholder='Search for a location'
					onChangeText={(search) => this.setState({search})}
					onEndEditing={() => {this.searchAddress()}}
				/>
				<Text>{this.state.address}</Text>
				<TouchableOpacity style={styles.deleteButton} onPress={() => {this.deletePressConfirm()}}>
					<Icon name="delete" style={styles.deleteButtonText}/>
				</TouchableOpacity>
				 {this.props.locationSearchResults.map((result) =>
				  <TouchableOpacity onPress={() => {this.selectAddress(result)}}>
				  	<Text>{result.formatted_address}</Text>
				  </TouchableOpacity>
				 )}
			</ScrollView>)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5
	},
	indicator: {
		alignSelf: 'center'
	},
  deleteButton: {
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 20,
		alignSelf: 'flex-start',
		elevation: 2
	},
	deleteButtonText: {
		fontFamily: CommonStyles.fontPrimary,
		padding: 5,
		fontSize: 14,
		color: CommonStyles.colorAccentText
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTrip: state.trips.currentTrip,
		currentLocation: state.trips.currentLocation,
		currentLocationIndicator: state.trips.currentLocationFetching,
		locationSearchResults: state.trips.locationSearchResults,
		locationSearchFetching: state.trips.locationSearchFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);