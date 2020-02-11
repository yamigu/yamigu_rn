import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Button, ListItem, List, Body, Icon, Right} from 'native-base';
import ProfileCard from '../common/ProfileCard';
import Octionicon from 'react-native-vector-icons/Octicons';
const FriendsView = ({navigation}) => {
  const [numOfFriends, setNumOfFriends] = useState(0);

  return (
    <View style={styles.container}>
      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 21}}>
        내 친구들
      </CustomTextMedium>
      {numOfFriends > 0 ? (
        <List>
          {frineds_list_data.map(friend => (
            <ListItem noIndent style={styles.friendsListItem}>
              <Body>
                <ProfileCard
                  size={50}
                  fontSizes={[14, 12, 12]}
                  nickname={friend.name}
                  image={friend.image}
                  age={friend.age}
                  belong={friend.belong}
                  department={friend.department}
                  location={friend.location}
                />
              </Body>
              <Right>
                <Octionicon name="x" style={styles.iconX} />
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
  },
  iconX: {
    width: 10,
    height: 10,
    color: palette.gray,
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
