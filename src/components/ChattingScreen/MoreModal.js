/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Toast} from 'native-base';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import axios from 'axios';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const MoreModal = ({setVisible, requestCancel, cancelled}) => {
  const pressBlock = () => {
    if (cancelled) {
      requestCancel();
      setVisible(false);
      return;
    }
    Alert.alert(
      '정말 채팅방을 나가시겠어요?',
      '앞으로 야미구에서 상대와 대화가 불가능해요',
      [
        {
          text: '아니오',
          onPress: () => {
            console.log('NOPE');
            setVisible(false);
          },
        },
        {
          text: '네',
          style: 'destructive',
          onPress: requestCancel,
        },
      ],
      '',
    );
  };

  const pressCancel = () => {
    setVisible(false);
  };

  return (
    <SafeAreaView
      style={{
        //   alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
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
            onPress={pressBlock}>
            <CustomTextRegular size={17} color="red">
              채팅방 나가기
            </CustomTextRegular>
          </Button>
          <View
            style={{width: 1, height: 0.5, backgroundColor: palette.gray}}
          />
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
