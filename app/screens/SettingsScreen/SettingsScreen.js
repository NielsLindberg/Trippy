import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Settings from '../../components/Settings/Settings';

export default class SettingsScreen extends Component{
  static navigationOptions = {
    title: 'Settings',
    header: {
      style: {
        backgroundColor: CommonStyles.colorPrimary800
      },
      titleStyle: {
        color: CommonStyles.colorPrimary800Text
      }
    },
    tabBar: {
      label: 'Settings',
      icon: ({ tintColor }) => <Icon name="settings" size={25} color={tintColor} />
    },
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <Settings/>
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

AppRegistry.registerComponent('SettingsScreen', () => SettingsScreen);