import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripEdit from '../../components/TripEdit/TripEdit';
import AddButton from '../../components/AddButton/AddButton';
import CommonStyles from '../../lib/CommonStyles';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import StackHeader from '../../components/StackHeader/StackHeader';
import DeleteButton from '../../components/DeleteButton/DeleteButton';

class TripDetailScreen extends Component{
    static navigationOptions = ({navigation}) => {
    const itemAdd = {
      place: {},
      arrival: {hour: 0, minute: 0},
      end: {hour: 0, minute: 0}
    };
    return {

      header: (
        <StackHeader
          navigation={navigation}
          backButton={true}
          itemAdd={itemAdd}
          destination='locations'
          headerTitle='Edit Trip'
        />
      )
    }
  };
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripEdit 
              navigation={this.props.navigation}
            />
            <DeleteButton
              navigation={this.props.navigation}
              item={'trips/' + this.props.currentTripKey}
              deleteHandler={this.props.deleteUserItem}
              removeCurrentTrip={this.props.setCurrentTrip}
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
    currentTripKey: state.userTrips.currentTripKey,
    tripsFetching: state.fetching.trips
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailScreen);