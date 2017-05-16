import React, {Component} from 'react';
import {AppRegistry, View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

export default class DeleteButton extends Component {
	constructor(props){
		super(props);
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
	}
	deletePressConfirm(){
		var self = this;
		Alert.alert(
		  'Delete Trip',
		  'WARNING: Deleting an item is irreversable!',
		  [
		    {text: 'Cancel', style: 'cancel'},
		    {text: 'OK', onPress: () => self.deletePress()},
		  ],
		  { cancelable: false }
		)
	}
	deletePress(){
		this.props.navigation.goBack();	
		this.props.item.ref.off();
		this.props.deleteHandler(this.props.item.ref);
		if(this.props.removeCurrentLocation) {
			this.props.removeCurrentLocation({});
		}
		if(this.props.removeCurrentTrip) {
			this.props.removeCurrentTrip({});
		}
		
	}
	render(){
		return(
			<View style={styles.buttonStyle}>
					<TouchableOpacity
        	onPress={this.deletePressConfirm}
        	activeOpacity={0.8}
        	>
        	<Icon name="clear" style={styles.buttonTextStyle}/>
        </TouchableOpacity>
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


AppRegistry.registerComponent('DeleteButton', () => DeleteButton);