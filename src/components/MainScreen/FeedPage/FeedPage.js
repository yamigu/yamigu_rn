import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import ProfileCardList from './ProfileCardList';
import LikeMatchingList from './LikeMatchingList';
import MyFeedManage from './MyFeedManage';
import {Content, Container} from 'native-base';

const FeedPage = props => (
  <View style={styles.root}>
    <Container style={styles.container}>
      <Content
        contentContainerStyle={styles.innerView}
        showsVerticalScrollIndicator={false}>
        <MyFeedManage navigation={props.navigation} />
        <LikeMatchingList />
        <ProfileCardList navigation={props.navigation} />
        <View style={styles.lastScroll} />
      </Content>
    </Container>
  </View>
);
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  lastScroll: {
    height: 20,
    flex: 1,
  },
});
export default FeedPage;
