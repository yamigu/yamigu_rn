import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import SplashScreen from 'react-native-splash-screen';
import {SampleProvider, SampleFunctionProvider} from '~/Context/Sample';
import {UserContextProvider} from '~/Context/UserContext';
import firebase from 'react-native-firebase';
import {StatusBar} from 'react-native';

const notification = new firebase.notifications.Notification()
  .setNotificationId('notificationId')
  .setTitle('My notification title')
  .setBody('My notification body')
  .setData({
    key1: 'value1',
    key2: 'value2',
  });
// const listenForOpen = async () => {
//   const notificationOpen = await firebase
//     .notifications()
//     .getInitialNotification();
//   let data = null;
//   if (notificationOpen) {
//     console.log('initialize by click noti!');
//     if (Platform.OS === 'android') {
//       console.log(notificationOpen);
//       console.log(notificationOpen.notification._android._notification._data);
//       return notificationOpen.notification._android._notification._data;
//     }
//     return data;
//   }
// };
const App = () => {
  const [screenPropData, setScreenPropData] = useState(null);
  const check_fcm_permission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    console.log('check fcm permission');
    if (enabled) {
      console.log('fcm - user has permissions');
    } else {
      console.log("fcm - user doesn't have permission");
      try {
        await firebase.messaging().requestPermission();
        console.log('fcm - User has authorised');
      } catch (error) {
        console.log('fcm - User has rejected permissions');
      }
    }
  };
  useEffect(() => {
    SplashScreen.hide();
    check_fcm_permission();
    // background message listener
    const messageListener = firebase.messaging().onMessage(message => {
      console.log(message);
    });
    const removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('onNotification', notification);
      });

    const removeNotificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // console.log('onNotificationOpened', notificationOpen);
        setScreenPropData(notificationOpen);
      });
    const removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        console.log('display');
        notification.ios.setBadge(2);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    // const data = listenForOpen();
    // console.log(data);
    // setScreenPropsData({notidata: data});
    return () => {
      console.log('unmount yamigu');
      removeNotificationDisplayedListener();
      removeNotificationListener();
      removeNotificationOpenedListener();
    };
  }, []);
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <Navigation screenProps={screenPropData} />
        </View>
      </SafeAreaProvider>
    </UserContextProvider>
  );
};

export default App;
