import React, { Component, PropTypes } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { Root } from '../config/router';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';

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
 	console.log(this.props);
 	return (
 		<Root 
 			style={styles.screen}
 			navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })}
 		/>
 	)
 }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
	console.log(state);
	return {
		nav: state.setNavigationState 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('AppContainer', () => AppContainer);