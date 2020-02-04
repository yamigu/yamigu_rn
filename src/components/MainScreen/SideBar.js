import React from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';
import {SafeAreaView} from 'react-navigation';

const StyledView = Styled.View`
  backgroundColor: white;
  flex: 1;
`;
const SideBar = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>asd</Text>
    </SafeAreaView>
  );
};

export default SideBar;
