import React from 'react';

import {View, StyleSheet} from 'react-native';
import {CustomTextRegular} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    borderColor: palette.orange[0],
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const RoundBorderOrangeText = props => (
  <View style={styles.wrapper}>
    <CustomTextRegular color={palette.orange}>
      {props.children}
    </CustomTextRegular>
  </View>
);

export default RoundBorderOrangeText;
