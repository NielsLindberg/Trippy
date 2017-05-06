import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import CommonStyles from '../../lib/CommonStyles';
import Svg,{
    LinearGradient,
    Rect,
    Defs,
    Ellipse,
    Stop
} from 'react-native-svg';


export default class Gradient extends Component {
  constructor(props){
    super(props);
  }
  static defaultProps() {

  }
  render() {
    return (
      <View style={styles.gradient}>
        <Svg height={this.props.height} width={this.props.width}>
          <Defs>
            <LinearGradient id="grad" x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2}>
              <Stop offset="0" stopColor={this.props.color1} stopOpacity={this.props.color1Opacity}/>
              <Stop offset="1" stopColor={this.props.color2} stopOpacity={this.props.color2Opacity}/>
            </LinearGradient>
          </Defs>
          {this.props.shape === 'Rectangle' && <Rect x="0" y="0" width={this.props.width} height={this.props.height} fill={this.props.fallbackColor}/> }
          {this.props.shape === 'Rectangle' && <Rect x="0" y="0" width={this.props.width} height={this.props.height} fill="url(#grad)"/> }
          {this.props.shape === 'Ellipse' && <Ellipse cx={this.props.width / 2} cy={this.props.height / 2} rx={this.props.width / 2} ry={this.props.height / 2} fill={this.props.fallbackColor} /> }
          {this.props.shape === 'Ellipse' && <Ellipse cx={this.props.width / 2} cy={this.props.height / 2} rx={this.props.width / 2} ry={this.props.height / 2} fill="url(#grad)" /> }
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