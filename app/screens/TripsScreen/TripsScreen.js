import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';

import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripList from '../../components/TripList/TripList';
import Logout from '../../components/Logout/Logout';
import AddButton from '../../components/AddButton/AddButton';
import Gradient from '../../components/Gradient/Gradient';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class TripsScreen extends Component{
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripList navigation={this.props.navigation}/>
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