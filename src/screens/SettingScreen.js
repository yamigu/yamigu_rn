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
];

const SettingScreen = ({navigation}) => {
  const [notiBoolList, setNotiBoolList] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const notiTypeList = [
    '좋아요',
    '좋아요 매칭',
    '대화 신청',
    '매칭 성공',
    '채팅',
  ];

  const logout = async () => {
    axios.defaults.headers.common['Authorization'] = '';
    AsyncStorage.setItem('userValue', JSON.stringify(initUserValue));
  };

  useEffect(() => {
    //axios.get(auth/user/noti).then(()=>setNotiBoolList)
  }, []);

  const notiStatusChanged = index => {
    let tmpList = [...notiBoolList];
    tmpList[index] = !tmpList[index];
    setNotiBoolList(tmpList);
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

        {notiTypeList.map((item, index) => {
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
                  {item}
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <Switch
                  value={notiBoolList[index]}
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
                      navigation.navigate('Login');
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
          onPress={() =>
            Alert.alert(
              '정말 탈퇴.. 하시겠습니까?',
              '',
              [
                {
                  text: '네',
                  onPress: () => {
                    navigation.navigate('Main');
                    //axios로 서버에 쏴주기
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
