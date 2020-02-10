/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const SideMenu = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text onPress={() => props.navigation.navigate('BV')}>asd</Text>
    </SafeAreaView>
  );
};

export default SideMenu;
