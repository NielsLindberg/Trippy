import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet, Button} from 'react-native';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Directions from '../../components/Directions/Directions';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Gradient from '../../components/Gradient/Gradient';

export default class DirectionsScreen extends Component{
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