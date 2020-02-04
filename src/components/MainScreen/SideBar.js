import React from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';
import {SafeAreaView} from 'react-navigation';

const StyledView = Styled.View`
  backgroundColor: white;
  flex: 1;
`;
const SideBar = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text onPress={() => props.navigation.navigate('Profile')}>asd</Text>
    </SafeAreaView>
  );
};

export default SideBar;
