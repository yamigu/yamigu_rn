/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import FAB from './FAB';
import FABDesc from './FABDesc';

const styles = StyleSheet.create({
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
  },
  fabWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
const BottomOverlay = props => {
  return (
    <View style={styles.bottomOverlay}>
      <View style={styles.fabWrapper}>
        <FAB style={styles.fab} />
        <FABDesc styles={styles.fabdesc} />
      </View>
    </View>
  );
};

export default BottomOverlay;
