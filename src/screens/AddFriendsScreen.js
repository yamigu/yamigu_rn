/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import CustomMarker from '~/components/MainScreen/HomePage/CustomMarker';

const AddFriendsScreen = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [friendList, setFriendList] = useState([]);
  const nowYear = 20200000;
  const [numOfFriends, setNumOfFriends] = useState(1);

  const logCallback = (log, callback) => {
    console.log(log);
    callback;
  };
  useEffect(() => {
    axios.get('http://13.124.126.30:8000/core/friends/').then(result => {
      let tmpNo = 0;
      console.log(result.data);
      result.data.map(item => {
        if (item.approved === true) {
          tmpNo++;
        }
      });
      setNumOfFriends(tmpNo);
      setFriendList(result.data);
    });
  }, []);

  const patchFriendStatus = (id, action) => {
    Alert.alert(
      '정말 친구를 삭제하시겠습니까?',
      '',
      [
        {
          text: '네',
          onPress: () => {
            console.log('OK Pressed');
            axios
              .patch('http://13.124.126.30:8000/core/friend/', {
                id: id,
                action: action,
              })
              .then(() => axios.get('http://13.124.126.30:8000/core/friends/'))
              .then(result => {
                console.log(result.data);
                setFriendList(result.data);
              });
          },
        },
        {text: '아니오', onPress: () => console.log('Cancel Pressed')},
      ],
      {cancelable: false},
    );
  };

  const addFriend = phone => {
    console.log('inputValue');
    console.log(inputValue);

    axios
      .post('http://13.124.126.30:8000/core/friend/', {
        phoneno: inputValue,
      })
      .then(result => {
        if (result.data === 'successfully requested') {
          setLoginLoading(false);
          console.log('add friend successed.');
        } else {
          console.log('add friend failed.');
          setLoginLoading(false);
        }
      })
      .then(() => axios.get('http://13.124.126.30:8000/core/friends/'))
      .then(result => {
        console.log(result.data);
        setFriendList(result.data);
      });
  };

  return (
    <Content style={styles.container} showsVerticalScrollIndicator={false}>
      <Spinner
        visible={loginLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
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
        onChange={item => {
          if (isNaN(item.nativeEvent.text)) {
            Alert.alert('no string man');
            setInputValue('');
          } else {
            setInputValue(item.nativeEvent.text);
          }
        }}
      />
      <Button style={styles.button} onPress={() => addFriend(inputValue)}>
        <CustomTextMedium size={14} color="white">
          친구 등록하기
        </CustomTextMedium>
      </Button>
      <CustomTextMedium size={18} color={palette.black} style={{marginTop: 5}}>
        내 친구들 {numOfFriends}명
      </CustomTextMedium>
      {friendList.length > 0 ? (
        <List>
          {friendList.map((friend, index) => (
            <ListItem key={index} noIndent style={styles.friendsListItem}>
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
                    nickname="친구 수락중"
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
                  <TouchableByPlatform
                    onPress={() => patchFriendStatus(friend.id, 'DELETE')}>
                    <Octionicon name="x" style={styles.iconX} />
                  </TouchableByPlatform>
                ) : friend.you_sent !== true ? (
                  <View style={styles.notAccetedView}>
                    <Button
                      style={styles.declineButton}
                      onPress={() => patchFriendStatus(friend.id, 'DELETE')}>
                      <CustomTextRegular size={18} color={palette.gray}>
                        X
                      </CustomTextRegular>
                    </Button>
                    <Button
                      style={styles.acceptButton}
                      onPress={() => patchFriendStatus(friend.id, 'APPROVE')}>
                      <CustomTextRegular size={18} color={palette.orange}>
                        O
                      </CustomTextRegular>
                    </Button>
                  </View>
                ) : (
                  <TouchableByPlatform
                    onPress={() => patchFriendStatus(friend.id, 'CANCEL')}>
                    <Octionicon name="x" style={styles.iconX} />
                  </TouchableByPlatform>
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
    borderRadius: 5,
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
  spinnerTextStyle: {
    color: '#FFF',
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
