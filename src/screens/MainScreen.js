/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import palette from '~/lib/styles/palette';
import BottomOverlay from '~/components/MainScreen/BottomOverlay';
import LikeMatchingList from '~/components/MainScreen/LikeMatchingList';
import ProfileCardList from '~/components/MainScreen/ProfileCardList';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {DrawerActions} from 'react-navigation-drawer';
const MainScreen = props => {
  return (
    <SafeAreaProvider style={styles.root}>
      <Container style={styles.container}>
        <Content
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          <LikeMatchingList />
          <View style={styles.dividerLine} />
          <ProfileCardList />
        </Content>
        <BottomOverlay />
      </Container>
    </SafeAreaProvider>
  );
};
MainScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableByPlatform
      style={styles.touchable}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Icon
        name="menu"
        style={{
          color: '#333333',
          margin: 10,
        }}
      />
    </TouchableByPlatform>
  ),
  headerTitle: () => (
    <Image source={require('../images/yamigu-logo-text.png')} />
  ),
  headerRight: () => (
    <TouchableByPlatform>
      <Image
        source={require('../images/chat-bubble-outline.png')}
        style={{
          margin: 10,
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
  },
  innerView: {
    flexDirection: 'column',
  },
  dividerLine: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    height: 0.5,
    marginTop: 12,
  },
});
export default MainScreen;
