/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Icon, View} from 'native-base';
import {Image} from 'react-native';
import Materialicon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '~/lib/styles/palette';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '~/components/MainScreen/HomePage/HomePage';
import FeedPage from '~/components/MainScreen/FeedPage/FeedPage';
import {createAppContainer} from 'react-navigation';

const MainScreenNavigator = createBottomTabNavigator(
  {
    Home: {
      onPress: () => {
        console.log('zzzzz');
      },
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" size={30} style={{color: tintColor}} />
        ),
      },
    },
    Feed: {
      screen: FeedPage,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return <Image source={require('~/images/feed_icon.png')} />;
          } else {
            return (
              <Image source={require('~/images/feed_icon_nonselected.png')} />
            );
          }
        },
        // <Materialicon name="timeline" size={30} style={{color: tintColor}} />
      },
    },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: 'white',
      },
      activeTintColor: palette.black,
      inactiveTintColor: palette.nonselect,
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true,
    },
  },
);

const MainScreen = createAppContainer(MainScreenNavigator);

export default MainScreen;
