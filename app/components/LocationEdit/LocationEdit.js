import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, Alert, Text, View, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import SearchResult from '../SearchResult/SearchResult';

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
		this.renderFooter = this.renderFooter.bind(this);
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
	renderRow(searchResult) {
		return(
			<SearchResult
				searchResult={searchResult}
				currentTripKey={this.props.currentTrip.key}
				currentLocationKey={this.props.currentLocation.key}
			/>
		)
	}
	renderFooter(){
		return (
			<View>
			{this.props.locationSearchFetching && <ActivityIndicator size={35} style={styles.indicator} color={CommonStyles.darkText.secondary}/>}
			</View>
		)
	}
	render() {
		if(this.props.currentLocationFetching) {
			return (<ActivityIndicator size={35} style={styles.indicator} animating={this.props.currentLocationFetching} color={CommonStyles.darkText.secondary}/>)
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
				 <FlatList
					style={styles.flatList}
					data={this.props.locationSearchResults}
					extraData={this.props.locationSearchFetching}
					renderItem={({item}) => this.renderRow(item)}
					ListFooterComponent={() => this.renderFooter()}
				/>
			</ScrollView>
			)
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
		padding: 5,
		fontSize: 14,
		color: CommonStyles.lightIcons.active
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentTrip: state.trips.currentTrip,
		currentLocation: state.trips.currentLocation,
		currentLocationFetching: state.trips.currentLocationFetching,
		locationSearchResults: state.trips.locationSearchResults,
		locationSearchFetching: state.trips.locationSearchFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);