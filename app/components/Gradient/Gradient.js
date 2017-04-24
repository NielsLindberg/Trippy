import React, {Component} from 'react';
import {AppRegistry, Dimensions, View, StyleSheet} from 'react-native';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Svg,{
    LinearGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';


export default class Gradient extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps() {

  }
  componentWillMount() {
    let {height, width} = Dimensions.get('window');
    this.setState({
      height: height,
      width: width
    });
  }
  render() {
    return (
      <View style={styles.gradient}>
        <Svg height={this.state.height} width={this.state.width}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0" stopColor={this.props.colorTop} stopOpacity="1"/>
              <Stop offset="1" stopColor={this.props.colorBottom} stopOpacity="1"/>
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={this.state.width} height={this.state.height} fill="url(#grad)"/>
        </Svg>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  gradient: {
    elevation: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 0,
    padding:0
  }
});

AppRegistry.registerComponent('Gradient', () => Gradient);