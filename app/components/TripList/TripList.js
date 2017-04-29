import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, FlatList, ScrollView, StyleSheet} from 'react-native';
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
				id={trip.key}
				title={trip.val().title}
				active={trip.val().active}
				navigation={this.props.navigation}
			/>
		)
	}
	componentWillReceiveProps() {
		if(Object.keys(this.props.userTrips).length > 0) {
			var items = [];
			console.log(this.props.userTrips);
			console.log(this.props.userTrips.val());

				this.props.userTrips.forEach((child) => {
					items.push(child);
				});
			console.log(items);
			this.setState({trips: items});
		}
	}
	renderFooter = () => {
		return(
				<AddButton addItem={this.props.addUserItem} item={{title: '', active: false}}/>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				{this.props.tripsIndicator ? <ActivityIndicator size={35} color={CommonStyles.colorSemiBlack}/> : null}
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
		userTrips: state.setUserTrips,
		tripsIndicator: state.tripsIndicator
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);