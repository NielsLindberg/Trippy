import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Directions from '../../components/Directions/Directions';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Gradient from '../../components/Gradient/Gradient';

export default class DirectionsScreen extends Component{
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Directions',
    header: (navigation) => ({
      style: {
        backgroundColor: CommonStyles.colorPrimary700
      },
      titleStyle: {
        color: CommonStyles.colorPrimary700Text,
        fontFamily: CommonStyles.fontPrimary
      }
    }),
    tabBar: {
      label: 'Directions',
      icon: ({ tintColor }) => <Icon name="directions" size={25} color={tintColor} />
    }
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