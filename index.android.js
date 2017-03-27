import React, {Component} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { Root, Tabs} from './app/config/router';
import { Backend } from './app/modules/Backend/Backend';

export default class Trippy extends Component {
  render(){
    return <Root style={styles.screen} backend={Backend}/>
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('Trippy', () => Trippy);