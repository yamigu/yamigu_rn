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
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import RoundBorderOrangeText from '~/components/MeetingSettingScreen/RoundBorderOrangeText';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import palette from '~/lib/styles/palette';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const MemberModal = props => {
  const memberList = ['2:2 미팅', '3:3 미팅', '4:4 미팅'];
  const [selected, setSelected] = useState([true, true, true]);
  const [tmpSelected, setTmpSelected] = useState([true, true, true]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.memberModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.setMemberModalVisible(false);
          console.log('aa');
        }}>
        <View
          style={{
            height: dh - 200,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          height: 200,
          backgroundColor: 'rgba(0,0,0,0.7)',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            height: 200,
            width: dw,
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingRight: 12,
            paddingLeft: 12,
          }}>
          <View name="팀소개div" style={styles.grayBox}>
            <View style={{flexDirection: 'row'}}>
              <CustomTextRegular size={13} color="#505050">
                인원 선택
              </CustomTextRegular>
              <CustomTextRegular
                style={{paddingLeft: 12}}
                size={12}
                color="#B1B1B1">
                (복수 선택 가능)
              </CustomTextRegular>
            </View>
            <TouchableByPlatform onPress={() => setSelected()}>
              <CustomTextMedium color={palette.orange} size={13}>
                완료
              </CustomTextMedium>
            </TouchableByPlatform>
          </View>
          <View name="인원선택list" style={styles.itemList}>
            <View
              style={{
                backgroundColor: 'white',
                height: 35,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {memberList.map((wow, index) => {
                return (
                  <TouchableByPlatform
                    onPress={() => {
                      console.log(index);

                      tmpSelected[index] = !selected[index];
                      setTmpSelected(tmpSelected);
                      setSelected(tmpSelected);

                      console.log('selected : ' + selected);
                      console.log('tmpselected : ' + tmpSelected);

                      // selected_copy.map(item =>
                      //   item === index ? {...item, value: !item.value} : item,
                      // );
                    }}>
                    <CustomTextRegular
                      color={
                        selected[index] === false
                          ? palette.black
                          : palette.orange
                      }>
                      {wow}
                    </CustomTextRegular>
                  </TouchableByPlatform>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  grayBox: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
export default MemberModal;
