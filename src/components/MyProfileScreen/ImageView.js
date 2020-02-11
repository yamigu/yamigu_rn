import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import ProfileImageAddView from '../common/ProfileImageAddView';

const ImageView = ({params}) => (
  <View style={styles.container}>
    <CustomTextMedium size={18} color={palette.black}>
      프로필 사진
    </CustomTextMedium>
    <ProfileImageAddView image1 />
    <View style={styles.descView}>
      <CustomTextRegular size={12} color={palette.gray}>
        메인 사진은 반드시 본인 사진이어야 합니다
      </CustomTextRegular>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 33,
    paddingVertical: 12,
  },
  descView: {
    marginTop: 5,
    alignItems: 'center',
  },
});
export default ImageView;
