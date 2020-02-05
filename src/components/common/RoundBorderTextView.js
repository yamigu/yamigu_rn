import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomTextRegular} from './CustomText';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 17.5,
    borderColor: palette.orange[0],
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});
const RoundBorderTextView = props => (
  <View style={styles.wrapper}>
    <CustomTextRegular size={12} color={palette.orange}>
      {props.children}
    </CustomTextRegular>
  </View>
);

export default RoundBorderTextView;
