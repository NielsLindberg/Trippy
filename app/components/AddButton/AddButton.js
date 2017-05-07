import React, {Component} from 'react';
import {AppRegistry, View, TouchableOpacity, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../../lib/CommonStyles';

class AddButton extends Component {
	constructor(props){
		super(props);
		this.addItem = this.addItem.bind(this);
	}
	addItem(){
		this.props.addUserItem(this.props.destination, this.props.item);
	}
	render(){
		return(
				<TouchableOpacity
        	style={styles.buttonStyle}
        	onPress={this.addItem}
        	activeOpacity={0.8}
        	>
        	<Icon name="add" style={styles.buttonTextStyle}/>
        </TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	buttonStyle: {
    padding: 5,
    elevation: 4,
    backgroundColor: CommonStyles.colorAccent,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',
    top: 27,
    right: 16
   },
	buttonTextStyle: {
    fontSize: 40,
    color: CommonStyles.lightText.primary
  },
});


function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);