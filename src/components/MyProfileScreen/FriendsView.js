import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Button, ListItem, List, Body, Icon, Right} from 'native-base';
import ProfileCard from '../common/ProfileCard';
import Octionicon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import TouchableByPlatform from '../common/TouchableByPlatform';
import '~/config';

const FriendsView = ({navigation}) => {
  const [numOfFriends, setNumOfFriends] = useState(0);
  const [friendList, setFriendList] = useState([]);
  const nowYear = 20200000;

  useEffect(() => {
    axios.get(global.config.api_host + 'core/friends/').then(result => {
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

  const patchFriendStatus = (id, action, approved) => {
    let text = '';
    if (action === 'APPROVE') text = '친구 요청을 수락하시겠어요?';
    else if (action === 'DELETE') {
      if (!approved) text = '친구 요청을 거절하시겠어요?';
      else text = '정말 친구를 삭제하시겠습니까?';
    } else if (action === 'CANCEL') text = '친구 요청을 취소하시겠어요?';
    Alert.alert(
      text,
      '',
      [
        {
          text: '네',
          onPress: () => {
            console.log('OK Pressed');
            axios
              .patch(global.config.api_host + 'core/friend/', {
                id: id,
                action: action,
              })
              .then(() => axios.get(global.config.api_host + 'core/friends/'))
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

  return (
    <View style={styles.container}>
      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 21}}>
        내 친구들
      </CustomTextMedium>
      {friendList.length > 0 ? (
        <List>
          {friendList.map((friend, index) => (
            <ListItem key={index} noIndent style={styles.friendsListItem}>
              <Body>
                {friend.approved === true ? (
                  <ProfileCard
                    verified={friend.user_info.verified}
                    height={friend.user_info.height}
                    uid={friend.user_info.uid}
                    navigation={navigation}
                    location={friend.user_info.location}
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname={friend.user_info.nickname}
                    avata={
                      friend.user_info.avata === null
                        ? null
                        : {uri: friend.user_info.avata}
                    }
                    age={Math.floor(
                      (nowYear - parseInt(friend.user_info.birthdate) + 20000) /
                        10000,
                    )}
                    belong={friend.user_info.belong}
                    department={friend.user_info.department}
                    friend={true}
                  />
                ) : friend.you_sent === true ? (
                  <ProfileCard
                    addF={true}
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname="친구 수락중"
                    // image={require('~/images/test-user-profile-girl.png')}
                    age=""
                    belong=""
                    department={friend.phoneno}
                  />
                ) : (
                  <ProfileCard
                    noTouch={true}
                    size={66}
                    fontSizes={[16, 14, 14]}
                    nickname="친구가 맞나요??"
                    // image={require('~/images/test-user-profile-girl.png')}
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
                    onPress={() =>
                      patchFriendStatus(friend.id, 'DELETE', friend.approved)
                    }>
                    <Octionicon name="x" style={styles.iconX} />
                  </TouchableByPlatform>
                ) : friend.you_sent !== true ? (
                  <View style={styles.notAccetedView}>
                    <Button
                      style={styles.declineButton}
                      onPress={() =>
                        patchFriendStatus(friend.id, 'DELETE', friend.approved)
                      }>
                      <CustomTextRegular size={18} color={palette.gray}>
                        X
                      </CustomTextRegular>
                    </Button>
                    <Button
                      style={styles.acceptButton}
                      onPress={() =>
                        patchFriendStatus(friend.id, 'APPROVE', friend.approved)
                      }>
                      <CustomTextRegular size={18} color={palette.orange}>
                        O
                      </CustomTextRegular>
                    </Button>
                  </View>
                ) : (
                  <TouchableByPlatform
                    onPress={() =>
                      patchFriendStatus(friend.id, 'CANCEL', friend.approved)
                    }>
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
export default FriendsView;
