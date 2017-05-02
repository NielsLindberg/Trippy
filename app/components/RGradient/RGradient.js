import React, {Component} from 'react';
import {AppRegistry, Dimensions, View, StyleSheet} from 'react-native';
import CommonStyles from '../../lib/CommonStyles';
import Svg,{
    RadialGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';


export default class RGradient extends Component {
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
            <RadialGradient id="grad" cx={this.state.width / 2} cy={this.state.height / 2} rx={this.state.width / 2} ry={this.state.height / 2} fx={this.state.width} fy={this.state.height}>
              <Stop offset="0" stopColor={this.props.colorTop} stopOpacity="1"/>
              <Stop offset="1" stopColor={this.props.colorBottom} stopOpacity="1"/>
            </RadialGradient>
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

AppRegistry.registerComponent('RGradient', () => RGradient);