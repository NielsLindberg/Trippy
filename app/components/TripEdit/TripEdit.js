import React, {Component} from 'react';
import {AppRegistry, Alert, Text, View, ListView, ScrollView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class TripEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: this.props.tripState.title,
			subTitle: this.props.tripState.subTitle,
			description: this.props.tripState.description
		}
		this.deletePressConfirm = this.deletePressConfirm.bind(this);
		this.deletePress = this.deletePress.bind(this);
	}
	deletePressConfirm(){
		var self = this;
		Alert.alert(
		  'Delete Trip',
		  'WARNING: Deleting a trip is irreversable!',
		  [
		    {text: 'Cancel', style: 'cancel'},
		    {text: 'OK', onPress: () => self.deletePress()},
		  ],
		  { cancelable: false }
		)
	}
	deletePress(){
		this.props.deleteUserItem(this.props.tripState.id);
		this.props.navigation.goBack();
	}
	componentWillMount(){
	}
	render(){
		return(
			<ScrollView style={styles.container}>
				<TextInput 
					style={styles.title}
					value={this.state.title}
					onChangeText= {(title) => this.setState({title})}
					onEndEditing={() => this.props.updateUserItem(this.props.tripState.id, this.state)}
				/>
				<TextInput 
					style={styles.subTitle}
					value={this.state.subTitle}
					onChangeText= {(subTitle) => this.setState({subTitle})}
					onEndEditing={() => this.props.updateUserItem(this.props.tripState.id, this.state)}
				/>
				<TextInput 
					style={styles.description}
					value={this.state.description}
					onChangeText= {(description) => this.setState({description})}
					onEndEditing={() => this.props.updateUserItem(this.props.tripState.id, this.state)}
				/>
				<TouchableOpacity style={styles.deleteButton} onPress={() => {this.deletePressConfirm()}}>
						<Icon name="delete" style={styles.deleteButtonText}/>
					</TouchableOpacity>
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
  deleteButton: {
		backgroundColor: CommonStyles.colorAccent,
		borderRadius: 20,
		alignSelf: 'flex-start',
		elevation: 2
	},
	deleteButtonText: {
		fontFamily: CommonStyles.fontPrimary,
		padding: 5,
		fontSize: 14,
		color: CommonStyles.colorAccentText
	}
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TripEdit);