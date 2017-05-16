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
  componentWillUnmount(){
    this.props.setCurrentLocation({});
    this.props.setLocationSearchResults({});
    this.props.navigation.goBack();   
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
              item={this.props.currentLocation}
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
    currentLocation: state.trips.currentLocation,
    currentLocationIndicator: state.trips.currentLocationFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);