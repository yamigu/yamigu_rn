import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ProfileCardFeed from './ProfileCardFeed';
import axios from 'axios';
import palette from '~/lib/styles/palette';

const ProfileCardList = ({
  navigation,
  profileCardProp,
  hasProfile,
  likeMatchingProp,
  setLikeMatchingProp,
}) => {
  let nowYear = 20200000;
  useEffect(() => {}, [profileCardProp]);

  return (
    <View>
      {profileCardProp.map((item, index) => {
        return (
          <ProfileCardFeed
            loading={item.loading}
            style={{marginTop: 0}}
            key={item.profile.uid}
            location={item.profile.location}
            height={item.profile.height}
            verified={item.profile.verified}
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
            likeMatchingProp={likeMatchingProp}
            setLikeMatchingProp={setLikeMatchingProp}
          />
        );
      })}
    </View>
  );
};

export default ProfileCardList;
