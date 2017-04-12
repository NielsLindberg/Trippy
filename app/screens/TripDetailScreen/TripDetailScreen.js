import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripList from '../../components/TripList/TripList';
import Logout from '../../components/Logout/Logout';
import AddButton from '../../components/AddButton/AddButton';

export default class TripDetailScreen extends Component{
  static navigationOptions = {
    title: 'TripDetails',
    header: (navigation) => ({
      style: {
        backgroundColor: CommonStyles.colorPrimary700
      },
      tintColor: CommonStyles.colorPrimary700Text,
      titleStyle: {
        color: CommonStyles.colorPrimary700Text,
        fontFamily: CommonStyles.fontPrimary
      }
    }),
    tabBar: {
      label: 'Trips',
      icon: ({ tintColor }) => <Icon name="playlist-add" size={25} color={tintColor} />
    },
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <AddButton/>
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

AppRegistry.registerComponent('TripDetailScreen', () => TripDetailScreen);