import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CustomTextMedium} from './CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    overflow: 'hidden',
  },
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
const UserProfileSmall = ({
  style,
  imageSource,
  userName,
  badgeComponent,
  onPress,
}) => {
  // console.log('profile small');
  // console.log(imageSource);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <TouchableByPlatform onPress={onPress}>
          <Image
            source={
              imageSource === null
                ? require('~/images/profile-yamigu.png')
                : imageSource
            }
            style={styles.image}
          />
        </TouchableByPlatform>
      </View>
      <View style={styles.badgeWrapper}>{badgeComponent}</View>
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
