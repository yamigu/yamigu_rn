/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, SafeAreaView, Dimensions, Alert} from 'react-native';
import {Button, Toast} from 'native-base';
import {CustomTextMedium, CustomTextRegular} from './CustomText';
import palette from '~/lib/styles/palette';
import axios from 'axios';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const MoreModal = ({setMoreModalVisible, setCall911ModalVisible, uid}) => {
  const requestBlock = () => {
    axios
      .post('http://13.124.126.30:8000/core/block/', {
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
          }}
          onPress={() => pressBlock()}>
          <CustomTextRegular size={17} color="red">
            차단
          </CustomTextRegular>
        </Button>
        <View style={{width: 1, height: 1, backgroundColor: palette.gray}} />
        <Button
          style={{
            height: 52,
            width: dw * 0.95,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
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
    </SafeAreaView>
  );
};

export default MoreModal;
