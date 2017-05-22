import React, {Component} from 'react';
import {AppRegistry, Picker, View, StyleSheet, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import CommonStyles from '../../lib/CommonStyles';
import _ from 'lodash';

class LocationPicker extends Component{
	constructor(props){
		super(props);
		this.state = {
			currentTripLocations: [],
			selectedKey: 'default'
		};
		this.selectLocation = this.selectLocation.bind(this);
		this.updateItems = this.updateItems.bind(this);
	}
	selectLocation(location){
		if(location != 'default') {
			this.props.setCurrentLocation(location);
		}
	}
	updateItems(props) {
		var items = _.values(_.mapValues(props.currentTripLocations, (value, key) => { value.key = key; return value; }));
		this.setState({
			currentTripLocations: items,
			selectedKey: props.currentLocationKey
		});
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
			{this.props.tripsFetching ?
				<ActivityIndicator style={styles.indicator} size={25} color={CommonStyles.colorAccent}/> :
				<Picker
					mode='dropdown'
					color={CommonStyles.lightText.secondary}
				  selectedValue={this.state.selectedKey}
				  onValueChange={(location) => this.selectLocation(location)}>
				  <Picker.Item key={'default'} label={'Locations...'} value={'default'} />
				  {this.state.currentTripLocations.map((location, index) => {
				    return (
				      <Picker.Item key={location.key} label={_.get(location, 'place.name', 'No Name')} value={location.key} />
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
		currentTripLocations: _.get(state.userTrips, 'trips.' + state.userTrips.currentTripKey + '.locations', null),
		tripsFetching: state.fetching.trips,
		currentLocationKey: state.userTrips.currentLocationKey,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationPicker);
		