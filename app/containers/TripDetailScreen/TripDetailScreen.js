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

class TripDetailScreen extends Component{
    static navigationOptions = ({navigation}) => {
    const itemAdd = {
      title: ''
    };
    return {
      header: (
        <StackHeader
          navigation={navigation}
          backButton={true}
          itemAdd={itemAdd}
          itemAddDestination={'locations'}
          headerTitle={navigation.state.params.trip.val().title == '' ? 'Add Title': navigation.state.params.trip.val().title}
        />
      )
    }
  };
  componentWillReceiveProps() {
    if(Object.keys(this.props.currentTrip).length > 0 && this.props.navigation.state.params.trip != this.props.currentTrip) {
      const {setParams} = this.props.navigation;
      setParams({trip: this.props.currentTrip});
    }
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripEdit 
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
    currentTrip: state.trips.currentTrip,
    currentTripIndicator: state.trips.currentTripFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailScreen);