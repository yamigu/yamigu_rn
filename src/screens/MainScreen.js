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
      onPress: () => {},
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/nav_home_icon_selected.png')}
              />
            );
          } else {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/nav_home_icon.png')}
              />
            );
          }
        },
      },
    },

    Feed: {
      lazy: true,
      screen: FeedPage,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => {
          if (focused === true) {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/nav_feed_icon_selected.png')}
              />
            );
          } else {
            return (
              <Image
                style={{width: 30, height: 30}}
                source={require('~/images/nav_feed_icon.png')}
              />
            );
          }
        },
        tabBarOnPress: async ({navigation, defaultHandler}) => {
          const userValue = await AsyncStorage.getItem('userValue');
          const jUserValue = JSON.parse(userValue);
          if (jUserValue[0] === 'token') {
            navigation.navigate('Login');
          } else if (
            jUserValue[2] === 'nickname' ||
            jUserValue[2] === null ||
            jUserValue[2] === ''
          ) {
            navigation.navigate('Signup');
            //navigate to loginscreen
          } else if (
            jUserValue[4] === 'birthdate' ||
            jUserValue[4] === '' ||
            jUserValue[4] === null
          ) {
            navigation.navigate('IV', {needBtn: true});
          } else {
            defaultHandler();
          }

          // 'token',     'uid',        'nickname',   'avata',
          // 'birhdate',  'belong',     'department', 'profile_list',
          // 'feed_list', 'friend_list','yami_number',
        },
        tabBarOnLongPress: async ({navigation, defaultHandler}) => {
          const userValue = await AsyncStorage.getItem('userValue');
          const jUserValue = JSON.parse(userValue);
          if (jUserValue[0] === 'token') {
            navigation.navigate('Login');
          } else if (
            jUserValue[2] === 'nickname' ||
            jUserValue[2] === null ||
            jUserValue[2] === ''
          ) {
            navigation.navigate('Signup');
            //navigate to loginscreen
          } else if (
            jUserValue[4] === 'birthdate' ||
            jUserValue[4] === '' ||
            jUserValue[4] === null
          ) {
            navigation.navigate('IV', {needBtn: true});
          } else {
            defaultHandler();
          }
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
          // backgroundColor: palette.blue,
          borderRadius: 20,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 0,
        }}>
        <TouchableByPlatform
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon
            name="menu"
            style={{
              size: 20,
              color: palette.black,
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
