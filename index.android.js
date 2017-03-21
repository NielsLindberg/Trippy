import React, {Component} from 'react';
import {AppRegistry, View, Navigator, StyleSheet} from 'react-native';

import StatusBarComponent from './app/components/StatusBarComponent/StatusBarComponent';
import TopNavigation from './app/components/TopNavigation/TopNavigation';
import BottomNavigation from './app/components/BottomNavigation/BottomNavigation';

import Login from './app/components/Login/Login';
import TripList from './app/components/TripList/TripList';
import MapComponent from './app/components/MapComponent/MapComponent';
import Directions from './app/components/Directions/Directions';
import Settings from './app/components/Settings/Settings';
import AddButton from './app/components/AddButton/AddButton';

export default class Trippy extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      response: ''
    }
    this.handleResponse = this.handleResponse.bind(this);
    this.handleText = this.handleText.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }
  handleText(text) {
    this.setState({text: text});
  }
  handleResponse(response) {
    this.setState({response: response});
  }
  renderScene(route, navigator){
    switch(route.id){
      case 'login':
        return (
          <View style={styles.screen}>
            <StatusBarComponent hidden={true}/>
            <Login navigator={navigator} title='login'/>
          </View>
        )
      case 'trips':
        return (
          <View style={styles.screen}>
            <StatusBarComponent/>
            <TopNavigation title={route.title}/>
            <AddButton navigator={navigator} handleResponse={this.handleResponse} text={this.state.text}/>
            <TripList navigator={navigator} title='trips' response={this.state.response} handleText={this.handleText}/>
            <BottomNavigation navigator={navigator} title={route.title}/>
          </View>
        )
      case 'map':
        return (
          <View style={styles.screen}>
            <StatusBarComponent/>
            <TopNavigation title={route.title}/>
            <MapComponent navigator={navigator} title='map'/>
            <BottomNavigation navigator={navigator} title={route.title}/>
          </View>
        )
      case 'directions':
        return (
          <View style={styles.screen}>
            <StatusBarComponent/>
            <TopNavigation title={route.title}/>
            <Directions navigator={navigator} title='directions'/>
            <BottomNavigation navigator={navigator} title={route.title}/>
          </View>
        )
      case 'settings':
        return (
          <View style={styles.screen}>
            <StatusBarComponent/>
            <TopNavigation title={route.title}/>
            <Settings navigator={navigator} title='settings'/>
            <BottomNavigation navigator={navigator} title={route.title}/>
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