import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List, ListItem} from 'native-base';
import {CustomTextMedium} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import LikeMatching from './LikeMatching';
import UserProfileSmall from '~/components/common/UserProfileSmall';
import GoldBadge from '~/components/common/GoldBadge';

const data = [
  {
    name: '또로링',
    image: require('~/images/test-user-profile-1.png'),
    isUnread: true,
  },
  {
    name: '뚜루뚜막뚜',
    image: require('~/images/test-user-profile-2.png'),
    isUnread: true,
  },
  {
    name: '꿈발라',
    image: require('~/images/test-user-profile-3.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('~/images/test-user-profile-4.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('~/images/test-user-profile-4.png'),
    isUnread: false,
  },
];

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 11,
  },
});
const LikeMatchingList = () => {
  return (
    <List>
      <ListItem itemDivider>
        <CustomTextMedium size={16} color={palette.black}>
          좋아요 매칭
        </CustomTextMedium>
      </ListItem>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <LikeMatching />
        {data.map(user => {
          return (
            <UserProfileSmall
              style={{marginRight: 12}}
              userName={user.name}
              imageSource={user.image}
              badgeComponent={user.isUnread === true ? <GoldBadge /> : null}
            />
          );
        })}
      </ScrollView>
    </List>
  );
};

export default LikeMatchingList;
