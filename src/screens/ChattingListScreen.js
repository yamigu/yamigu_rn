/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Alert} from 'react-native';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon, Content} from 'native-base';
import ChattingList from '~/components/ChattingListScreen/ChattingList';
import ReceivedList from '~/components/ChattingListScreen/ReceivedList';
import {HeaderBackButton} from 'react-navigation-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';
const ChattingListScreen = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [receivedList, setReceivedList] = useState([]);
  const [hasVerified, setHasVeirifed] = useState(0);
  const getUserVal = () => {
    return new Promise(async (resolve, reject) => {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      setUserInfo(jUserValue);
      if (jUserValue[global.config.user_info_const.TOKEN] === 'token') {
        Alert.alert('로그인 및 회원가입이 필요한 서비스입니다.', '', [
          {
            onPress: () => {
              navigation.pop();
              navigation.navigate('Login');
            },
          },
        ]);
        return false;
      } else if (
        jUserValue[global.config.user_info_const.NICKNAME] === 'nickname'
      ) {
        Alert.alert('로그인 및 회원가입이 필요한 서비스입니다.', '', [
          {
            onPress: () => {
              navigation.pop();
              navigation.navigate('Signup');
            },
          },
        ]);
      } else if (
        jUserValue[global.config.user_info_const.BIRTHDATE] === 'birthdate'
      ) {
        Alert.alert('로그인 및 회원가입이 필요한 서비스입니다.', '', [
          {
            onPress: () => {
              navigation.pop();
              navigation.navigate('IV');
            },
          },
        ]);
      }
      setHasVeirifed(jUserValue[global.config.user_info_const.VERIFIED]);
      resolve(true);
    });
  };

  useEffect(() => {
    const listener = navigation.addListener('didFocus', () => {
      getUserVal().then(result => {
        if (!result) return;
      });
    });
    return () => listener.remove();
  }, []);
  useEffect(() => {
    if (userInfo.length === 0) return;
    axios.get('http://13.124.126.30:8000/core/chat/').then(result => {
      const chatlist_data = [];
      const recvlist_data = [];
      result.data.chat_list.map(item => {
        if (
          item.sender.uid !== userInfo[global.config.user_info_const.UID] ||
          item.approved_on !== null
        ) {
          let partner;
          if (item.sender.uid === userInfo[global.config.user_info_const.UID]) {
            partner = item.receiver;
          } else {
            partner = item.sender;
          }
          console.log(partner);
          item.nickname = partner.nickname;
          item.avata = partner.avata;
          item.chat_type === 0
            ? chatlist_data.push(item)
            : recvlist_data.push(item);
        }
      });
      setChatList(chatlist_data);
      setReceivedList(recvlist_data);
    });
  }, [userInfo]);
  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <ReceivedList
        hasVerified={hasVerified}
        navigation={navigation}
        chatList={receivedList}
      />
      <ChattingList
        hasVerified={hasVerified}
        style={{marginTop: 12}}
        navigation={navigation}
        chatList={chatList}
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
