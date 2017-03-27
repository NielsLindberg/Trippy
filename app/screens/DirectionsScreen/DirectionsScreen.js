import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Directions from '../../components/Directions/Directions';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class DirectionsScreen extends Component{
  static navigationOptions = {
    title: 'Directions',
    header: {
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
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <Directions backend={this.props.backend}/>
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