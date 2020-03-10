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
} from 'react-native';
import {Button, Toast} from 'native-base';
import {CustomTextMedium, CustomTextRegular} from './CustomText';
import palette from '~/lib/styles/palette';
import {StyleSheet} from 'react-native';
import axios from 'axios';
import '~/config';

const dh = Dimensions.get('window').height;
const dw = Dimensions.get('window').width;

const Call911Modal = ({setCall911ModalVisible, uid}) => {
  const list911 = ['부적절한 사진', '허위 프로필', '사진도용', '욕설 및 비방'];
  const [listState, setListState] = useState([0, 0, 0, 0]);
  const [listTrue, setListTrue] = useState(false);

  const reportRequest = () => {
    const index = listState.findIndex(value => value === 1);
    console.log(index);
    if (index === -1) return;

    axios
      .post(global.config.api_host + 'core/report/', {
        who: uid,
        why: list911[index],
      })
      .then(() => {
        setCall911ModalVisible(false);
        Alert.alert('신고가 접수되었습니다');
      });
  };
  return (
    <SafeAreaView
      style={{
        //   flexDirection: 'column',
        //   alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setCall911ModalVisible(false);
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
              // width: 270,
              // height: 270,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomTextRegular size={16} style={{padding: 15}}>
              어떤 문제가 있나요?
            </CustomTextRegular>
            <View
              style={{
                backgroundColor: palette.gray,
                height: 0.5,
                width: 270,
              }}
            />
            {list911.map((item, index) => {
              return (
                <Button
                  style={styles.btn}
                  onPress={() => {
                    let tmp = [0, 0, 0, 0];
                    tmp[index] = 1;
                    setListState(tmp);
                    setListTrue(true);
                  }}>
                  <CustomTextRegular
                    size={14}
                    color={
                      listState[index] === 0 ? palette.black : palette.orange
                    }>
                    {item}
                  </CustomTextRegular>
                </Button>
              );
            })}
            <View
              style={{
                backgroundColor: palette.gray,
                height: 0.5,
                width: 270,
              }}
            />

            <Button
              style={{
                width: 200,
                padding: 12,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (listTrue === true) {
                  reportRequest();
                  setCall911ModalVisible(false);
                } else setCall911ModalVisible(false);
              }}>
              <CustomTextRegular
                size={16}
                color={listTrue === false ? palette.black : palette.orange}>
                신고하기
              </CustomTextRegular>
            </Button>
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
    width: 200,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default Call911Modal;
