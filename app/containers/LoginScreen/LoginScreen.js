import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Dimensions} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import Login from '../../components/Login/Login';
import Gradient from '../../components/Gradient/Gradient';
import CommonStyles from '../../lib/CommonStyles';

export default class LoginScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){

  }
  render(){
    let {height, width} = Dimensions.get('window');
    return(
    		<View style={styles.screen}>
            <StatusBarComponent hidden={true}/>
            <Gradient 
              height={height} 
              width={width}
              shape="Rectangle"
              color1={CommonStyles.colorGradient5} 
              color2={CommonStyles.colorGradient6}
              color1Opacity={1} 
              color2Opacity={1}
              fallbackColor={CommonStyles.colorPrimary900Text}
              x1="0%" 
              x2="0%" 
              y1="0%" 
              y2="100%"
            />
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