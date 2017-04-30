import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Login from '../../components/Login/Login';
import Gradient from '../../components/Gradient/Gradient';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class LoginScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent hidden={true}/>
            <Gradient colorTop={CommonStyles.colorGradient5} colorBottom={CommonStyles.colorGradient6}/>
            <Login navigation={this.props.navigation}/>
            
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

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);