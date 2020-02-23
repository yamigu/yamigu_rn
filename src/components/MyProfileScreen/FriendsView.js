import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Button, ListItem, List, Body, Icon, Right} from 'native-base';
import ProfileCard from '../common/ProfileCard';
import Octionicon from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const FriendsView = ({navigation}) => {
  const [numOfFriends, setNumOfFriends] = useState(0);
  const [friendList, setFriendList] = useState([]);
  const nowYear = 20200000;

  useEffect(() => {
    axios.get('http://13.124.126.30:8000/core/friends/').then(result => {
      setFriendList(result.data);
      setNumOfFriends(result.data.length);
    });
  }, []);
  return (
    <View style={styles.container}>
      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 21}}>
        내 친구들
      </CustomTextMedium>
      {numOfFriends > 0 ? (
        <List style={{paddingBottom: 12}}>
          {friendList.map(friend => (
            <ListItem noIndent style={styles.friendsListItem}>
              <Body>
                {friend.approved === true ? (
                  <ProfileCard
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname={friend.user_info.nickname}
                    image={
                      Object.keys(friend.user_info).length === 5
                        ? null
                        : friend.user_info.avata
                    }
                    age={Math.floor(
                      (nowYear - parseInt(friend.user_info.birthdate) + 20000) /
                        10000,
                    )}
                    belong={friend.user_info.belong}
                    department={friend.user_info.department}
                  />
                ) : friend.you_sent === true ? (
                  <ProfileCard
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname="상대방의 수락을 기다리는 중입니다."
                    image={require('~/images/test-user-profile-girl.png')}
                    age=""
                    belong=""
                    department={friend.phoneno}
                  />
                ) : (
                  <ProfileCard
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname="친구가 맞나요??"
                    image={require('~/images/test-user-profile-girl.png')}
                    age=""
                    belong=""
                    department={friend.phoneno}
                  />
                )}
              </Body>

              <Right
                style={!friend.you_sent && !friend.approved ? {} : {flex: 0}}>
                {friend.approved === true ? (
                  <Octionicon name="x" style={styles.iconX} />
                ) : friend.you_sent !== true ? (
                  <View style={styles.notAccetedView}>
                    <Button style={styles.declineButton}>
                      <CustomTextRegular size={18} color={palette.gray}>
                        X
                      </CustomTextRegular>
                    </Button>
                    <Button style={styles.acceptButton}>
                      <CustomTextRegular size={18} color={palette.orange}>
                        O
                      </CustomTextRegular>
                    </Button>
                  </View>
                ) : (
                  <Octionicon name="x" style={styles.iconX} />
                )}
              </Right>
            </ListItem>
          ))}
        </List>
      ) : (
        <CustomTextRegular
          size={14}
          color={palette.black}
          style={{alignSelf: 'center', paddingVertical: 12}}>
          친구를 등록하고 내 친구도 자랑하세요!
        </CustomTextRegular>
      )}

      <Button
        style={styles.button}
        onPress={() => navigation.navigate('AddFriends')}>
        <CustomTextMedium size={14} color="white">
          친구 등록하기
        </CustomTextMedium>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: palette.orange,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  friendsListItem: {
    paddingHorizontal: 22,
    borderBottomWidth: 0,
    paddingLeft: 12,
  },
  iconX: {
    width: 10,
    height: 10,
    color: palette.gray,
  },
  notAccetedView: {
    flexDirection: 'row',
    width: 84,
    justifyContent: 'space-between',
  },
  acceptButton: {
    width: 38,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.orange,
    backgroundColor: '#ffffff00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    elevation: 0,
  },
  declineButton: {
    width: 38,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gray,
    backgroundColor: '#ffffff00',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    elevation: 0,
  },
});
const frineds_list_data = [
  {
    name: '상큼한 딸기',
    age: 24,
    belong: '삼성물산',
    department: '',
    location: '서울',
    image: require('~/images/test-user-profile-6.png'),
  },
  {
    name: '안암불주먹',
    age: 24,
    belong: '고려대',
    department: '의과병원',
    location: '서울',
    image: require('~/images/test-user-profile-7.png'),
  },
  {
    name: '연남도끼',
    age: 24,
    belong: '프리랜서',
    department: '디자이너',
    location: '서울',
    image: require('~/images/test-user-profile-8.png'),
  },
  {
    name: 'Jane Park',
    age: 24,
    belong: '5급 공무원',
    department: '',
    location: '서울',
    image: require('~/images/test-user-profile-6.png'),
  },
];
export default FriendsView;
