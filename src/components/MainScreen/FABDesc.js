import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  box: {
    backgroundColor: palette.orange[0],
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5.5,
    borderRightWidth: 5.5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: palette.orange[0],
    alignSelf: 'center',
    marginBottom: -1,
  },
});
const FABDesc = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.triangle} />
      <View style={styles.box}>
        <CustomTextRegular color="white" size={11}>
          미팅하고 싶은 날이 있나요? 지금 미팅을 설정하세요!
        </CustomTextRegular>
      </View>
    </View>
  );
};
export default FABDesc;
