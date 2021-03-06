/* eslint-disable react-native/no-inline-styles */

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'native-base';
import {CustomTextRegular, CustomTextBold} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const HeightModal = ({setHightModalVisible, setUserInfo}) => {
  const HeightList = [
    '150cm 이하',
    '151cm',
    '152cm',
    '153cm',
    '154cm',
    '155cm',
    '156cm',
    '157cm',
    '158cm',
    '159cm',
    '160cm',
    '161cm',
    '162cm',
    '163cm',
    '164cm',
    '165cm',
    '166cm',
    '167cm',
    '168cm',
    '169cm',
    '170cm',
    '171cm',
    '172cm',
    '173cm',
    '174cm',
    '175cm',
    '176cm',
    '177cm',
    '178cm',
    '179cm',
    '180cm',
    '181cm',
    '182cm',
    '183cm',
    '184cm',
    '185cm',
    '186cm',
    '187cm',
    '188cm',
    '189cm',
    '190cm 이상',
  ];

  // console.log(HeightList);
  return (
    <SafeAreaView
      style={{
        //   flexDirection: 'column',
        //   alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <TouchableWithoutFeedback onPress={() => setHightModalVisible(false)}>
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
              키 선택
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
              {HeightList.map((item, index) => {
                return (
                  <Button
                    key={index}
                    transparent
                    style={styles.btn}
                    onPress={() => {
                      Axios.post(
                        global.config.api_host +
                          'authorization/user/info/height/',
                        {height: item},
                      )
                        .then(async result => {
                          const userValue = await AsyncStorage.getItem(
                            'userValue',
                          );
                          const jUserValue = JSON.parse(userValue);
                          let newUserInfo = jUserValue.slice();
                          newUserInfo[11] = item;
                          console.log(result.data);
                          setUserInfo(newUserInfo);
                          AsyncStorage.setItem(
                            'userValue',
                            JSON.stringify(newUserInfo),
                          );
                          console.log(newUserInfo);
                        })
                        .then(() => setHightModalVisible(false));
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
      </TouchableWithoutFeedback>
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

export default HeightModal;
