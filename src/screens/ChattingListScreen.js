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
  const [hasVerified, setHasVerified] = useState(0);

  const getUserVal = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
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
    setHasVerified(jUserValue[global.config.user_info_const.VERIFIED]);
    return true;
  };

  useEffect(() => {
    getUserVal();
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
