import React from 'react';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DirectionsScreen from '../screens/DirectionsScreen/DirectionsScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import TripsScreen from '../screens/TripsScreen/TripsScreen';
import TripDetailScreen from '../screens/TripDetailScreen/TripDetailScreen';
import CommonStyles from '../modules/CommonStyles/CommonStyles';

export const TripsStack = StackNavigator({
  TripsScreen: {
    screen: TripsScreen,
    navigationOptions: () => ({
      title: 'Trips',
      tabBarLabel: 'Trips'
    })
  },
  TripDetailScreen: {
    screen: TripDetailScreen
  }
},
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTitleStyle: {
        color: CommonStyles.colorPrimary900,
        fontFamily: 'Roboto'
      },
      headerStyle: {
        backgroundColor: CommonStyles.colorPrimary900Text,
        margin: 5,
        elevation: 2
      },
      headerTintColor: CommonStyles.colorPrimary900
    }
  }
);

export const Tabs = TabNavigator({
  TripsStack: {
    screen: TripsStack,
    navigationOptions: () => ({
      title: 'Trips',
      tabBarLabel: 'Trips',
      tabBarIcon: () => <Icon name="playlist-add" size={25} color={CommonStyles.colorPrimary900Text}/>
    }),
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: () => ({
      title: 'Map',
      tabBarLabel: 'Map',
      tabBarIcon: () => <Icon name="map" size={25} color={CommonStyles.colorPrimary900Text}/>
    }),
  },
  DirectionsScreen: {
    screen: DirectionsScreen,
    navigationOptions: () => ({
      title: 'Directions',
      tabBarLabel: 'Directions',
      tabBarIcon: () => <Icon name="directions" size={25} color={CommonStyles.colorPrimary900Text}/>
    }),
  }
}, {
    headerMode: 'card',
    swipEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      upperCaseLabel: false,
      inactiveTintColor: CommonStyles.colorAccentText,
      activeTintColor: CommonStyles.colorAccentText,
      pressColor: CommonStyles.colorAccent20P,
      style: {
        backgroundColor: CommonStyles.colorPrimary800,
        paddingVertical: 5
      },
      indicatorStyle: {
        backgroundColor: CommonStyles.colorAccent
      }
    }
  }
);

export const Root = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: 'Login',
      tabBarVisible: false,
      headerVisible: false
    })
  },
  Tabs: {
    screen: Tabs
  }
},
  {
    headerMode: 'none'
  }
);
