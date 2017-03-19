import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';


export default class TopNavigation extends Component{
	constructor(props){
		super(props);
		this.state = {
            title: this.props.title
		};
	}
  static defaultProps = {
    title: 'Trips'
  }
	render(){
		return (
	    <View style={styles.container}>
            <Text style={styles.pageTitle}>{this.state.title}</Text>
	    </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    backgroundColor: CommonStyles.colorPrimary,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    height: 58,
    borderBottomWidth: 1,
    borderColor: CommonStyles.colorBorder
	},
	pageTitle: {
    paddingLeft: 10,
		alignSelf: 'center',
		color: CommonStyles.colorPrimaryText,
		fontSize: 25
	}
});

AppRegistry.registerComponent('TopNavigation', () => TopNavigation);