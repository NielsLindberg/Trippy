import React, {Component} from 'react';
import {AppRegistry, StatusBar} from 'react-native';

import CommonStyles from '../../lib/CommonStyles';

export default class StatusBarComponent extends Component{
	constructor(props){
		super(props);
		this.state = {
			hidden: this.props.hidden
		};
	}
	static defaultProps = {
		hidden: false
	};

	render(){
		return (
	    <StatusBar
              backgroundColor={CommonStyles.colorPrimary900}
              barStyle="light-content"
              hidden={this.state.hidden}
              translucent={false}
       />
    );
	}
}

AppRegistry.registerComponent('StatusBarComponent', () => StatusBarComponent);