import React, {useState, useEffect} from 'react';
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
import KakaoLogins from '@react-native-seoul/kakao-login';
import {NavigationActions, StackActions} from 'react-navigation';

const initUserValue = [
  'token',
  'uid',
  'nickname',
  'avata',
  'birthdate',
  'belong',
  'department',
  'gender',
  'verified',
  'yami',
  'location',
  'height',
];
const notiListData = [
  {
    name: 'like',
    display: '좋아요',
    value: true,
  },
  {
    name: 'like_match',
    display: '좋아요 매칭',
    value: true,
  },
  {
    name: 'request',
    display: '대화 신청',
    value: true,
  },
  {
    name: 'match',
    display: '매칭 성공',
    value: true,
  },
  {
    name: 'chat',
    display: '채팅',
    value: true,
  },
];
const SettingScreen = ({navigation}) => {
  const [notiList, setNotiList] = useState(notiListData);

  const logout = () => {
    return new Promise((resolve, reject) => {
      axios
        .post('http://13.124.126.30:8000/authorization/logout/')
        .then(async result => {
          axios.defaults.headers.common['Authorization'] = '';
          AsyncStorage.setItem('userValue', JSON.stringify(initUserValue));
          try {
            await KakaoLogins.logout();
          } catch {
            await appleAuth.performRequest({
              requestedOperation: AppleAuthRequestOperation.LOGOUT,
            });
          }
          resolve(true);
        });
    });
  };

  useEffect(() => {
    axios
      .get('http://13.124.126.30:8000/core/toggle_notification/')
      .then(result => {
        const newData = [...notiListData];
        newData.map(item => {
          item.value = result.data[item.name];
        });
        setNotiList(newData);
      });
  }, []);

  const notiStatusChanged = index => {
    let tmpList = [...notiList];
    axios
      .post('http://13.124.126.30:8000/core/toggle_notification/', {
        what: notiList[index].name,
      })
      .then(result => {
        tmpList[index].value = result.data;
        setNotiList(tmpList);
      })
      .catch(error => {
        console.log(error);
      });
    //axios.patch(auth/user/noti, {code===index})
  };

  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <List style={styles.list}>
        <ListItem header noIndent style={styles.listItemHeader}>
          <CustomTextMedium size={18} color={palette.black}>
            알림
          </CustomTextMedium>
        </ListItem>

        {notiList.map((item, index) => {
          return (
            <ListItem
              noIndent
              button
              style={styles.listItem}
              onPress={() => {
                notiStatusChanged(index);
              }}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  {item.display}
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <Switch
                  value={item.value}
                  onValueChange={() => {
                    notiStatusChanged(index);
                  }}
                  thumbColor="white"
                  trackColor={{false: palette.nonselect, true: palette.orange}}
                />
              </Right>
            </ListItem>
          );
        })}
        <ListItem header noIndent style={styles.listItemHeader}>
          <CustomTextMedium size={18} color={palette.black}>
            계정 설정
          </CustomTextMedium>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() =>
            Alert.alert(
              '정말 로그아웃 하시겠습니까?',
              '',
              [
                {
                  text: '아니오',
                  onPress: () => console.log('NOPE'),
                },
                {
                  text: '네',
                  onPress: () => {
                    logout().then(() => {
                      navigation.dispatch(
                        StackActions.reset({
                          key: null,
                          index: 0,
                          actions: [
                            NavigationActions.navigate({routeName: 'Main'}),
                          ],
                        }),
                      );
                      Alert.alert('로그아웃 되었습니다.');
                      console.log('YES LOGOUT');
                    });
                  },
                },
              ],
              {cancelable: false},
            )
          }>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              로그아웃
            </CustomTextRegular>
          </Body>
        </ListItem>
        <ListItem
          noIndent
          button
          style={styles.listItem}
          onPress={() => navigation.navigate('Getout')}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              계정 탈퇴
            </CustomTextRegular>
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
  listItemBody: {
    paddingTop: 0,
  },
  listItemRight: {},
});
export default SettingScreen;
