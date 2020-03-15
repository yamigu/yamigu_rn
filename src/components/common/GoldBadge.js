import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import palette from '~/lib/styles/palette';

const styles = StyleSheet.create({
  goldBadge: {
    position: 'absolute',
    top: 12,
    width: 16,
    height: 16,
    borderRadius: 8,
    transform: [{rotate: '-45deg'}],
    borderWidth: 1,
    borderColor: 'white',
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
