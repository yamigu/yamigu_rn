/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Toast} from 'native-base';
import {CustomTextMedium, CustomTextRegular} from './CustomText';
import palette from '~/lib/styles/palette';
import axios from 'axios';
import '~/config';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const MoreModal = ({setMoreModalVisible, setCall911ModalVisible, uid}) => {
  const requestBlock = () => {
    axios
      .post(global.config.api_host + 'core/block/', {
        who: uid,
      })
      .then(() => {
        setMoreModalVisible(false);
      });
  };
  const pressBlock = () => {
    Alert.alert(
      '정말 차단하시겠어요?',
      '차단시 서로를 더 이상 볼 수 없어요',
      [
        {
          text: '아니오',
          onPress: () => {
            console.log('NOPE');
            setMoreModalVisible(false);
          },
        },
        {
          text: '차단하기',
          style: 'destructive',
          onPress: requestBlock,
        },
      ],
      '',
    );
  };

  const pressCall911 = () => {
    setCall911ModalVisible(true);
    setMoreModalVisible(false);
  };

  const pressCancel = () => {
    setMoreModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{
        //   flexDirection: 'column',
        //   alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <TouchableWithoutFeedback onPress={() => setMoreModalVisible(false)}>
        <View
          style={{
            height: dh,
            width: dw,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Button
            style={{
              height: 52,
              width: dw * 0.95,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            onPress={() => pressBlock()}>
            <CustomTextRegular size={17} color="red">
              차단
            </CustomTextRegular>
          </Button>
          <View
            style={{width: 1, height: 0.5, backgroundColor: palette.gray}}
          />
          <Button
            style={{
              height: 52,
              width: dw * 0.95,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            onPress={() => pressCall911()}>
            <CustomTextRegular size={17} color={palette.gray}>
              신고
            </CustomTextRegular>
          </Button>
          <View style={{width: 1, height: 10}} />

          <Button
            style={{
              height: 52,
              width: dw * 0.95,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              marginBottom: 10,
            }}
            onPress={() => pressCancel()}>
            <CustomTextMedium size={17} color={palette.black}>
              취소
            </CustomTextMedium>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default MoreModal;
