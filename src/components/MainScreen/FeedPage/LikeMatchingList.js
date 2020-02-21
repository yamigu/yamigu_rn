import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List, ListItem} from 'native-base';
import {CustomTextMedium} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import LikeMatching from './LikeMatching';
import UserProfileSmall from '~/components/common/UserProfileSmall';
import GoldBadge from '~/components/common/GoldBadge';
import axios from 'axios';

const data = [
  {
    name: '또로링',
    image: require('~/images/test-user-profile-girl.png'),
    isUnread: true,
  },
  {
    name: '뚜루뚜막뚜',
    image: require('~/images/test-user-profile-girl.png'),
    isUnread: true,
  },
  {
    name: '꿈발라',
    image: require('~/images/test-user-profile-girl.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('~/images/test-user-profile-girl.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('~/images/test-user-profile-girl.png'),
    isUnread: false,
  },
];

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 11,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
});
const LikeMatchingList = ({navigation}) => {
  useEffect(() => {
    let tmpBothLike = [];
    axios.get('http://13.124.126.30:8000/core/both_like/').then(result => {
      result.data.user_list.map((item, index) => {
        tmpBothLike[index] = item;
      });
      setBothLiskUid(tmpBothLike);
      console.log(result.data);
    });
  }, []);

  const [bothLikeUid, setBothLiskUid] = useState([]);
  return (
    <List>
      {/* <ListItem itemDivider>
        <CustomTextMedium size={16} color={palette.black}>
          좋아요 매칭
        </CustomTextMedium>
      </ListItem> */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <LikeMatching />
        {bothLikeUid.map(user => {
          return (
            <UserProfileSmall
              style={{marginRight: 12, paddingTop: 13}}
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
