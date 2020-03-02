import React, {useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import SplashScreen from 'react-native-splash-screen';
import {SampleProvider, SampleFunctionProvider} from '~/Context/Sample';
import {UserContextProvider} from '~/Context/UserContext';
import firebase from 'react-native-firebase';

const notification = new firebase.notifications.Notification()
  .setNotificationId('notificationId')
  .setTitle('My notification title')
  .setBody('My notification body')
  .setData({
    key1: 'value1',
    key2: 'value2',
  });

const App = () => {
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('enabled');
    } else {
      console.log('disabled');
    }

    try {
      await firebase.messaging().requestPermission();
      console.log('auth');
    } catch (error) {
      console.log('no auth');
    }
  };

  useEffect(() => {
    checkPermission();

    const removeNotificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        console.log('display');
        notification.ios.setBadge(2);
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      });
    const removeNotificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('received');
        notification.ios.setBadge(2);
        // Process your notification as required
      });
    SplashScreen.hide();
  }, []);
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </UserContextProvider>
  );
};

export default App;
