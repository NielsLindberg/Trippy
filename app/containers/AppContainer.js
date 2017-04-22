import React, { Component, PropTypes } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { Root } from '../config/router';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators, dispatch} from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import CommonStyles from '../lib/CommonStyles';


class AppContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.addFirestack();
		this.props.setGoogleSigninConfigure();
	}
 render() {
 	return (
 		<Root 
 			style={styles.screen}
 		/>
 	)
 }
}
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: CommonStyles.colorPrimary50
  }
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);