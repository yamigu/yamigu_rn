/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {List, ListItem} from 'native-base';
import {CustomTextMedium} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import LikeMatching from './LikeMatching';
import UserProfileSmall from '~/components/common/UserProfileSmall';
import GoldBadge from '~/components/common/GoldBadge';
import axios from 'axios';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';

const nowYear = 20200000;

const styles = StyleSheet.create({
  scrollView: {
    paddingLeft: 11,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    marginBottom: 10,
  },
});
const LikeMatchingList = ({navigation, likeMatchingProp}) => {
  const [bothLikeUser, setBothLikeUser] = useState([]);

  useEffect(() => {
    // let tmpBothLike = [];
    // axios.get('http://13.124.126.30:8000/core/both_like/').then(result => {
    //   result.data.map((item, index) => {
    //     tmpBothLike[index] = item;
    //   });
    //   setBothLikeUser(tmpBothLike);
    // });
  }, []);

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

        {likeMatchingProp.map(user => {
          let intAge =
            Math.floor((nowYear - parseInt(user.birthdate)) / 10000) + 2;
          // console.log('usersrrrrr');
          // console.log(user);
          return (
            <TouchableByPlatform
              onPress={() =>
                navigation.navigate('Profile', {
                  uid: user.uid,
                  nickname: user.nickname,
                  avata: user.avata,
                  age: intAge,
                  belong: user.belong,
                  department: user.department,
                  bothLike: true,
                })
              }>
              <UserProfileSmall
                style={{
                  marginRight: 12,
                  paddingTop: 13,
                }}
                userName={user.nickname}
                imageSource={user.avata === null ? null : {uri: user.avata}}
                // badgeComponent={
                //   user.isUnread === true ? <GoldBadge /> : null
                // }
              />
            </TouchableByPlatform>
          );
        })}
      </ScrollView>
    </List>
  );
};

export default LikeMatchingList;
