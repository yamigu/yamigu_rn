/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Button, Toast} from 'native-base';
import palette from '~/lib/styles/palette';
import {StyleSheet} from 'react-native';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '~/components/common/CustomText';
const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const BothLikeModal = ({setModalVisible, partner}) => {
  return (
    // <SafeAreaView>
    <TouchableWithoutFeedback
      onPress={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          height: dh,
          width: dw,
          backgroundColor: 'rgba(0,0,0,0.7)',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            paddingBottom: 0,
            backgroundColor: 'white',
            // height: dh * 0.31,
            width: dh * 0.31 * 1.28,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 50, height: 50}}
            source={require('~/images/bothlike-icon.png')}
          />
          <CustomTextRegular size={16} style={{padding: 0}}>
            좋아요 매칭
          </CustomTextRegular>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <CustomTextRegular size={12} style={{padding: 0}}>
              {partner}님이랑 서로 좋아요를 눌렀어요
            </CustomTextRegular>
            <CustomTextRegular size={12} style={{padding: 0}}>
              새로운 친구에게 대화를 걸어보세요!
            </CustomTextRegular>
          </View>

          <View
            style={{
              backgroundColor: '#F0F1F1',
              height: 0.5,
              width: '100%',
            }}
          />

          <Button
            transparent
            style={{
              width: 200,
              padding: 12,
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setModalVisible(false);
            }}>
            <CustomTextBold size={16} color={palette.gold} style={{padding: 0}}>
              확인
            </CustomTextBold>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 0,
    paddingTop: 0,
    width: 200,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default BothLikeModal;
