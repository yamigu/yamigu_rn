/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {Button, Input, Content} from 'native-base';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAvoidingView} from 'react-native';
import firebase from 'react-native-firebase';
import Moment from 'moment';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const SendChatting = ({avata, uid, setModalVisible, navigation}) => {
  // axios.get().then((result)=>console.log(result.data));
  const [focused, setFocused] = useState(false);

  const [inputText, setInputText] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const gotoBot = () => {};

  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('userValue');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  const makeChat = () => {
    getStorage().then(result => {
      if (result[9] < 3) {
        Alert.alert(
          '야미가 부족합니다.',
          '스토어에서 야미를 구입하시겠어요?',
          [
            {text: '취소'},
            {
              text: '스토어 가기',
              onPress: () => {
                navigation.navigate('Store');
                setModalVisible(false);
              },
            },
          ],
          '',
        );
      } else {
        requestChat();
      }
    });
  };

  useEffect(() => {
    retrieveUserInfo();
  }, []);

  const retrieveUserInfo = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    setUserInfo(jUserValue);
  };
  const requestChatCreate = () => {
    return new Promise(resolve => {
      axios
        .post('http://13.124.126.30:8000/core/chat/', {
          target_uid: uid,
          greet: inputText === '' ? '안녕하세요' : inputText,
        })
        .then(result => {
          userInfo[global.config.user_info_const.YAMI] -= 3;
          AsyncStorage.setItem('userValue', JSON.stringify(userInfo));

          Alert.alert(
            '신청이 완료되었습니다!',
            '',
            [{text: '확인', onPress: () => setModalVisible(false)}],
            '',
          );
          resolve(result);
        })
        .catch(error => {
          if (error.response.data == 'No yami') {
            Alert.alert('야미가 부족해요!', '', [
              {
                text: '확인',
                onPress: () => {
                  setModalVisible(false);
                },
              },
            ]);
          } else {
            Alert.alert('이미 대화중인 상대에요', '', [
              {
                text: '확인',
                onPress: () => {
                  setModalVisible(false);
                },
              },
            ]);
          }
          resolve(null);
        });
    });
  };
  const sendFCM = roomId => {
    return new Promise(resolve => {
      try {
        const key = firebase
          .database()
          .ref('message/' + roomId)
          .push().key;
        firebase
          .database()
          .ref('message/' + roomId)
          .child(key)
          .update({
            key: key,
            idSender: userInfo[global.config.user_info_const.UID],
            message: inputText === '' ? '안녕하세요' : inputText,
            time: Moment.now(),
          });
        firebase
          .database()
          .ref('user/' + uid + '/chat/' + roomId)
          .update({is_unread: true});
        resolve(key);
      } catch (e) {
        console.log(e);
        resolve(e);
      }
    });
  };
  const requestChat = async () => {
    const result = await requestChatCreate();
    if (result === null) return;
    const result2 = sendFCM(result.data.id);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: dh,
        width: dw,
        backgroundColor: 'rgba(0,0,0,0.7)',

        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: 30,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Button
          transparent
          style={{elevation: 0, padding: 30}}
          onPress={() => {
            if (
              inputText === '' ||
              inputText === null ||
              inputText === undefined
            ) {
              setModalVisible(false);
            } else {
              Alert.alert(
                '대화 신청을 취소할까요?',
                ' 지금 입력한 메세지는 삭제됩니다.',
                [
                  {text: '취소'},
                  {text: '확인', onPress: () => setModalVisible(false)},
                ],
                '',
              );
            }
          }}>
          <AntDesignIcon name="closecircle" size={30} color="white" />
        </Button>
      </View>

      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          enabled
          style={{
            // backgroundColor: palette.gray,
            width: dw,
            height: dh - 150,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              margin: 10,
              width: 1,
              height: dh * 0.1,
            }}
          />
          <Image
            style={{
              alignSelf: 'center',
              width: dh * 0.35,
              height: dh * 0.35,
              maxHeight: dh * 0.35,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={
              avata === null || avata === undefined || avata === 'avata'
                ? require('~/images/user-default-profile.png')
                : {uri: avata}
            }
          />
          <TextInput
            placeholder=" 대화 메세지를 작성해보세요! (선택)"
            placeholderTextColor={palette.gray}
            value={inputText}
            onChange={item => {
              setInputText(item.nativeEvent.text);
            }}
            multiline={true}
            style={{
              alignSelf: 'center',
              height: dh * 0.35 * 0.25,
              maxHeight: dh * 0.35 * 0.25,
              minHeight: dh * 0.35 * 0.25,

              width: dh * 0.35,
              maxWidth: dh * 0.35,

              backgroundColor: 'white',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,

              // fontSize: 13,
              padding: 10,
              paddingTop: 10,
            }}
            onBlur={() => {}}
            onFocus={() => {}}
          />
          <Button
            onPress={() => {
              // setFocused(false);
              makeChat();
            }}
            style={{
              alignSelf: 'center',
              marginTop: 20,
              width: 130,
              height: 44,
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <CustomTextMedium size={16} color={palette.orange}>
              대화 신청하기
            </CustomTextMedium>
          </Button>
          <CustomTextMedium
            color="white"
            size={12}
            style={{alignSelf: 'center'}}>
            야미 3개가 필요합니다!
          </CustomTextMedium>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendChatting;
