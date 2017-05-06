import React, {Component} from 'react';
import {AppRegistry, View, ActivityIndicator, Text, FlatList, Dimensions, ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Trip from '../Trip/Trip';
import AddButton from '../AddButton/AddButton';
import Gradient from '../Gradient/Gradient';
import CommonStyles from '../../lib/CommonStyles';

class TripList extends Component{
	constructor(props){
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
	}
	componentWillMount(){
		this.props.getUserTrips();
	}
	renderRow(trip) {
		return(
			<Trip
				trip={trip}
				navigation={this.props.navigation}
			/>
		)
	}
	renderFooter() {
		return (
			<ActivityIndicator size={35} style={styles.indicator} animating={this.props.fetching} color={CommonStyles.colorSemiBlack}/>
		)
	}
	renderHeader() { 
		let {width} = Dimensions.get('window');
		return (
			<View style={styles.header}>
				<Gradient 
					height={70} 
					width={width} 
					shape="Rectangle"
					color1={CommonStyles.colorGradient5} 
					color2={CommonStyles.colorGradient6} 
					color1Opacity={0.9} 
          color2Opacity={0.9}
					fallbackColor={CommonStyles.colorPrimary900Text}
					x1="0%" 
					x2="80%" 
					y1="0%" 
					y2="80%"
				/>
				<Text style={styles.headerTitle}>Trips</Text>
				<AddButton 
					align={'flex-end'} 
					size={25}
					color={CommonStyles.colorPrimary900Text}
					backgroundColor='transparent'
					addItem={this.props.addUserItem} 
					destination={'trips'} 
					item={{title: '', active: false, locations: []}}
				/>
			</View>
		)
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<FlatList
					style={styles.flatList}
					data={this.props.userTrips}
					renderItem={({item}) => this.renderRow(item)}
					ListFooterComponent={() => this.renderFooter()}
					ListHeaderComponent={() => this.renderHeader()}
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
	header: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		elevation: 2,
		borderRadius: 2,
		backgroundColor: CommonStyles.colorPrimary500,
		margin: 5
	},
	headerTitle: {
		fontSize: 25,
		color: CommonStyles.colorPrimary400Text,
		fontFamily: CommonStyles.fontFamily
	},
	indicator: {
		alignSelf: 'center',
		elevation: 5
	},
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
		userTrips: state.trips.userTrips,
		fetching: state.trips.userTripsFetching
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripList);