import React from 'react';
import { TabNavigator, StackNavigator, TabView } from 'react-navigation';

import DirectionsScreen from '../screens/DirectionsScreen/DirectionsScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import TripsScreen from '../screens/TripsScreen/TripsScreen';
import CommonStyles from '../modules/CommonStyles/CommonStyles';

export const Tabs = TabNavigator({
  TripsScreen: {
    screen: TripsScreen,
  },
  MapScreen: {
    screen: MapScreen
  },
  DirectionsScreen: {
    screen: DirectionsScreen,
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
        backgroundColor: CommonStyles.colorPrimary700,
        paddingVertical: 5,
      },
      indicatorStyle: {
        backgroundColor: CommonStyles.colorAccent
      }
    }
  }
);

export const Root = StackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  Tabs: {
    screen: Tabs
  }
},
  {
    headerMode: 'screen'
  }
);
