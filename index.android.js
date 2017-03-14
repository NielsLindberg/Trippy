import React, {Component} from 'react';
import {AppRegistry, Text, View, Navigator, StyleSheet, Dimensions} from 'react-native';

import Login from './app/components/Login/Login';

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
            <Login navigator={navigator} title='login'/>
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
    height:Dimensions.get('window').height
  },
  primaryColor: {
    backgroundColor: '#8BC34A'
  },
  primaryColorDark: {
    backgroundColor: '#33691E'
  },
  primaryColorLight: {
    backgroundColor: '#DCEDC8'
  },
  accentColor: {
    backgroundColor: '#FF3D00'
  },
  accentColorLight: {
    backgroundColor: '#FF9E80'
  }
});

AppRegistry.registerComponent('Trippy', () => Trippy);