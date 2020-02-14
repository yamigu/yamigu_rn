/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {CustomTextRegular} from '~/components/common/CustomText';
import RoundBorderOrangeText from '~/components/MeetingSettingScreen/RoundBorderOrangeText';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const DateModal = props => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.dateModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.setDateModalVisible(false);
          console.log('aa');
        }}>
        <View
          style={{
            height: dh,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 200,
              width: dw,
              backgroundColor: 'white',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View name="팀소개div" style={styles.grayBox}>
              <CustomTextRegular size={13} color="#505050">
                날짜 선택
              </CustomTextRegular>
              <CustomTextRegular
                style={{paddingLeft: 12}}
                size={12}
                color="#B1B1B1">
                (복수 선택 가능)
              </CustomTextRegular>
            </View>
            <View name="인원선택list" style={styles.itemList}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 35,
                }}>
                <RoundBorderOrangeText style={{backgroundColor: 'white'}}>
                  오늘
                </RoundBorderOrangeText>
                <RoundBorderOrangeText style={{backgroundColor: 'white'}}>
                  내일
                </RoundBorderOrangeText>
                <RoundBorderOrangeText style={{backgroundColor: 'white'}}>
                  내일모레
                </RoundBorderOrangeText>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  grayBox: {
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 20,
    backgroundColor: '#F3F2F2',
  },
  itemList: {
    flexDirection: 'row',
    width: dw * 0.93,
    marginTop: 12,
    height: 40,
    backgroundColor: 'white',
  },
});
export default DateModal;
