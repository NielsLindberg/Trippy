import React, { Component, PropTypes } from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import { Root } from '../config/router';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipeCount: 0
		}
	}
	incrementRecipeCount() {
		this.setState({recipeCount: this.state.recipeCount+1});
	}
	addRecipe(){
		this.props.addRecipe();
	}
	componentWillMount() {
		this.addRecipe();
	}
 render() {
 	return (
 		<Root style={styles.screen}/>
 	)
 }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}

export default connect(() => {return {} }, mapDispatchToProps)(AppContainer);

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

AppRegistry.registerComponent('AppContainer', () => AppContainer);