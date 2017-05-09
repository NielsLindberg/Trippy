import React, {Component} from 'react';
import {AppRegistry, View, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

class AddButton extends Component {
	constructor(props){
		super(props);
		this.addItem = this.addItem.bind(this);
	}
	addItem(){
		let dest = this.props.destination == 'locations' ? 'trips/' + this.props.currentTrip.key + '/locations/' : this.props.destination;
		this.props.addUserItem(dest, this.props.item);
	}
	render(){
		return(
			<View style={styles.buttonStyle}>
				{!this.props.userTripsFetching && !this.props.currentTripFetching ? 
					<TouchableOpacity
        	onPress={this.addItem}
        	activeOpacity={0.8}
        	>
        	<Icon name="add" style={styles.buttonTextStyle}/>
        </TouchableOpacity> : 
      	<ActivityIndicator size={40} color={CommonStyles.lightText.primary}/>} 
      </View>
		)
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
    padding: 5,
    elevation: 4,
    backgroundColor: CommonStyles.colorAccent,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    top: 27,
    right: 16
   },
	buttonTextStyle: {
    fontSize: 40,
    color: CommonStyles.lightText.primary
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

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);