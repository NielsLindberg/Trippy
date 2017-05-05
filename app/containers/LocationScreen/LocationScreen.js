import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import LocationEdit from '../../components/LocationEdit/LocationEdit';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

class LocationScreen extends Component{
  static navigationOptions = ({navigation}) => ({
      title: `${navigation.state.params.location == '' ? 'Add Title': navigation.state.params.location}`
  });

  componentWillReceiveProps() {
      if(Object.keys(this.props.currentLocation).length > 0 && this.props.navigation.state.params.location != this.props.currentLocation) {
        console.log('here')
        const {setParams} = this.props.navigation;
        setParams({location: this.props.currentLocation});
      }
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <LocationEdit 
              navigation={this.props.navigation}
            />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currentLocation: state.trips.currentLocation,
    currentLocationIndicator: state.trips.currentLocationFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);