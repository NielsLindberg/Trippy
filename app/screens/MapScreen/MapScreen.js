import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import MapComponent from '../../components/MapComponent/MapComponent';

export default class MapScreen extends Component{
  static navigationOptions = {
  	title: 'Map',
    header: {
      style: {
        backgroundColor: CommonStyles.colorPrimary800
      },
      titleStyle: {
        color: CommonStyles.colorPrimary800Text
      }
    },
    tabBar: {
      label: 'Map',
      icon: ({ tintColor }) => <Icon name="map" size={25} color={tintColor} />
    },
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <MapComponent backend={this.props.backend}/>
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

AppRegistry.registerComponent('MapScreen', () => MapScreen);