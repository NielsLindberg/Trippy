import React, {Component} from 'react';
import {AppRegistry, Text, View, Navigator, StyleSheet, Dimensions, StatusBar} from 'react-native';

import TopNavigation from './app/components/TopNavigation/TopNavigation';
import BottomNavigation from './app/components/BottomNavigation/BottomNavigation';

import Login from './app/components/Login/Login';
import TripList from './app/components/TripList/TripList';
import MapComponent from './app/components/MapComponent/MapComponent';
import Directions from './app/components/Directions/Directions';
import Settings from './app/components/Settings/Settings';

export default class Trippy extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  renderScene(route, navigator){
    switch(route.id){
      case 'login':
        return (
          <View style={styles.screen}>
            <StatusBar
              backgroundColor='#00838F'
              barStyle="light-content"
              hidden={true}
              translucent={false}
            />
            <Login navigator={navigator} title='login'/>
          </View>
        )
      case 'trips':
        return (
          <View style={styles.screen}>
            <TopNavigation title={route.title}/>
            <StatusBar
              backgroundColor='#00838F'
              barStyle="light-content"
              hidden={false}
              translucent={false}
            />
            <TripList navigator={navigator} title='trips'/>
            <BottomNavigation navigator={navigator}/>
          </View>
        )
      case 'map':
        return (
          <View style={styles.screen}>
            <TopNavigation title={route.title}/>
            <StatusBar
              backgroundColor='#00838F'
              barStyle="light-content"
              hidden={false}
              translucent={false}
            />
            <MapComponent navigator={navigator} title='map'/>
            <BottomNavigation navigator={navigator}/>
          </View>
        )
      case 'directions':
        return (
          <View style={styles.screen}>
            <TopNavigation title={route.title}/>
            <StatusBar
              backgroundColor='#00838F'
              barStyle="light-content"
              hidden={false}
              translucent={false}
            />
            <Settings navigator={navigator} title='directions'/>
            <BottomNavigation navigator={navigator}/>
          </View>
        )
      case 'settings':
        return (
          <View style={styles.screen}>
            <TopNavigation title={route.title}/>
            <StatusBar
              backgroundColor='#00838F'
              barStyle="light-content"
              hidden={false}
              translucent={false}
            />
            <Settings navigator={navigator} title='settings'/>
            <BottomNavigation navigator={navigator}/>
          </View>
        )
    }
  }
  render(){
    return(
      <Navigator
        initialRoute={{id: 'login'}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
      />
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('Trippy', () => Trippy);