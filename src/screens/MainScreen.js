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
import AsyncStorage from '@react-native-community/async-storage';

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
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return <Image source={require('~/images/feed_icon.png')} />;
          } else {
            return (
              <Image source={require('~/images/feed_icon_nonselected.png')} />
            );
          }
        },
        tabBarOnPress: async ({navigation, defaultHandler}) => {
          console.log('onPress:');
          const userValue = await AsyncStorage.getItem('userValue');
          const jUserValue = JSON.parse(userValue);
          if (jUserValue[0] === 'token') {
            navigation.navigate('Login');
          } else if (jUserValue[2] === 'nickname') {
            navigation.navigate('Signup');
            //navigate to loginscreen
          } else if (jUserValue[4] === 'birthdate') {
            navigation.navigate('IV', {needBtn: true});
          }
          // 'token',     'uid',        'nickname',   'avata',
          // 'birhdate',  'belong',     'department', 'profile_list',
          // 'feed_list', 'friend_list','yami_number',

          defaultHandler();
        },
      }),
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
