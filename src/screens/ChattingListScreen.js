/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon, Content} from 'native-base';
import ChattingList from '~/components/ChattingListScreen/ChattingList';
import ReceivedList from '~/components/ChattingListScreen/ReceivedList';
import {HeaderBackButton} from 'react-navigation-stack';

const ChattingListScreen = ({navigation}) => (
  <Content showsVerticalScrollIndicator={false} style={styles.root}>
    <ReceivedList navigation={navigation} />
    <ChattingList style={{marginTop: 12}} navigation={navigation} />
  </Content>
);

ChattingListScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
  headerTitle: () => (
    <Image source={require('~/images/chat-bubble-orange.png')} />
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
});
export default ChattingListScreen;
