import React from 'react';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DirectionsScreen from '../containers/DirectionsScreen/DirectionsScreen';
import LoginScreen from '../containers/LoginScreen/LoginScreen';
import MapScreen from '../containers/MapScreen/MapScreen';
import TripsScreen from '../containers/TripsScreen/TripsScreen';
import TripDetailScreen from '../containers/TripDetailScreen/TripDetailScreen';
import LocationScreen from '../containers/LocationScreen/LocationScreen';
import CommonStyles from '../lib/CommonStyles';

export const TripsStack = StackNavigator({
  TripsScreen: {
    screen: TripsScreen,
    navigationOptions: () => ({
      title: 'Add New Trips'
    })
  },
  TripDetailScreen: {
    screen: TripDetailScreen
  },
  LocationScreen: {
    screen: LocationScreen
  }
},
  {
    headerMode: 'screen',
    navigationOptions: {
      headerTitleStyle: {
        color: CommonStyles.lightText.primary,
        fontWeight: 'normal'
      },
      headerStyle: {
        backgroundColor: CommonStyles.colorPrimary,
        elevation: 2
      },
      headerTintColor: CommonStyles.white
    }
  }
);

export const Tabs = TabNavigator({
  TripsStack: {
    screen: TripsStack,
    navigationOptions: () => ({
      title: 'Trips',
      tabBarLabel: 'Trips',
      tabBarIcon: () => <Icon name="playlist-add" size={25} color={CommonStyles.lightText.primary}/>
    }),
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: () => ({
      title: 'Map',
      tabBarLabel: 'Map',
      tabBarIcon: () => <Icon name="map" size={25} color={CommonStyles.lightText.primary}/>
    }),
  },
  DirectionsScreen: {
    screen: DirectionsScreen,
    navigationOptions: () => ({
      title: 'Directions',
      tabBarLabel: 'Directions',
      tabBarIcon: () => <Icon name="directions" size={25} color={CommonStyles.lightText.primary}/>
    }),
  }
}, {
    headerMode: 'card',
    swipEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      upperCaseLabel: true,
      inactiveTintColor: CommonStyles.lightText.secondary,
      activeTintColor: CommonStyles.lightText.primary,
      pressColor: CommonStyles.lightText.secondary,
      labelStyle: {
        padding: 0,
        margin: 0,
        fontSize: 12
      },
      style: {
        backgroundColor: CommonStyles.colorPrimary,
        elevation: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: CommonStyles.lightText.dividers,
      },
      indicatorStyle: {
        backgroundColor: CommonStyles.colorAccent,
        display: 'none'
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
    headerMode: 'none',
  }
);
