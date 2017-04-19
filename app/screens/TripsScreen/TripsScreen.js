import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripList from '../../components/TripList/TripList';
import Logout from '../../components/Logout/Logout';
import AddButton from '../../components/AddButton/AddButton';

export default class TripsScreen extends Component{
  static navigationOptions = {
    title: 'Trips',
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
      label: 'Trips',
      icon: ({ tintColor }) => <Icon name="playlist-add" size={25} color={tintColor} />
    },
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripList navigation={this.props.navigation}/>
            <AddButton navigation={this.props.navigation}/>
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

AppRegistry.registerComponent('TripsScreen', () => TripsScreen);