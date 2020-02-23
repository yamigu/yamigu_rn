import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ProfileCardFeed from './ProfileCardFeed';
import axios from 'axios';
import palette from '~/lib/styles/palette';
import {CustomTextBold} from '~/components/common/CustomText';

const ProfileCardList = ({navigation}) => {
  const [feedList, setFeedList] = useState([]);

  let nowYear = 20200000;
  useEffect(() => {
    axios.get('http://13.124.126.30:8000/core/feeds/').then(result => {
      let tmp = [];
      let count = 0;
      console.log('ProfileCardList: ');
      console.log(result.data);
      result.data.map((item, index) => {
        if (item.feed_list.length === 0) {
          console.log('no feed : ' + item.profile.nickname);
        } else {
          console.log('yes feed : ' + item.profile.nickname);
          tmp[count] = item;
          count++;
        }
      });
      setFeedList(tmp);
    });
  }, []);
  return (
    <View>
      {feedList.map(item => {
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
          />
        );
      })}
    </View>
  );
};

export default ProfileCardList;
