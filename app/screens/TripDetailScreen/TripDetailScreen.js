import React, {Component} from 'react';
import {AppRegistry, View, Text, Navigator, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Backend } from '../../modules/Backend/Backend';
import StatusBarComponent from '../../components/StatusBarComponent/StatusBarComponent';
import TripEdit from '../../components/TripEdit/TripEdit';
import Logout from '../../components/Logout/Logout';
import AddButton from '../../components/AddButton/AddButton';
import Gradient from '../../components/Gradient/Gradient';
import CommonStyles from '../../modules/CommonStyles/CommonStyles';

export default class TripDetailScreen extends Component{
  static navigationOptions = {
    title: 'TripDetails',
    header: (navigation) => ({
      style: {
        elevation: 0
      },
      tintColor: CommonStyles.colorPrimary50Text,
      titleStyle: {
        color: CommonStyles.colorPrimary50Text,
        fontFamily: CommonStyles.fontPrimary
      }
    }),
    tabBar: {
      label: 'Trips',
      icon: ({ tintColor }) => <Icon name="playlist-add" size={25} color={tintColor} />
    },
  }
  render(){
    return(
    		<View style={styles.screen}>
            <StatusBarComponent/>
            
            <TripEdit 
              params={this.props.navigation.state.params}
              navigation={this.props.navigation}
            />
            <AddButton/>
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

AppRegistry.registerComponent('TripDetailScreen', () => TripDetailScreen);