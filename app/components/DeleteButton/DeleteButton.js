import React, {Component} from 'react';
import {AppRegistry, View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

class DeleteButton extends Component {
	constructor(props){
		super(props);
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
		this.props.currentTrip.ref.off('value');
		this.props.deleteUserItem('trips/' + this.props.currentTrip.key);
		this.props.navigation.goBack();
		
	}
	render(){
		return(
			<View style={styles.buttonStyle}>
				{!this.props.userTripsFetching && !this.props.currentTripFetching ?
					<TouchableOpacity
        	onPress={this.deletePressConfirm}
        	activeOpacity={0.8}
        	>
        	<Icon name="clear" style={styles.buttonTextStyle}/>
        </TouchableOpacity> : 
      	<ActivityIndicator size={40} color={CommonStyles.darkText.secondary}/>} 
      </View>
		)
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
    padding: 5,
    elevation: 4,
    backgroundColor: CommonStyles.grey['300'],
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 16,
    right: 16
   },
	buttonTextStyle: {
    fontSize: 40,
    color: CommonStyles.darkText.secondary
  },
});


function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		userTripsFetching: state.trips.userTripsFetching,
		currentTripFetching: state.trips.currentTripFetching,
		currentTrip: state.trips.currentTrip
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);