import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripList from '../../components/TripList/TripList';
import CommonStyles from '../../lib/CommonStyles';
import AddButton from '../../components/AddButton/AddButton';
import moment from 'moment';

export default class TripsScreen extends Component{
  constructor(props){
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    const itemAdd = {
      title: '', 
      active: false,
      date: moment(), 
      locations: []
    };
    return {
      header: (
        <View>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Trips</Text>
          </View>
          <AddButton 
              destination={'trips'} 
              item={itemAdd}
          />
        </View>
      )
    }
  };
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            <TripList navigation={this.props.navigation}/>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column',
    flex: 1
  },
  header: {
    height: 55,
    backgroundColor: CommonStyles.colorPrimary,
    justifyContent: 'center',
    paddingLeft: 16,
    elevation: 2
  },
  headerTitle: {
    color: CommonStyles.lightText.primary,
    fontWeight: 'normal',
    fontSize: 16
  }
});

AppRegistry.registerComponent('TripsScreen', () => TripsScreen);