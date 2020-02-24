import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ProfileCardFeed from './ProfileCardFeed';
import axios from 'axios';
import palette from '~/lib/styles/palette';
import {CustomTextBold} from '~/components/common/CustomText';

const ProfileCardList = ({navigation, profileCardProp}) => {
  let nowYear = 20200000;
  useEffect(() => {}, []);

  return (
    <View>
      {profileCardProp.map(item => {
        return (
          <ProfileCardFeed
            navigation={navigation}
            uid={item.profile.uid}
            nickname={item.profile.nickname}
            avata={item.profile.avata}
            age={Math.floor(
              (nowYear - parseInt(item.profile.birthdate) + 20000) / 10000,
            )}
            belong={item.profile.belong}
            department={item.profile.department}
            likedByServer={item.liked}
            bothLike={false}
            my_feed={false}
          />
        );
      })}
    </View>
  );
};

export default ProfileCardList;
