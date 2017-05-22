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
import _ from 'lodash';

class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			active: false,
			date: '',
			locations: [],
		};
		this.renderRow = this.renderRow.bind(this);
		this.datePicker = this.datePicker.bind(this);
		this.updateItems = this.updateItems.bind(this);
		this.updateItem = this.updateItem.bind(this);
	}
	renderRow(location) {
		return(
			<Location
				location={location}
				navigation={this.props.navigation}
			/>
		)
	}
	updateItems(props) {
		if(props.currentTrip) {
			this.setState({
				locations: _.values(_.mapValues(props.currentTrip.locations, (value, key) => { value.key = key; return value; })),
				date: props.currentTrip.date,
				title: props.currentTrip.title,
				dateString: props.pad(props.currentTrip.date.day,2) + '-' + props.pad(props.currentTrip.date.month,2) + '-' + props.pad(props.currentTrip.date.year,4)
			});
		}
	}
	updateItem(item){
		if(!_.isEqual(_.pick(this.props.currentTrip, _.keys(item)), item)) {
			this.props.updateUserItem('trips/' + this.props.currentTripKey, item)
		}
	}
	componentWillReceiveProps(nextProps) {
		this.updateItems(nextProps);
	}
	componentWillMount() {
		this.updateItems(this.props);
	}

	datePicker(){
		DatePickerAndroid.open({
		    date: new Date()
		})
		.then((response) => {
			if(response.action !== DatePickerAndroid.dismissedAction) {
				let date = {year: response.year, month: (response.month +1), day: response.day};
				this.updateItem({'date': date});
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
							onEndEditing={() => this.updateItem({'title': this.state.title})}
						/>
					</View>
					<View style={styles.datePicker}>
						<Icon style={styles.icon} name="date-range"/>
						<TouchableOpacity onPress={() => {this.datePicker()}}>
							<Text style={styles.datePickerText}>{this.state.dateString}</Text>
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
		currentTripKey: state.userTrips.currentTripKey,
		currentTrip: _.get(state.userTrips.trips, state.userTrips.currentTripKey, null)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit);