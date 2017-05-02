import React, {Component} from 'react';
import {AppRegistry, View, ActivityIndicator, FlatList, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Trip from '../Trip/Trip';
import AddButton from '../AddButton/AddButton';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

class TripList extends Component{
	constructor(props){
		super(props);
		this.state = {
			trips: []
		};
		this.renderRow = this.renderRow.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
	}
	renderRow(trip) {
		return(
			<Trip
				trip={trip}
				navigation={this.props.navigation}
			/>
		)
	}
	componentWillReceiveProps() {
		if(Object.keys(this.props.userTrips).length > 0) {
			var items = [];
				this.props.userTrips.forEach((child) => {
					items.push(child);
				});
			this.setState({trips: items});
		}
	}
	componentWillMount(){
		this.props.getUserTrips();
	}
	renderFooter = () => {
		return(
			<View>
				{this.props.tripsIndicator ? <ActivityIndicator size={35} color={CommonStyles.colorSemiBlack}/> : null}
				<AddButton addItem={this.props.addUserItem} destination={'trips'} item={{title: '', active: false, locations: []}}/>
			</View>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<FlatList
					style={styles.flatList}
					data={this.state.trips}
					renderItem={({item}) => this.renderRow(item)}
					ListFooterComponent={this.renderFooter}
				/>
			</ScrollView>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingBottom: 5
	},
	flatList: {
		marginBottom: 5
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		userTrips: state.trips.userTrips,
		tripsIndicator: state.trips.userTripsFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);