import React from 'react';
import {Dimensions, Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
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
import MyProfileScreen from '~/screens/MyProfileScreen';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon} from 'native-base';
import palette from '~/lib/styles/palette';

const deviceWidth = Dimensions.get('window').width;

const AppStack = createStackNavigator({
  Main: {
    screen: MainScreen, // MainScreen 컴포넌트를 네비게이터에 등록
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (
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
      ),
      headerTitle: () => (
        <Image source={require('~/images/yamigu-logo-text.png')} />
      ),
      headerRight: () => (
        <TouchableByPlatform
          onPress={() => navigation.navigate('ChattingList')}>
          <Image
            source={require('~/images/chat-bubble-outline.png')}
            style={{
              margin: 10,
            }}
          />
        </TouchableByPlatform>
      ),
      headerMode: 'screen',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTitleAlign: 'center',
    }),
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
    drawerWidth: deviceWidth * 0.813,
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
