import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {CustomTextMedium, CustomTextLight} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
  },
  wrapper: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: palette.gold,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  touchable: {
    width: 66,
    height: 66,
  },
  innerBackground: {
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldLike: {
    width: 40,
    height: 36,
    marginTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const LikeMatching = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableByPlatform styles={styles.touchable}>
          <ImageBackground
            source={require('../../images/gold-inner-circle.png')}
            style={styles.innerBackground}>
            <ImageBackground
              source={require('../../images/gold-like.png')}
              style={styles.goldLike}>
              <CustomTextLight size={16} color="white">
                16
              </CustomTextLight>
            </ImageBackground>
          </ImageBackground>
        </TouchableByPlatform>
      </View>
      <CustomTextMedium color={palette.black} size={16}>
        좋아요
      </CustomTextMedium>
    </View>
  );
};

export default LikeMatching;
