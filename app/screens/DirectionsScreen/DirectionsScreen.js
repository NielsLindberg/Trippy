import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Directions from '../../components/Directions/Directions';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { Backend } from '../../modules/Backend/Backend';

export default class DirectionsScreen extends Component{
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }
  static navigationOptions = {
    title: 'Directions',
    header: {
      right: <Button onPress={() => {this.onSignOut}} title='Signout'/>,
      style: {
        backgroundColor: CommonStyles.colorPrimary800
      },
      titleStyle: {
        color: CommonStyles.colorPrimary800Text
      }
    },
    tabBar: {
      label: 'Directions',
      icon: ({ tintColor }) => <Icon name="directions" size={25} color={tintColor} />
    }
  }
  onSignOut(){
    Backend.signOut(this.props.navigation);
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <Directions/>
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

AppRegistry.registerComponent('DirectionsScreen', () => DirectionsScreen);