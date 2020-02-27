import React, {useState} from 'react';
import {Text, View, StyleSheet, Switch, Alert} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {Content, List, ListItem, Body, Right} from 'native-base';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';

import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

// async function onLogout() {
// const appleAuthRequestResponse = await appleAuth.performRequest({
//   requestedOperation: AppleAuthRequestOperation.LOGOUT,
// });

// // get current authentication state for user
// const credentialState = await appleAuth.getCredentialStateForUser(
//   appleAuthRequestResponse.user,
// );

// // use credentialState response to ensure the user credential's have been revoked
// if (credentialState === AppleAuthCredentialState.REVOKED) {
//   // user is unauthenticated
//   console.log('un... auth');
// } else {
//   console.log('auth..!?');
// }
// }

const initUserValue = [
  'token',
  'uid',
  'nickname',
  'avata',
  'birthdate',
  'belong',
  'department',
  'profile_list',
  'feed_list',
  'friend_list',
  'yami_number',
];

const SettingScreen = ({navigation}) => {
  const [toggleLike, setToggleLike] = useState(true);
  const [toggleLikeMatch, setToggleLikeMatch] = useState(true);
  const [toggleMeeting, setToggleMeeting] = useState(true);
  const [toggleMatch, setToggleMatch] = useState(true);
  const [toggleChatting, setToggleChatting] = useState(true);

  const logout = async () => {
    axios.defaults.headers.common['Authorization'] = '';
    AsyncStorage.setItem('userValue', JSON.stringify(initUserValue));
  };

  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <List style={styles.list}>
        <ListItem header noIndent style={styles.listItemHeader}>
          <CustomTextMedium size={18} color={palette.black}>
            알림
          </CustomTextMedium>
        </ListItem>

        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => setToggleLike(!toggleLike)}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              좋아요
            </CustomTextRegular>
          </Body>
          <Right style={styles.listItemRight}>
            <Switch
              value={toggleLike}
              onValueChange={() => {
                setToggleLike(!toggleLike);
              }}
              thumbColor="white"
              trackColor={{false: palette.nonselect, true: palette.orange}}
            />
          </Right>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => setToggleLikeMatch(!toggleLikeMatch)}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              좋아요 매칭
            </CustomTextRegular>
          </Body>
          <Right style={styles.listItemRight}>
            <Switch
              value={toggleLikeMatch}
              onValueChange={() => {
                setToggleLikeMatch(!toggleLikeMatch);
              }}
              thumbColor="white"
              trackColor={{false: palette.nonselect, true: palette.orange}}
            />
          </Right>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => setToggleMeeting(!toggleMeeting)}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              미팅 신청
            </CustomTextRegular>
          </Body>
          <Right style={styles.listItemRight}>
            <Switch
              value={toggleMeeting}
              onValueChange={() => {
                setToggleMeeting(!toggleMeeting);
              }}
              thumbColor="white"
              trackColor={{false: palette.nonselect, true: palette.orange}}
            />
          </Right>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => setToggleMatch(!toggleMatch)}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              매칭 성공
            </CustomTextRegular>
          </Body>
          <Right style={styles.listItemRight}>
            <Switch
              value={toggleMatch}
              onValueChange={() => {
                setToggleMatch(!toggleMatch);
              }}
              thumbColor="white"
              trackColor={{false: palette.nonselect, true: palette.orange}}
            />
          </Right>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => setToggleChatting(!toggleChatting)}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              채팅
            </CustomTextRegular>
          </Body>
          <Right style={styles.listItemRight}>
            <Switch
              value={toggleChatting}
              onValueChange={() => {
                setToggleChatting(!toggleChatting);
              }}
              thumbColor="white"
              trackColor={{false: palette.nonselect, true: palette.orange}}
            />
          </Right>
        </ListItem>
        <ListItem header noIndent style={styles.listItemHeader}>
          <CustomTextMedium size={18} color={palette.black}>
            계정 설정
          </CustomTextMedium>
        </ListItem>
        <ListItem noIndent button style={styles.listItem}>
          <Body style={styles.listItemBody}>
            <TouchableByPlatform
              onPress={() =>
                Alert.alert(
                  '정말 로그아웃 하시겠습니까?',
                  '',
                  [
                    {
                      text: '네',
                      onPress: () => {
                        logout().then(() => {
                          navigation.navigate('Main');
                          Alert.alert('로그아웃 되었습니다.');
                          console.log('YES LOGOUT');
                        });
                      },
                    },
                    {
                      text: '아니오',
                      onPress: () => console.log('NOPE'),
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <CustomTextRegular size={14} color={palette.black}>
                로그아웃
              </CustomTextRegular>
            </TouchableByPlatform>
          </Body>
        </ListItem>
        <ListItem noIndent button style={styles.listItem}>
          <Body style={styles.listItemBody}>
            <TouchableByPlatform
              onPress={() =>
                Alert.alert(
                  '정말 탈퇴.. 하시겠습니까?',
                  '',
                  [
                    {
                      text: '네',
                      onPress: () => {
                        navigation.navigate('Main');
                        onLogout();
                        console.log('YES LOGOUT');
                      },
                    },
                    {
                      text: '아니오',
                      onPress: () => console.log('NOPE'),
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <CustomTextRegular size={14} color={palette.black}>
                계정 탈퇴
              </CustomTextRegular>
            </TouchableByPlatform>
          </Body>
        </ListItem>
      </List>
    </Content>
  );
};
SettingScreen.navigationOptions = ({navigation}) => ({
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
      설정
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
  list: {
    backgroundColor: 'white',
  },
  listItem: {
    paddingLeft: 28,
    borderBottomWidth: 3,
    borderColor: palette.default_bg,
  },
  listItemHeader: {
    paddingTop: 20,
    paddingBottom: 6,
    borderBottomWidth: 0,
    backgroundColor: palette.default_bg,
  },
  listItemBody: {},
  listItemRight: {},
});
export default SettingScreen;
