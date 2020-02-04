/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
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
    <SafeAreaView style={styles.bottomOverlay}>
      <View style={styles.fabWrapper}>
        <FAB style={styles.fab} />
        <FABDesc styles={styles.fabdesc} />
      </View>
    </SafeAreaView>
  );
};

export default BottomOverlay;
