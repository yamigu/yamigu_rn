/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  Dimensions,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Button, Input} from 'native-base';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const SendChatting = ({
  avataUrl,
  setMessage,
  sendMessage,
  setModalVisible,
  setmModalUrl,
  modalUrl,
}) => {
  // axios.get().then((result)=>console.log(result.data));
  const [focused, setFocused] = useState(false);
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
      <View
        style={{
          height: '100%',
          flexDirection: 'column',
          justifyContent: focused ? 'flex-start' : 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: dw * 0.7,
            height: dw * 0.7,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
          source={require('~/images/test-user-profile-girl.png')}
        />
        <Input
          placeholder=" 대화 메세지를 작성 해 보세요"
          multiline={true}
          style={{
            height: dw * 0.7 * 0.3,
            maxHeight: dw * 0.7 * 0.25,
            maxWidth: dw * 0.7,
            width: dw * 0.7,
            backgroundColor: 'white',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          onFocus={() => setFocused(true)}
        />
        <Button
          onPress={() => Alert.alert('신청각?')}
          style={{
            margin: 20,
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
          야미 3개 소모
        </CustomTextMedium>
        <View style={{height: 150, width: 1}} />
      </View>
    </SafeAreaView>
  );
};

export default SendChatting;
