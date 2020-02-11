import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import ProfileImageAddView from '../common/ProfileImageAddView';

const deviceWidth = Dimensions.get('window').width;

const ImagePage = ({params}) => (
  <View style={styles.root}>
    <CustomTextMedium size={20} color={palette.black}>
      마지막이에요! 사진을 올려주세요
    </CustomTextMedium>
    <CustomTextRegular size={16} color={palette.gray}>
      *최소 2장의 본인 사진을 등록해주세요.
    </CustomTextRegular>
    <ProfileImageAddView />
  </View>
);

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
  },
});
export default ImagePage;
