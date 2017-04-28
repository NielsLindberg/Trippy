import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class Logout extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
  }
	render(){
		return (
	    <View>
        <TouchableOpacity
        	onPress={() => {Backend.signOut(this.props.navigation)}}
        	activeOpacity={0.5}
          style={styles.icon}
        >
          <Icon name="exit-to-app" size={25} color={CommonStyles.colorAccentText} />
        </TouchableOpacity>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: 10
  }
});

AppRegistry.registerComponent('Logout', () => Logout);