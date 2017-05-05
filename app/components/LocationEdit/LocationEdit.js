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
			title: ''
		};
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
		this.props.currentLocation.ref.off('value');
		this.props.deleteUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key);
		this.props.navigation.goBack();
		
	}
	componentWillUnmount() {
    if (this.props.currentLocation.ref) {
      this.props.currentLocation.ref.off('value');
    }
  }
	componentWillReceiveProps() {
		if(Object.keys(this.props.currentLocation).length > 0) {
			this.setState({
				title: this.props.currentLocation.val().title
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
					value={this.state.title}
					placeholder='Add Title'
					onChangeText= {(title) => this.setState({title})}
					onEndEditing={() => this.props.updateUserItem('trips/' + this.props.currentTrip.key + '/locations/' + this.props.currentLocation.key, {'title': this.state.title})}
				/>
				<TouchableOpacity style={styles.deleteButton} onPress={() => {this.deletePressConfirm()}}>
					<Icon name="delete" style={styles.deleteButtonText}/>
				</TouchableOpacity>
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
		currentLocationIndicator: state.trips.currentLocationFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);