import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Directions from '../../components/Directions/Directions';
import CommonStyles from '../../lib/CommonStyles';
import TripPicker from '../../components/TripPicker/TripPicker';
import LocationPicker from '../../components/LocationPicker/LocationPicker';

export default class DirectionsScreen extends Component{
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <View style={styles.pickers}>
              <TripPicker/>
              <LocationPicker/>
            </View>
            <Directions/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  },
  pickers: {
    flexDirection: 'row'
  }
});

AppRegistry.registerComponent('DirectionsScreen', () => DirectionsScreen);