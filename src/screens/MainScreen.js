/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Drawer, Content} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import palette from '~/lib/styles/palette';
import SideBar from '~/components/MainScreen/SideBar';
import BottomOverlay from '~/components/MainScreen/BottomOverlay';
import LikeMatchingList from '~/components/MainScreen/LikeMatchingList';
import ProfileCardList from '~/components/MainScreen/ProfileCardList';

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
MainScreen.navigationOptions = {};

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
