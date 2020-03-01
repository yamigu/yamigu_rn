/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, Modal, StyleSheet, Alert} from 'react-native';
import LocationModal from './LocationModal';
import {Item, Button, Input} from 'native-base';
import {CustomTextRegular, CustomTextMedium} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '../common/TouchableByPlatform';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const LocationPage = ({setLocationText, locationText}) => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  return (
    <View style={styles.root}>
      <Modal visible={locationModalVisible} transparent>
        <LocationModal
          setLocationText={setLocationText}
          setLocationModalVisible={setLocationModalVisible}
        />
      </Modal>

      <CustomTextMedium size={20} color={palette.black}>
        지역을 선택해주세요
      </CustomTextMedium>

      <CustomTextRegular size={16} color={palette.gray}>
        *언제든지 바꿀 수 있어요!
      </CustomTextRegular>

      <Button
        style={{
          backgroundColor: palette.default_bg,
          //   backgroundColor: palette.gold,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setLocationModalVisible(true);
        }}>
        {locationText === '' ? (
          <CustomTextRegular size={12} color={palette.gray}>
            지역 선택
          </CustomTextRegular>
        ) : (
          <CustomTextRegular size={16} color={palette.black}>
            {locationText}
          </CustomTextRegular>
        )}

        <AntDesignIcon
          name="caretdown"
          size={12}
          style={{marginLeft: 5, color: palette.orange}}
        />
      </Button>
      <View style={{backgroundColor: palette.gray, height: 1}} />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
  },
  buttonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  buttonActive: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.orange[0],
  },
  buttonLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0.5,
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0.5,
  },
  form: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 0,
  },
  formItem: {
    marginLeft: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    textAlignVertical: 'bottom',
    lineHeight: 14,
    fontFamily: 'NotoSansCJKkr-Medium',
    paddingBottom: 0,
    color: palette.gray,
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'bottom',
    fontFamily: 'NotoSansCJKkr-Regular',
    paddingBottom: 0,
    color: palette.black,
  },
});
export default LocationPage;
