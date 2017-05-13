import React, {Component} from 'react';
import {AppRegistry, ActivityIndicator, DatePickerAndroid, Alert, Text, View, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';
import AddButton from '../AddButton/AddButton';
import Location from '../Location/Location';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			active: false,
			date: '',
			locations: []
		};
		this.renderRow = this.renderRow.bind(this);
		this.datePicker = this.datePicker.bind(this);
	}
	renderRow(location) {
		return(
			<Location
				location={location}
				navigation={this.props.navigation}
			/>
		)
	}
	componentWillReceiveProps() {
		if(Object.keys(this.props.currentTrip).length > 0) {
			var items = [];
			this.props.currentTrip.child('locations').forEach((child) => {
				items.push(child);
			});
			this.setState({
				title: this.props.currentTripVal.title,
				locations: items,
				date: this.props.currentTripVal.date
			});
		}
	}
	datePicker(){
		DatePickerAndroid.open({
		    date: new Date()
		})
		.then((response) => {
			if(response.action !== DatePickerAndroid.dismissedAction) {
				let date = new Date(response.year, response.month, response.day);
				this.props.updateUserItem(this.props.currentTrip.ref, {'date': date});
			}
		})
		.catch((error) => {
		  console.log('Cannot open date picker', error);
		})
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.sectionHeader}>Trip Details</Text>
				<View style={styles.tripContainer}>
					<View style={styles.title}>
						<Icon style={styles.icon} name="title"/>
						<TextInput 
							value={this.state.title}
							style={styles.titleInput}
							placeholder='Add Title'
							onChangeText= {(title) => this.setState({title})}
							onEndEditing={() => this.props.updateUserItem(this.props.currentTrip.ref, {'title': this.state.title})}
						/>
					</View>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="date-range"/>
						<TouchableOpacity onPress={() => {this.datePicker()}}>
							<Text style={styles.datePickerText}>{this.state.date != '' ? moment(this.state.date).format('DD-MM-YYYY') : 'Pick a date'}</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={styles.sectionHeader}>Locations</Text>
				<FlatList
					style={styles.flatList}
					data={this.state.locations}
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
		paddingBottom: 5
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 16,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 18,
		color: CommonStyles.darkText.secondary,
	},
	tripContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: CommonStyles.white,
		elevation: 2,
		borderRadius: 2,
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	icon: {
		color: CommonStyles.colorAccent,
		fontSize: 25
	},
	title: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: 5,
	},
	titleInput: {
		flex: 1,
		fontSize: 18,
		padding: 5,
		margin: 0
	},
	datePicker: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		paddingRight: 5
	},
	datePickerText: {
		padding: 5,
		fontSize: 18,
		margin: 0
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
		currentTrip: state.trips.currentTrip,
		currentTripVal: typeof state.trips.currentTrip.val === 'function' ? state.trips.currentTrip.val() : null,
		currentTripIndicator: state.trips.currentTripFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit);