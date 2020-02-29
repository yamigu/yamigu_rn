/* eslint-disable react-native/no-inline-styles */

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'native-base';
import {CustomTextRegular, CustomTextBold} from '../common/CustomText';
import palette from '~/lib/styles/palette';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const LocationModal = ({setLocationModalVisible, setLocationText}) => {
  const locationList = [
    '서울',
    '경기 북부',
    '경기 남부',
    '인천',
    '부산',
    '전남 & 광주',
    '대전 & 세종',
    '충북 & 충남',
    '경북 & 대구',
    '경남 & 울산',
    '전북 & 전주',
    '강원',
    '제주',
  ];

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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 270,
            height: 300,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextBold size={16} style={{padding: 15}}>
            지역 선택
          </CustomTextBold>
          <View
            style={{
              backgroundColor: '#F0F1F1',
              height: 0.5,
              width: 270,
            }}
          />
          <ScrollView
            contentContainerStyle={{
              overflow: 'scroll',
              width: 270,
              //   backgroundColor: palette.gold,
            }}>
            {locationList.map((item, index) => {
              return (
                <Button
                  style={styles.btn}
                  onPress={() => {
                    setLocationModalVisible(false);
                    setLocationText(item);
                  }}>
                  <CustomTextRegular size={14}>{item}</CustomTextRegular>
                </Button>
              );
            })}
          </ScrollView>

          <View
            style={{
              backgroundColor: palette.gray,
              height: 0.5,
              width: 270,
            }}
          />

          {/* <Button
            style={{padding: 12, backgroundColor: 'white'}}
            onPress={() => setLocationModalVisible(false)}>
            <CustomTextRegular
              size={16}
              color={listTrue === false ? palette.black : palette.orange}>
              신고하기
            </CustomTextRegular>
          </Button> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn: {
    paddingVertical: 0,
    paddingTop: 0,

    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default LocationModal;
