import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import SideMenu from '~/components/MainScreen/SideMenu';
import ProfileDetailScreen from '~/screens/ProfileDetailScreen';
import IVScreen from '~/screens/IVScreen';
import WebViewScreen from '~/screens/WebViewScreen';
import ChattingListScreen from '~/screens/ChattingListScreen';
import ChattingScreen from '~/screens/ChattingScreen';
import SignupScreen from '~/screens/SignupScreen';

const AppStack = createStackNavigator({
  Main: {
    screen: MainScreen, // MainScreen 컴포넌트를 네비게이터에 등록
  },
  Profile: {
    screen: ProfileDetailScreen,
  },
  ChattingList: {
    screen: ChattingListScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
  Chatting: {
    screen: ChattingScreen,
    navigationOptions: {
      headerShown: true,
    },
  },
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
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
  },
);

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      App: DrawerStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);

export default Navigation;
