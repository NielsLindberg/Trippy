import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import Trip from '../Trip/Trip';

export default class TripList extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			datasource: ds
		}
		this.renderRow = this.renderRow.bind(this);
		this.getTrips = this.getTrips.bind(this);
	}
	static defaultProps = {
	}
	getTrips(){
	  Backend.getUserItems((trips) => {
			this.setState({
				datasource: this.state.datasource.cloneWithRows(trips)
			});
		});
	}
	componentWillMount(){
		this.getTrips();
	}
	renderRow(trip) {
		return(
			<Trip
				id={trip.key}
				title={trip.value.title}
				subTitle={trip.value.subTitle}
				description={trip.value.description}
				navigation={this.props.navigation}
			/>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<ListView
					dataSource={this.state.datasource}
					renderRow={this.renderRow}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimary50
	},
	separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E'
  },
});

AppRegistry.registerComponent('TripList', () => TripList);