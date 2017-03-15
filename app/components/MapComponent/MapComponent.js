import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Backend from '../../modules/Backend/Backend';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import MapStyles from './MapStyles';

export default class MapComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			markers: this.props.markers,
			region: this.props.region
		};
		this.onRegionChange = this.onRegionChange.bind(this);
		this.mapRef = null;
		this.zoomMapToMarkers = this.zoomMapToMarkers.bind(this);
	}

	static defaultProps = {
		markers: [{
			id: 'Marker1',
			latlng: {
				longitude: 12.54,
				latitude: 55.65
			},
			title: 'Marker 1',
			description: 'Description 1'
			}, {
			id: 'Marker2',	
			latlng: {
				longitude: 12.56,
				latitude: 55.67
			},
			title: 'Marker 2',
			description: 'Description 2'}, {
			id: 'Marker3',	
			latlng: {
				longitude: 12.56,
				latitude: 55.68
			},
			title: 'Marker 3',
			description: 'Description 3'}],
		region: {
			latitude: 55.69,
	    longitude: 12.56,
	    latitudeDelta: 0.05,
	    longitudeDelta: 0.05
		}
	}

	onRegionChange(region) {
  	this.setState({ region });
	}

	zoomMapToMarkers() {
		let coordinates = [];
		this.state.markers.map(marker => (
					   coordinates.push(marker.latlng)
		));
		let edgePadding = {
			top: 100,
		  right: 15,
		  bottom: 15,
		  left: 15
		};
		let animated = false;
		let options = {edgePadding: edgePadding, animated: animated};
		this.mapRef.fitToCoordinates(coordinates, options);
	}

	componentDidMount() {
	}

	render(){
		return (
	    <View style={styles.container}>
		        <MapView
		        	onLayout={this.zoomMapToMarkers}
		        	ref={(ref) => { this.mapRef = ref }}
		        	region={this.state.region}
		        	onRegionChange={this.onRegionChange}
	         		style={styles.map}
	         		customMapStyle={MapStyles}
	       		>
	       		{this.state.markers.map(marker => (
					    <MapView.Marker
					    	pinColor={'#FF4081'}
					    	key={marker.id}
					      coordinate={marker.latlng}
					      title={marker.title}
					      description={marker.description}
					    />
					  ))}
	       		</MapView>
	    </View>
    );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#00BCD4'
	},
	map: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
});

AppRegistry.registerComponent('MapComponent', () => MapComponent);