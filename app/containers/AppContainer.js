import React, { Component, PropTypes } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { Root } from '../config/router';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

class AppContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.addFirestack();
		this.props.setGoogleSigninConfigure();
		this.props.getGoogleSignin();
	}
 render() {
 	return (
 		<Root style={styles.screen} {...this.props}/>
 	)
 }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	return {
	}
}

export default connect((state) => {return {} }, mapDispatchToProps)(AppContainer);

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('AppContainer', () => AppContainer);