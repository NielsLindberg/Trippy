import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

export default class DirectionsHeader extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.setState({
      startAddress: this.props.directions.start_address,
      endAddress: this.props.directions.end_address,
      startTime: this.props.directions.departure_time.text,
      endTime: this.props.directions.arrival_time.text
    });
  }
  render(){
    return(
      <View style={styles.container}>
           <Text style={[styles.text, styles.textSecondary, {flex:1}]} numberOfLines={1} ellipseMode='head'>Departure:</Text>
           <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.startAddress}</Text>
           <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.startTime}</Text>
           <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.endAddress}</Text>
           <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.endTime}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    padding:5,
    elevation: 2,
    backgroundColor: CommonStyles.white
  },
  row: {
    flexDirection: 'row',
  },
  textWrap: {
    flexDirection: 'row'
  },
  text: {
    color: CommonStyles.darkText.secondary,
    fontSize: 14
  },
  header: {
    backgroundColor: CommonStyles.colorSecondary,
    padding: 5,
    borderRadius: 2
  },
  textHeader: {
    fontSize: 16,
    alignSelf: 'center',
    color: CommonStyles.lightText.primary, 
  },
  textSecondary: {
    color: CommonStyles.darkText.primary
  }
});

AppRegistry.registerComponent('DirectionsHeader', () => DirectionsHeader);