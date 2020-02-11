import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const HomePage = props => (
  <View style={styles.root}>
    <Text>HomePage</Text>
  </View>
);
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default HomePage;
