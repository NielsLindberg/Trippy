import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import { Root } from '../../navigator/router';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators, dispatch} from 'redux';
import { addNavigationHelpers } from 'react-navigation';
import CommonStyles from '../../lib/CommonStyles';

class AppContainer extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.addBackend();
		this.props.setGoogleSigninConfigure();
		this.props.getGeoLocation();
	}
	// _onLayout = event => this.props.appLayout(event.nativeEvent.layout);
 render() {
 	return (
 		<View style={styles.screen}>
	 		<Root navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigator
      })}/>
 		</View>
 	)
 }
}
const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: CommonStyles.lightText.dividers
  }
});

function mapDispatchToProps(dispatch) {
	return Object.assign({dispatch: dispatch}, bindActionCreators(ActionCreators, dispatch));
}

function mapStateToProps(state) {
	return {
		navigator: state.navigator
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);