import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

class TripPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			trips: [],
			selectedKey: 'default'
		};
		this.selectTrip = this.selectTrip.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}
	selectTrip(trip){
		if(trip != 'default') {
			this.props.setCurrentTrip(trip);
		}
	}
	updateItems(props) {
		if(props.trips) {
			var items = _.values(_.mapValues(props.trips, (value, key) => { value.key = key; return value; }));
			this.setState({
				trips: items,
				selectedKey: props.currentTripKey
			});
		}
	}
	componentWillReceiveProps(nextProps){
		this.updateItems(nextProps);
	}
	componentWillMount() {
		this.updateItems(this.props);
	}
	render(){
		return(
			<View style={styles.picker}>
			{this.props.userTripsFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> :
				<Picker
					mode='dropdown'
					color={CommonStyles.lightText.secondary}
				  selectedValue={this.state.selectedKey}
				  onValueChange={(trip) => this.selectTrip(trip)}>
				  <Picker.Item key={'default'} label={'Trips...'} value={'default'} />
				  {this.state.trips.map((trip, index) => {
				    return (
				      <Picker.Item key={trip.key} label={_.get(trip, 'title', 'No title')} value={trip.key} />
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
		trips: state.userTrips.trips,
		tripsFetching: state.fetching.trips,
		currentTripKey: state.userTrips.currentTripKey,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripPicker);