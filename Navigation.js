/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SideMenu from '~/components/MainScreen/SideMenu';
import ProfileDetailScreen from '~/screens/ProfileDetailScreen';
import IVScreen from '~/screens/IVScreen';
import WebViewScreen from '~/screens/WebViewScreen';
import ChattingListScreen from '~/screens/ChattingListScreen';
import ChattingScreen from '~/screens/ChattingScreen';
import SignupScreen from '~/screens/SignupScreen';
import MeetingSettingScreen from '~screens/MeetingSettingScreen';
import BVScreen from '~/screens/BVScreen';
import NoticeScreen from '~/screens/NoticeScreen';
import GuideScreen from '~/screens/GuideScreen';
import TermsScreen from '~/screens/TermsScreen';
import PrivacyScreen from '~/screens/PrivacyScreen';
import MyProfileScreen from '~/screens/MyProfileScreen';
import AddFriendsScreen from '~/screens/AddFriendsScreen';
import StoreScreen from '~/screens/StoreScreen';
import ShieldScreen from '~/screens/ShieldScreen';
import SettingScreen from '~/screens/SettingScreen';
import HomeGuideScreen from '~/screens/HomeGuideScreen';

const deviceWidth = Dimensions.get('window').width;

const AppStack = createStackNavigator({
  Main: {
    screen: MainScreen, // MainScreen 컴포넌트를 네비게이터에 등록
  },

  Profile: {
    screen: ProfileDetailScreen,
  },
  ChattingList: {
    screen: ChattingListScreen,
  },
  Chatting: {
    screen: ChattingScreen,
  },
  MyProfile: {
    screen: MyProfileScreen,
  },
  AddFriends: {
    screen: AddFriendsScreen,
  },
  Store: {
    screen: StoreScreen,
  },
  Shield: {
    screen: ShieldScreen,
  },
  Setting: {
    screen: SettingScreen,
  },
  MeetingSetting: {
    screen: MeetingSettingScreen,
  },
  BV: {
    screen: BVScreen,
  },
  Notice: {
    screen: NoticeScreen,
  },
  Guide: {
    screen: GuideScreen,
  },
  Terms: {
    screen: TermsScreen,
  },
  Privacy: {
    screen: PrivacyScreen,
  },
  HomeGuideScreen: {
    screen: HomeGuideScreen,
  },
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  IV: {
    screen: IVScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  WebView: {
    screen: WebViewScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
});

const DrawerStack = createDrawerNavigator(
  {
    Main: {
      name: 'MainStack',
      screen: AppStack,
    },
    Auth: {
      name: 'AuthStack',
      screen: AuthStack,
    },
  },
  {
    contentComponent: SideMenu,
    edgeWidth: -100, // this is where the magic happens :))
    drawerWidth: deviceWidth * 0.813,
  },
);

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      Chat: ChattingScreen,
      App: DrawerStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

export default Navigation;
