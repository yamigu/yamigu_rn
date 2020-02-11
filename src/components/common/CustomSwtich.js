import React from 'react';
import {StyleSheet} from 'react-native';
import {Switch} from 'react-native-switch';
import palette from '~/lib/styles/palette';

export const CustomSwitch = ({toggleState, onPress, size}) => (
  <Switch
    value={toggleState}
    circleSize={size}
    barHeight={size}
    circleBorderWidth={size / 5}
    backgroundActive={palette.orange[0]}
    backgroundInactive={palette.nonselect}
    circleActiveColor={'white'}
    circleInActiveColor={'white'}
    innerCircleStyle={
      toggleState === true ? styles.innerCircle : styles.innerCircleInactive
    }
    outerCircleStyle={styles.outerCircleStyle}
  />
);

const styles = StyleSheet.create({
  innerCircle: {
    backgroundColor: 'white',
    borderColor: palette.orange[0],
  },
  innerCircleInactive: {
    backgroundColor: 'white',
    borderColor: palette.nonselect,
  },
  outerCircleStyle: {},
});
