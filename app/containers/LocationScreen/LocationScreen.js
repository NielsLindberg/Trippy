import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import LocationEdit from '../../components/LocationEdit/LocationEdit';
import StackHeader from '../../components/StackHeader/StackHeader';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
  index: 2,
  routes: [
    {key: 1, routeName: "TripsScreen"},
    {key: 2, routeName: "TripDetailScreen"},
  ]
});

class LocationScreen extends Component{
  static navigationOptions = ({navigation}) => {
    return {
      header: (
        <StackHeader
          navigation={navigation}
          backButton={true}
          headerTitle='Choose Location'
        />
      )
    }
  };
  componentWillReceiveProps(nextProps) {
    if(nextProps.currentTripKey != this.props.currentTripKey) {
      console.log(nextProps.navigation);
    }
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <LocationEdit 
              navigation={this.props.navigation}
            />
            <DeleteButton
              navigation={this.props.navigation}
              item={'trips/' + this.props.currentTripKey + '/locations/' + this.props.currentLocationKey}
              deleteHandler={this.props.deleteUserItem}
              removeCurrentLocation={this.props.setCurrentLocation}
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
    currentLocationKey: state.userTrips.currentLocationKey,
    currentTripKey: state.userTrips.currentTripKey
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);