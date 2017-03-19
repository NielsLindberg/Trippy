import React, {Component} from 'react';
import {AppRegistry, Text, View, ScrollView, StyleSheet, TextInput, Switch, Button, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Backend from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class TripList extends Component{
	constructor(props){
		super(props);
		this.state = {
			text: '',
			response: ''
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.onTextChange = this.onTextChange.bind(this);

		this.getPlacesSearch = this.getPlacesSearch.bind(this);
		this.webServicePlaceSearch = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
		this.apiKey = '&key=AIzaSyA7a8aISd9T8geGAmFiQbag2H_tf2XQK8A'
	}
	async getPlacesSearch() {
    try {
      let response = await fetch(this.webServicePlaceSearch + this.state.text + this.apiKey);
      this.setState({
            response: JSON.stringify(response)
        });
    } catch(error) {
      this.setState({
            response: JSON.stringify(error)
        });
    }
  }
	onTextChange(text){
		this.setState({text});
	}

	onSubmit(){
		this.getPlacesSearch();
	}

	render(){
		return(
			<ScrollView style={styles.container}>
				<View style={styles.wrapper}>
					<TextInput
						value={this.state.text}
						placeholder='SearchString'
						onChangeText= {(value) => this.onTextChange(value)}
					/>
					<View>
						<Button
							style={styles.button}
							title='SUBMIT'
							onPress={this.onSubmit}
						/>
					</View>
					<View>
						<Text>{this.state.response}</Text>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: CommonStyles.colorPrimaryLight
	},
	wrapper: {
		paddingHorizontal: 60,
		justifyContent: 'center',
		flex: 1
	},
	button: {
		backgroundColor: CommonStyles.colorAccent,
		color: CommonStyles.colorAccentText
	}
});

AppRegistry.registerComponent('TripList', () => TripList);