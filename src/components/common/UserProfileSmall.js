import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
  },
  imageContainer: {},
  image: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginBottom: 3,
  },
  badgeWrapper: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
});
const UserProfileSmall = ({imageSource, userName, badgeComponent}) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.badgeWrapper}>{badgeComponent}</View>
    </View>
    <CustomTextMedium size={12} color={palette.black}>
      {userName}
    </CustomTextMedium>
  </View>
);

export default UserProfileSmall;
