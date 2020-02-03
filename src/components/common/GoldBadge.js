import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  goldBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    transform: [{rotate: '-45deg'}],
  },
});
const GoldBadge = () => {
  return (
    <LinearGradient
      style={styles.goldBadge}
      colors={[palette.yellow, palette.gold, palette.yellow]}
    />
  );
};

export default GoldBadge;
