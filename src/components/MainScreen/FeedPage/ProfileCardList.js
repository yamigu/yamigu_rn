import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ProfileCardFeed from './ProfileCardFeed';
import axios from 'axios';

const ProfileCardList = ({navigation, profileCardProp, hasProfile}) => {
  let nowYear = 20200000;
  useEffect(() => {}, [profileCardProp]);

  return (
    <View>
      {profileCardProp.map(item => {
        console.log(item.feed_list.length);
        return (
          <ProfileCardFeed
            verified={item.profile.verified}
            key={item.id}
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
            hasProfile={hasProfile}
          />
        );
      })}
    </View>
  );
};

export default ProfileCardList;
