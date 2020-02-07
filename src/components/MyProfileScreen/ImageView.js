import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium} from '../common/CustomText';
import palette from '~/lib/styles/palette';

const ImageView = ({params}) => (
  <View style={styles.container}>
    <CustomTextMedium size={18} color={palette.black}>
      프로필 사진
    </CustomTextMedium>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 31,
    paddingVertical: 12,
  },
});
export default ImageView;
