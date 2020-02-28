/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon, Content} from 'native-base';
import ChattingList from '~/components/ChattingListScreen/ChattingList';
import ReceivedList from '~/components/ChattingListScreen/ReceivedList';
import {HeaderBackButton} from 'react-navigation-stack';
import firebase from 'react-native-firebase';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const ChattingListScreen = ({navigation}) => {
  const [ref, setRef] = useState(null);
  const [hasVerified, setHasVerified] = useState(0);

  const getUserVal = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    if (jUserValue[0] === 'token') {
      console.log('jUserValue[1]');
      Alert.alert(
        '로그인 및 회원가입이 필요한 서비스입니다.',
        '',
        () => {
          navigation.pop();
          navigation.navigate('Login');
        },
        '',
      );
      return false;
    } else if (jUserValue[2] === 'nickname') {
      console.log('jUserValue[1]');
      Alert.alert(
        '로그인 및 회원가입이 필요한 서비스입니다.',
        '',
        () => navigation.navigate('Signup'),
        '',
      );
    } else if (jUserValue[4] === 'birthdate') {
      Alert.alert(
        '로그인 및 회원가입이 필요한 서비스입니다.',
        '',
        () => navigation.navigate('IV', {needBtn: true}),
        '',
      );
    }
    return true;
  };

  useEffect(() => {
    getUserVal().then(result => {
      if (result) {
        axios
          .get(
            'http://13.124.126.30:8000/authorization/user/belong_verification/',
          )
          .then(result => setHasVerified(result.data.verified));

        axios
          .get('http://13.124.126.30:8000/authorization/firebase/token/')
          .then(result => {
            const token = result.data;
            // console.log(token);
            return token;
          })
          .catch(error => console.log(error))
          .then(token => {
            firebase.auth().signInWithCustomToken(token);

            setRef(firebase.database().ref());
            firebase
              .database()
              .ref('message')
              .on('child_added', snapshot => {
                // console.log(snapshot.val());
              });
          });
      } else {
        console.log(result);
      }
    });
  }, []);
  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <ReceivedList hasVerified={hasVerified} navigation={navigation} />
      <ChattingList
        hasVerified={hasVerified}
        style={{marginTop: 12}}
        navigation={navigation}
      />
    </Content>
  );
};

ChattingListScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor={palette.black}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <Image
      style={{width: 25, height: 22}}
      source={require('~/images/chat_bubble_orange_icon.png')}
    />
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
});
export default ChattingListScreen;
