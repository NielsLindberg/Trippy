import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Backend } from '../../modules/Backend/Backend';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Login from '../../components/Login/Login';

export default class LoginScreen extends Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    Backend.setGoogleSigninConfigure();
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent hidden={true}/>
            <Login navigator={this.props.navigation}/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);