import React from 'react';
import {Text, View, Dimensions, Alert} from 'react-native';
import {Button} from 'native-base';
import palette from '~/lib/styles/palette';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import {HeaderBackButton} from 'react-navigation-stack';
import axios from 'axios';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import KakaoLogins from '@react-native-seoul/kakao-login';

const dw = Dimensions.get('window').width;

const initUserValue = [
  'token',
  'uid',
  'nickname',
  'avata',
  'birthdate',
  'belong',
  'department',
  'gender',
  'verified',
  'yami',
  'location',
  'height',
];
const GetoutScreen = ({navigation}) => {
  const logout = () => {
    return new Promise(async (resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = '';
      AsyncStorage.setItem('userValue', JSON.stringify(initUserValue));
      try {
        await KakaoLogins.logout();
      } catch {
        await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGOUT,
        });
      }
      resolve(true);
    });
  };
  const requestWithdraw = () => {
    axios
      .post('http://13.124.126.30:8000/authorization/withdraw/')
      .then(async result => {
        await logout();
        navigation.dispatch(
          StackActions.reset({
            key: null,
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Main'})],
          }),
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={{padding: 18, marginTop: 10}}>
      <CustomTextMedium size={18} color="black">
        계정 탈퇴
      </CustomTextMedium>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 15}}>
        <CustomTextRegular size={16} color={palette.gray}>
          정말 탈퇴하시겠어요?
        </CustomTextRegular>
        <CustomTextRegular size={16} color={palette.gray}>
          구매한 모든 야미와 모든 정보가 삭제됩니다!
        </CustomTextRegular>
        <Button
          onPress={() => {
            Alert.alert(
              '계정을 정말 탈퇴하시겠어요?',
              '야미구 이용해주셔서 감사했습니다.',
              [
                {
                  text: '취소',
                },
                {
                  text: '탈퇴하기',
                  onPress: () => requestWithdraw(),
                  style: 'destructive',
                },
              ],
            );
          }}
          style={{
            marginTop: 20,
            backgroundColor: '#FF8826',
            width: dw * 0.9,
            height: 50,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <CustomTextMedium size={16} color="white">
            탈퇴하기
          </CustomTextMedium>
        </Button>
      </View>
    </View>
  );
};

GetoutScreen.navigationOptions = ({navigation}) => ({
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
    <CustomTextMedium size={16} color={palette.black}>
      계정 탈퇴
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});
export default GetoutScreen;
