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
import Spinner from 'react-native-loading-spinner-overlay';
const ChattingListScreen = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [receivedList, setReceivedList] = useState([]);
  const [hasVerified, setHasVeirifed] = useState(0);
  const [loading, setLoading] = useState(true);
  const getUserVal = () => {
    return new Promise(async (resolve, reject) => {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      setUserInfo(jUserValue);
      if (
        jUserValue[global.config.user_info_const.TOKEN] === null ||
        jUserValue[global.config.user_info_const.TOKEN] === '' ||
        jUserValue[global.config.user_info_const.TOKEN] === undefined ||
        jUserValue[global.config.user_info_const.TOKEN] === 'token'
      ) {
        Alert.alert('로그인 및 회원가입이 필요한 서비스입니다.', '', [
          {
            onPress: () => {
              navigation.pop();
              navigation.navigate('Login');
            },
          },
        ]);
        resolve(false);
      } else if (
        jUserValue[global.config.user_info_const.NICKNAME] === null ||
        jUserValue[global.config.user_info_const.NICKNAME] === '' ||
        jUserValue[global.config.user_info_const.NICKNAME] === undefined ||
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
        resolve(false);
      } else if (
        jUserValue[global.config.user_info_const.BIRTHDATE] === null ||
        jUserValue[global.config.user_info_const.BIRTHDATE] === '' ||
        jUserValue[global.config.user_info_const.BIRTHDATE] === undefined ||
        jUserValue[global.config.user_info_const.BIRTHDATE] === 'birthdate'
      ) {
        Alert.alert('소속인증이 필요한 서비스입니다.', '', [
          {
            onPress: () => {
              navigation.pop();
              navigation.navigate('IV', {needBtn: true});
            },
          },
        ]);
      }
      setHasVeirifed(jUserValue[global.config.user_info_const.VERIFIED]);
      resolve(jUserValue);
    });
  };

  useEffect(() => {
    const listener = navigation.addListener('didFocus', async () => {
      console.log('getUserval');
      const result = await getUserVal();
      if (!result) {
        setLoading(false);
        return;
      }
      const result2 = await retrieveChatList(result);
    });
    return () => listener.remove();
  }, []);
  const getChatList = userValue => {
    return new Promise(resolve => {
      axios.get(global.config.api_host + 'core/chat/').then(result => {
        const chatlist_data = [];
        const recvlist_data = [];
        setChatList([]);
        setReceivedList([]);
        console.log(result.data);
        result.data.chat_list.map(item => {
          if (
            item.sender.uid !== userValue[global.config.user_info_const.UID] ||
            item.approved_on !== null
          ) {
            let partner;
            if (
              item.sender.uid === userValue[global.config.user_info_const.UID]
            ) {
              partner = item.receiver;
            } else {
              partner = item.sender;
            }
            item.partner = partner;
            item.uid = partner.uid;
            item.chat_type === 0
              ? chatlist_data.push(item)
              : recvlist_data.push(item);
          }
        });
        setChatList(chatlist_data);
        setReceivedList(recvlist_data);
        resolve(true);
      });
    }).catch(error => {
      resolve(false);
    });
  };
  const retrieveChatList = async userValue => {
    const result = await getChatList(userValue);
    setLoading(false);

    return result;
  };
  //   useEffect(() => {
  //     console.log('useeffect by userInfo');
  //     setLoading(true);
  //     if (
  //       userInfo === null ||
  //       userInfo[global.config.user_info_const.NICKNAME] === null ||
  //       userInfo[global.config.user_info_const.NICKNAME] === '' ||
  //       userInfo[global.config.user_info_const.NICKNAME] === undefined ||
  //       userInfo[global.config.user_info_const.NICKNAME] === 'nickname'
  //     ) {
  //       setLoading(false);
  //       return;
  //     }
  //     retrieveChatList();
  //   }, [userInfo]);
  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <Spinner
        visible={loading}
        textStyle={{color: 'white'}}
        textContent={'채팅 목록 불러오는중...'}
      />
      <ReceivedList
        uid={userInfo[global.config.user_info_const.UID]}
        hasVerified={hasVerified}
        style={{marginTop: 12}}
        navigation={navigation}
        chatList={receivedList}
      />
      <ChattingList
        uid={userInfo[global.config.user_info_const.UID]}
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
  drawerLockMode: 'locked-closed',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
});
export default ChattingListScreen;
