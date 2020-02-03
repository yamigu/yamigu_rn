import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';

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

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashLoading: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
