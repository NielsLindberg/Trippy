import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

class DirectionsPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			currentTripLocations: [],
		};
		this.selectDirections = this.selectDirections.bind(this);
	}
	selectDirections(location){
		this.props.setCurrentLocation(location);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.currentTripLocations) {
			var items = _.values(nextProps.currentTripLocations);
			this.setState({currentTripLocations: items});
		}
	}
	render(){
		return(
			<View style={styles.picker}>
			{this.props.tripsFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> : 
				<Picker
					mode='dropdown'
					selectedValue={this.props.currentLocationKey}
				  onValueChange={(location) => this.selectDirections(location)}>
				  <Picker.Item key='default' label='Location' value='default'/>
				  {this.state.currentTripLocations.map((location, index) => {
				    return (
				      <Picker.Item key={index} label={_.get(location, 'place.name', 'No title')} value={location.key} />
			     )})}
				</Picker>
			 }
			</View>
		)
	}
}
const styles = StyleSheet.create({
	picker: {
		backgroundColor: CommonStyles.white,
		elevation: 2,
		height: 50,
		flex: 1
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		currentLocationKey: state.userTrips.currentLocationKey,
		currentTripKey: state.userTrips.currentTripKey,
		currentTripLocations: _.get(state.userTrips, 'trips[' + state.userTrips.currentTripKey + '].locations', {}),
		tripsFetching: state.fetching.trips
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsPicker);