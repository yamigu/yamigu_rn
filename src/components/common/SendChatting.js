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
} from 'react-native';
import {Button, Input, Content} from 'native-base';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';
const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const SendChatting = ({avata, uid, setModalVisible}) => {
  // axios.get().then((result)=>console.log(result.data));
  const [focused, setFocused] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const SV = useRef();
  useEffect(() => {
    retrieveUserInfo();
  }, []);
  const gotoBot = () => {
    // SV.current._root.scrollToPosition(0, 0);
  };
  const retrieveUserInfo = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    setUserInfo(jUserValue);
  };

  const requestChat = () => {
    axios
      .post('http://13.124.126.30:8000/core/chat/', {
        target_uid: uid,
      })
      .then(() => {
        userInfo[global.config.user_info_const.YAMI] -= 3;
        AsyncStorage.setItem('userValue', JSON.stringify(userInfo));
        setModalVisible(false);
      })
      .catch(error => {
        Alert.alert('이미 대화중이에요', '', [
          {
            text: '확인',
            onPress: () => {
              setModalVisible(false);
            },
          },
        ]);
      });
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
        }}>
        <Button
          transparent
          style={{elevation: 0}}
          onPress={() => {
            // setPdModalVisible(false);
            setModalVisible(false);
            console.log(setModalVisible);
          }}>
          <AntDesignIcon name="closecircle" size={30} color="white" />
        </Button>
      </View>
      {/* <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{
          backgroundColor: palette.gray,
          width: dw,
          height: dh - 200,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Input
          placeholder=" 대화 메세지를 작성해보세요! (선택)"
          multiline={true}
          style={{
            height: dw * 0.7 * 0.3,
            maxHeight: dw * 0.7 * 0.25,
            minHeight: dw * 0.7 * 0.25,

            width: dw * 0.7,
            maxWidth: dw * 0.7,

            backgroundColor: 'white',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onBlur={() => {}}
          onFocus={() => {}}
        />
        <View
          style={{
            margin: 10,
            backgroundColor: palette.gold,
            width: 100,
            height: 100,
          }}
        />
      </KeyboardAvoidingView> */}
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
          <Input
            placeholder=" 대화 메세지를 작성해보세요! (선택)"
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
            }}
            onBlur={() => {}}
            onFocus={() => {}}
          />
          <Button
            onPress={() => {
              // setFocused(false);
              requestChat();
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
            야미 3개가 필요합니다.
          </CustomTextMedium>
          {/* <View
            style={{
              margin: 10,
              backgroundColor: palette.gold,
              width: 100,
              height: 100,
            }}
          />
          <View
            style={{
              margin: 10,
              backgroundColor: palette.gold,
              width: 100,
              height: 100,
            }}
          /> */}
        </KeyboardAvoidingView>
      </ScrollView>
      {/* 
      <KeyboardAvoidingView>
        <ScrollView
          ref={_scrollToBottomY}
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: focused ? 'flex-start' : 'center',
            alignItems: 'center',
            width: dw,
          }}>
          <View
            style={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: focused ? 'flex-start' : 'center',
              alignItems: 'center',
            }}>
            <View style={{height: 50, width: 1}} />
            <Image
              style={{
                width: dw * 0.7,
                height: dw * 0.7,
                maxHeight: dw * 0.7,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
              source={
                avata === null || avata === undefined || avata === 'avata'
                  ? require('~/images/user-default-profile.png')
                  : {uri: avata}
              }
            />
            <Input
              placeholder=" 대화 메세지를 작성해보세요! (선택)"
              multiline={true}
              style={{
                height: dw * 0.7 * 0.3,
                maxHeight: dw * 0.7 * 0.25,
                maxWidth: dw * 0.7,
                minHeight: dw * 0.7 * 0.25,
                width: dw * 0.7,
                backgroundColor: 'white',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              onBlur={() => {
                setFocused(false);
              }}
              onFocus={() => {
                setFocused(true);
              }}
            />
            <Button
              onPress={() => {
                // setFocused(false);
                Alert.alert('신청각? to ' + uid);
              }}
              style={{
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
            <CustomTextMedium color="white" size={12}>
              야미 3개가 필요합니다.
            </CustomTextMedium>
            <View style={{height: 200, width: 1}} />
            {focused === true ? <View style={{height: 300, width: 1}} /> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default SendChatting;
