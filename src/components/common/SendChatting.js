/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Input, Content} from 'native-base';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const SendChatting = ({avata, uid, setModalVisible}) => {
  // axios.get().then((result)=>console.log(result.data));
  const [focused, setFocused] = useState(false);

  const _scrollToBottomY = useRef();
  const gotoBot = () => {
    setTimeout(() => {
      _scrollToBottomY.current.scrollToEnd({animated: false});
    }, 150);
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
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
                gotoBot();
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
            <View style={{height: 100, width: 1}} />
            {focused === true ? <View style={{height: 200, width: 1}} /> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendChatting;
