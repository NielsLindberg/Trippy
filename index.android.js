import React, {Component} from 'react';
import {AppRegistry, Text, View, Navigator, StyleSheet, Dimensions, StatusBar} from 'react-native';

import Login from './app/components/Login/Login';
import BottomNavigation from './app/components/BottomNavigation/BottomNavigation';

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
              hidden={false}
              translucent={false}
            />
            <Login navigator={navigator} title='login'/>
            <BottomNavigation/>
          </View>
        )
    }
  }
  render(){
    return(
      <Navigator
        initialRoute={{id: 'login'}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
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