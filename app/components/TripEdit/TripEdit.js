import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, Alert, Text, View, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import AddButton from '../AddButton/AddButton';
import Location from '../Location/Location';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			active: false,
			locations: []
		};
		this.renderRow = this.renderRow.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
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
		this.props.navigation.goBack();
		this.props.deleteUserItem('trips/' + this.props.params.trip.key);
	}
	renderRow(location) {
		return(
			<Location
				id={location.key}
				title={location.val().title}
				navigation={this.props.navigation}
			/>
		)
	}
	componentWillReceiveProps() {
		if(Object.keys(this.props.currentTrip).length > 0) {
			var items = [];
			this.props.currentTrip.child('locations').forEach((child) => {
				items.push(child);
			});
			console.log(this.props.currentTrip);
			this.setState({
				title: this.props.currentTrip.val().title,
				locations: items
			});
		}
	}
	renderFooter = () => {
		return(
			<View>
				{this.props.locationsIndicator ? <ActivityIndicator size={35} color={CommonStyles.colorSemiBlack}/> : null}
				<AddButton addItem={this.props.addUserItem} destination={'trips/' + this.props.currentTrip.key + '/locations/'} item={{title: ''}}/>
			</View>
		)
	}
	render() {
		if(this.props.currentTripIndicator) {
			return (<ActivityIndicator size={35} color={CommonStyles.colorSemiBlack}/>)
		} else {
			return (<ScrollView style={styles.container}>
				<TextInput 
					style={styles.title}
					value={this.state.title}
					placeholder='Add Title'
					onChangeText= {(title) => this.setState({title})}
					onEndEditing={() => this.props.updateUserItem('trips/' + this.props.currentTrip.key, {'title': this.state.title})}
				/>
				<TouchableOpacity style={styles.deleteButton} onPress={() => {this.deletePressConfirm()}}>
					<Icon name="delete" style={styles.deleteButtonText}/>
				</TouchableOpacity>
				<FlatList
					style={styles.flatList}
					data={this.state.locations}
					renderItem={({item}) => this.renderRow(item)}
					ListFooterComponent={this.renderFooter}
				/>
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
	flatList: {
		marginBottom: 5
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
		currentTrip: state.currentTrip,
		currentTripIndicator: state.currentTripIndicator
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit);