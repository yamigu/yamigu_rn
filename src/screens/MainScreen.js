/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Icon, View} from 'native-base';
import {Image} from 'react-native';
import Materialicon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '~/lib/styles/palette';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomePage from '~/components/MainScreen/HomePage/HomePage';
import FeedPage from '~/components/MainScreen/FeedPage/FeedPage';
import {createAppContainer} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import axios from 'axios';
import firebase, {storage} from 'react-native-firebase';
import ChattingIcon from '~/components/MainScreen/ChattingIcon';
import {DrawerActions} from 'react-navigation-drawer';

const MainScreenNavigator = createBottomTabNavigator(
  {
    Home: {
      onPress: () => {
        console.log('zzzzz');
      },
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return (
              <Image
                style={{width: 30, height: 25}}
                source={require('~/images/homepage_tab_selected.png')}
              />
            );
          } else {
            return (
              <Image
                style={{width: 30, height: 25}}
                source={require('~/images/homepage_tab.png')}
              />
            );
          }
        },
      },
    },
    Feed: {
      screen: FeedPage,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/feed_icon.png')}
              />
            );
          } else {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/feed_icon_nonselected.png')}
              />
            );
          }
        },
        tabBarOnPress: async ({navigation, defaultHandler}) => {
          const userValue = await AsyncStorage.getItem('userValue');
          const jUserValue = JSON.parse(userValue);
          if (jUserValue[0] === 'token') {
            navigation.navigate('Login');
          } else if (jUserValue[2] === 'nickname') {
            navigation.navigate('Signup');
            //navigate to loginscreen
          } else if (jUserValue[4] === 'birthdate') {
            navigation.navigate('IV', {needBtn: true});
          } else {
            defaultHandler();
          }

          // 'token',     'uid',        'nickname',   'avata',
          // 'birhdate',  'belong',     'department', 'profile_list',
          // 'feed_list', 'friend_list','yami_number',
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
      inactiveTintColor: palette.black,
      upperCaseLabel: false,
      showLabel: false,
      showIcon: true,
    },
  },
);

const MainScreen = createAppContainer(MainScreenNavigator);

MainScreen.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableByPlatform
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon
            name="menu"
            style={{
              color: palette.black,
              margin: 10,
            }}
          />
        </TouchableByPlatform>
      </View>
    ),
    headerTitle: () => (
      <Image
        style={{width: 83, height: 20}}
        source={require('~/images/yamigu_logo_icon.png')}
      />
    ),
    headerRight: () => <ChattingIcon navigation={navigation} />,
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleAlign: 'center',
  };
};

export default MainScreen;
