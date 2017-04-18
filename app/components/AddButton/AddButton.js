import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class AddButton extends Component {
	constructor(props){
		super(props);
		this.addUserItem = this.addUserItem.bind(this);
	}
	addUserItem() {
		this.props.addUserItem({
        	 	title: 'Add Title',
        		subTitle: 'Add SubTitle',
        	 	description: 'Add Description'
    });
	}
	render(){
		return(
				<TouchableOpacity
        	style={styles.addButton}
        	onPress={this.addUserItem}
        	activeOpacity={0.8}
        	>
        	<Icon name="add" style={styles.addButtonIcon}/>
        </TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	addButton: {
		bottom: 15,
		right: 15,
		padding: 15,
		backgroundColor: CommonStyles.colorAccent,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		elevation: 8,
		borderRadius: 50,
	},
	addButtonIcon: {
		fontSize: 35,
		color: CommonStyles.colorAccentText
	},
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);