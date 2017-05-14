import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

export default class DirectionsStep extends Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    console.log(this.props);
    this.setState({
      distance: this.props.step.distance.text,
      duration: this.props.step.duration.text,
      htmlInstructions: this.props.step.html_instructions,
      travelMode: _.capitalize(this.props.step.travel_mode),
      iconName: 'directions-walk'
    });
    if(this.props.step.travel_mode !== 'WALKING') {
      this.setState({
        arrivalStop: this.props.step.transit_details.arrival_stop.name,
        arrivalTime: this.props.step.transit_details.arrival_time.text,
        departureStop: this.props.step.transit_details.departure_stop.name,
        departureTime: this.props.step.transit_details.departure_time.text,
        headSign: this.props.step.transit_details.headsign,
        numStops: this.props.step.transit_details.num_stops,
        lineName: this.props.step.transit_details.line.name,
        lineShortName: this.props.step.transit_details.line.short_name,
        vehicleType: this.props.step.transit_details.line.vehicle.name,
        iconName: _.toLower(this.props.step.transit_details.line.vehicle.name) === 'bus' ? 'directions-' + _.toLower(this.props.step.transit_details.line.vehicle.name) : 'train'
      });
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.textHeader, {flex: 18}]} numberOfLines={2} ellipseMode='head'>{this.state.htmlInstructions}</Text>
          <Icon style={[styles.textHeader, {flex: 1}]} name={this.state.iconName}/>
        </View>
        <View style={styles.row}>
              <View style={[styles.textWrap, {flex:5}]}>
                <Text style={[styles.text, styles.textSecondary, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.travelMode + ':'}</Text>
                <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.duration}</Text>
              </View>
              <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.distance}</Text>
            </View>
        {this.props.step.travel_mode === 'WALKING' ? null :
         <View style={styles.transitContainer}>
            <View style={styles.row}>
              <View style={[styles.textWrap, {flex:5}]}>
                <Text style={[styles.text, styles.textSecondary, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.vehicleType + ':'}</Text>
                <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.lineName ? this.state.lineName : this.state.headSign}</Text>
              </View>
              <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.lineShortName}</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.textWrap, {flex:5}]}>
                <Text style={[styles.text, styles.textSecondary, {flex:1}]} numberOfLines={1} ellipseMode='head'>Departure:</Text>
                <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.departureStop}</Text>
              </View>
              <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.departureTime}</Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.textWrap, {flex:5}]}>
                <Text style={[styles.text, styles.textSecondary, {flex:1}]} numberOfLines={1} ellipseMode='head'>Arrival:</Text>
                <Text style={[styles.text, {flex:3}]} numberOfLines={1} ellipseMode='head'>{this.state.arrivalStop}</Text>
              </View>
              <Text style={[styles.text, {flex:1}]} numberOfLines={1} ellipseMode='head'>{this.state.arrivalTime}</Text>
            </View>
         </View> 
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding:5,
    backgroundColor: CommonStyles.white
  },
  row: {
    flexDirection: 'row',
  },
  textWrap: {
    flexDirection: 'row'
  },
  text: {
    color: CommonStyles.darkText.secondary
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

AppRegistry.registerComponent('DirectionsStep', () => DirectionsStep);