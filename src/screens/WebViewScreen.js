import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StyleSheet, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview'; // for webview
import AsyncStorage from '@react-native-community/async-storage';

import '~/config';
const WebViewScreen = ({navigation}) => {
  const [verifyFlag, setVerifyFlag] = useState(0);
  const [uid, setUID] = useState('');
  // maybe, will be changed to context
  const getUserInfo = async () => {
    const value = await AsyncStorage.getItem('userValue');
    const userInfo = JSON.parse(value);
    setUID(userInfo[global.config.user_info_const.UID]);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const checkSuccess = checkObj => {
    const checkString = checkObj.nativeEvent.url;
    const substring = 'success';
    if (checkString.indexOf(substring) > -1) {
      setVerifyFlag(1, console.log('flag : ' + verifyFlag));
      //set flag to 1 if verification successed
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: 'http://13.124.126.30:5000/checkplus_main?uid=' + uid}}
        // url to nice verification page
        onLoadEnd={e => {
          setVerifyFlag(0, console.log('flag : ' + verifyFlag));
          checkSuccess(e);
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;
