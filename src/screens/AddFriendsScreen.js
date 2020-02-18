/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import Octionicon from 'react-native-vector-icons/Octicons';
import {List, ListItem, Body, Right, Button, Content, Input} from 'native-base';
import ProfileCard from '~/components/common/ProfileCard';

const AddFriendsScreen = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');

  const [numOfFriends, setNumOfFriends] = useState(1);
  return (
    <Content style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomTextMedium size={18} color={palette.black}>
        친구를 등록해서
      </CustomTextMedium>
      <CustomTextMedium size={18} color={palette.black}>
        야미도 받고 친구 자랑도 해보세요!
      </CustomTextMedium>
      <View style={styles.descTextView}>
        <CustomTextRegular size={12} color={palette.sub}>
          등록한 번호의 친구가 가입 승인이 완료되면{' '}
        </CustomTextRegular>
        <CustomTextRegular size={12} color={palette.orange}>
          야미 10개씩 드려요.
        </CustomTextRegular>
        <CustomTextRegular size={12} color={palette.sub}>
          실제 친구 등록을 위해 연락처를 사용하고 있어요.
        </CustomTextRegular>
      </View>
      <Input
        placeholder=" 친구 번호를 등록 해 주세요"
        color="#eeeeee"
        style={styles.messageInput}
        value={inputValue}
        onChange={item => setInputValue(item)}
      />
      <Button
        style={styles.button}
        onPress={() => {
          Alert.alert('친구 신청이 완료되었습니다!');
          setInputValue('');
        }}>
        <CustomTextMedium size={14} color="white">
          친구 등록하기
        </CustomTextMedium>
      </Button>
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
                {friend.accepted ? (
                  <Octionicon name="x" style={styles.iconX} />
                ) : (
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
    </Content>
  );
};
AddFriendsScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor={palette.black}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      내 친구 등록하기
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  descTextView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  button: {
    width: '100%',
    height: 48,
    marginVertical: 12,
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
  messageInput: {
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 14,
    padding: 0,
    margin: 0,
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
    accepted: true,
  },
  {
    name: '안암불주먹',
    age: 24,
    belong: '고려대',
    department: '의과병원',
    location: '서울',
    image: require('~/images/test-user-profile-7.png'),
    accepted: true,
  },
  {
    name: '연남도끼',
    age: 24,
    belong: '프리랜서',
    department: '디자이너',
    location: '서울',
    image: require('~/images/test-user-profile-8.png'),
    accepted: false,
  },
  {
    name: 'Jane Park',
    age: 24,
    belong: '5급 공무원',
    department: '',
    location: '서울',
    image: require('~/images/test-user-profile-6.png'),
    accepted: true,
  },
];
export default AddFriendsScreen;
