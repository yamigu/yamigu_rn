/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Container, Content, Icon, Text, List} from 'native-base';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {DrawerActions} from 'react-navigation-drawer';
import ReceivedItem from '~/components/ChattingScreen/ReceivedItem';
import SentItem from '~/components/ChattingScreen/SentItem';

const ChattingScreen = props => {
  return (
    <View style={styles.root}>
      <Container style={styles.container}>
        <List>
          <ReceivedItem />
          <ReceivedItem />
          <SentItem />
        </List>
      </Container>
    </View>
  );
};
ChattingScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableByPlatform
      style={styles.touchable}
      onPress={() => navigation.goBack()}>
      <Icon
        name="arrow-back"
        color={palette.black}
        style={{
          marginLeft: 12,
        }}
      />
    </TouchableByPlatform>
  ),
  headerTitle: () => <Text style={{alignSelf: 'center'}}>제이름은요</Text>,
  headerRight: () => (
    <TouchableByPlatform>
      <Icon
        name="more"
        color={palette.black}
        style={{
          marginRight: 12,
        }}
      />
    </TouchableByPlatform>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: palette.default_bg,
    flex: 1,
  },
});
export default ChattingScreen;
