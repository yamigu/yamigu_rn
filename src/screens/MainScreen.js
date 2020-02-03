/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Container, Drawer, Content, Icon} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import palette from '~/lib/styles/palette';
import SideBar from '~/components/MainScreen/SideBar';
import BottomOverlay from '~/components/MainScreen/BottomOverlay';
import LikeMatchingList from '~/components/MainScreen/LikeMatchingList';
import ProfileCardList from '~/components/MainScreen/ProfileCardList';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';

const MainScreen = () => {
  let drawer;
  const openDrawer = () => {
    drawer._root.open();
  };
  const closeDrawer = () => {
    drawer._root.close();
  };
  return (
    <SafeAreaView style={styles.root}>
      <Drawer
        ref={ref => {
          drawer = ref;
        }}
        content={<SideBar />}
        onClose={() => closeDrawer()}>
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
      </Drawer>
    </SafeAreaView>
  );
};
MainScreen.navigationOptions = props => ({
  headerLeft: () => (
    <TouchableByPlatform style={styles.touchable}>
      <Icon
        name="menu"
        style={{
          color: '#333333',
        }}
        onPress={props.navigation.openDrawer}
      />
    </TouchableByPlatform>
  ),
  headerTitle: () => (
    <Image source={require('../images/yamigu-logo-text.png')} />
  ),
  headerRight: () => (
    <TouchableByPlatform>
      <Image source={require('../images/chat-bubble-outline.png')} />
    </TouchableByPlatform>
  ),
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
