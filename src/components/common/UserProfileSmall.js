import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {},
  image: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  badgeWrapper: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
});
const UserProfileSmall = ({style, imageSource, userName, badgeComponent}) => {
  // console.log('profile small');
  // console.log(imageSource);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={
            imageSource === null
              ? require('~/images/test-user-profile-girl.png')
              : {uri: imageSource}
          }
          style={styles.image}
        />
        {/* <View style={styles.badgeWrapper}>{badgeComponent}</View> */}
      </View>
      {userName ? (
        <CustomTextMedium
          size={12}
          color={palette.black}
          style={{marginTop: 3}}>
          {userName}
        </CustomTextMedium>
      ) : null}
    </View>
  );
};

export default UserProfileSmall;
