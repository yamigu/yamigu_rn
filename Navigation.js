import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import SideBar from '~/components/MainScreen/SideBar';
import IVScreen from '~/screens/IVScreen';
import WebViewScreen from '~/screens/WebViewScreen';

const AppStack = createStackNavigator({
  Main: {
    screen: MainScreen, // MainScreen 컴포넌트를 네비게이터에 등록
  },
});
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      // title: 'Login',
      headerShown: false,
    },
  },
});

const DrawerStack = createDrawerNavigator(
  {
    Main: {
      name: 'MainStack',
      screen: AppStack,
    },
  },
  {
    contentComponent: SideBar,
  },
);
const IVStack = createStackNavigator({
  IV: {
    screen: IVScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const WebViewStack = createStackNavigator({
  WebView: {
    screen: WebViewScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      SplashLoading: SplashScreen,
      App: DrawerStack,
      Auth: AuthStack,
      IV: IVStack,
      WebView: WebViewStack,
    },
    {
      initialRouteName: 'IV',
    },
  ),
);

export default Navigation;
