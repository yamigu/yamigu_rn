import React from 'react';
import {View} from 'react-native';
import ProfileCard from './ProfileCard';
const data = [
  {
    name: '또잉',
    image: require('../../images/test-user-profile-1.png'),
    background: require('../../images/test-user-profile-4.png'),
    isUnread: true,
  },
  {
    name: '뚜루뚜막뚜',
    image: require('../../images/test-user-profile-2.png'),
    background: require('../../images/test-user-profile-4.png'),
    isUnread: true,
  },
  {
    name: '꿈발라',
    image: require('../../images/test-user-profile-3.png'),
    background: require('../../images/test-user-profile-4.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('../../images/test-user-profile-4.png'),
    background: require('../../images/test-user-profile-4.png'),
    isUnread: false,
  },
  {
    name: '요잇',
    image: require('../../images/test-user-profile-4.png'),
    background: require('../../images/test-user-profile-4.png'),
    isUnread: false,
  },
];

const ProfileCardList = ({params}) => (
  <View>
    {data.map(item => {
      return <ProfileCard />;
    })}
  </View>
);

export default ProfileCardList;
