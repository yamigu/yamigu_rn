/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useFocusEffect,
  useEffect,
  useLayoutEffect,
} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {
  CustomTextRegular,
  CustomTextBold,
  CustomTextMedium,
} from '../common/CustomText';
import {
  Thumbnail,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Row,
  Button,
} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import Materialicon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityicon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '~/lib/styles/palette';
import {CustomSwitch} from '../common/CustomSwtich';
import TouchableByPlatform from '../common/TouchableByPlatform';
import Navigation from '~/../Navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import KakaoSDK from '@actbase/react-native-kakaosdk';
import AsyncStorage from '@react-native-community/async-storage';
import {getProfile, login} from '@react-native-seoul/kakao-login';
import '~/config';
import {useCallback} from 'react';
const deviceWidth = Dimensions.get('window').width;
const SideMenu = ({navigation}) => {
  const gotoChat = () => {
    console.log('sdk : ' + KakaoSDK.Channel.chat);
    KakaoSDK.Channel.chat('_xjxamkT')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };
  const nicknameCheck = () => {
    return (
      sideInfo[global.config.user_info_const.NICKNAME] === 'nickname' ||
      sideInfo[global.config.user_info_const.NICKNAME] === '' ||
      sideInfo[global.config.user_info_const.NICKNAME] === null
    );
  };
  const birthdateCheck = () => {
    return (
      sideInfo[global.config.user_info_const.BIRTHDATE] === 'birthdate' ||
      sideInfo[global.config.user_info_const.BIRTHDATE] === '' ||
      sideInfo[global.config.user_info_const.BIRTHDATE] === null
    );
  };
  const [toggle, setToggle] = useState(false);
  const [numOfFreinds, setNumOfFriends] = useState(0);

  const [sideInfo, setSideInfo] = useState([]);
  // 'token',     'uid',        'nickname',   'avata',
  // 'birhdate',  'belong',     'department', 'profile_list',
  // 'feed_list', 'friend_list','yami_number',
  const _retrieveData = async () => {
    console.log('sidemenu retrieve!!');
    try {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      console.log(jUserValue);
      if (userValue !== null) {
        //console.log('qweqwe');
        setSideInfo(jUserValue);
      } else {
        console.log('asdasd');
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (navigation.state.isDrawerOpen) {
      if (navigation.state.routes[navigation.state.index].index !== 0) {
        navigation.closeDrawer();
      } else {
        _retrieveData();
      }
    }
  }, [navigation]);

  return navigation.state.routes[navigation.state.index].index !== 0 ? null : (
    <SafeAreaView style={styles.root}>
      <Content showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          {/* <TouchableByPlatform onPress={() => navigation.navigate('Signup')}>
        <ImageBackground
          style={styles.profileBackground}
          source={require('~/images/profile-default-background.png')}>
          <CustomTextRegular size={16} color="white">
            친구들과 찍은 사진을 올려보세요!
          </CustomTextRegular>
          <Image
            source={require('~/images/icon-picture.png')}
            style={styles.icon}
          />
        </ImageBackground>
      </TouchableByPlatform> */}
          <View style={styles.profilePane}>
            <View style={styles.profileWrapper}>
              <View style={styles.thumbnailWrapper}>
                <TouchableByPlatform
                  onPress={() =>
                    nicknameCheck()
                      ? navigation.navigate('Login')
                      : birthdateCheck()
                      ? navigation.navigate('IV', {
                          needBtn: true,
                        })
                      : navigation.navigate('MyProfile')
                  }>
                  <Thumbnail
                    style={styles.thumbnail}
                    source={
                      sideInfo[global.config.user_info_const.AVATA] ===
                        'avata' ||
                      sideInfo[global.config.user_info_const.AVATA] === '' ||
                      sideInfo[global.config.user_info_const.AVATA] === null
                        ? require('~/images/user-default-profile.png')
                        : {uri: sideInfo[global.config.user_info_const.AVATA]}
                    }
                  />
                </TouchableByPlatform>
              </View>
              <Image
                source={require('~/images/pencil.png')}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  width: deviceWidth * 0.813 * 0.3934 * 0.25,
                  height: deviceWidth * 0.813 * 0.3934 * 0.25,
                  bottom: 0,
                  alignSelf: 'flex-end',
                }}
              />
            </View>
          </View>

          <View style={styles.nameAndAgeView}>
            <CustomTextBold size={18} color={palette.black}>
              {nicknameCheck() ? (
                <CustomTextBold size={18} color={palette.black}>
                  로그인이 필요합니다!
                </CustomTextBold>
              ) : (
                sideInfo[global.config.user_info_const.NICKNAME]
              )}
            </CustomTextBold>
            <CustomTextMedium
              size={14}
              color={palette.black}
              style={{marginLeft: 6}}>
              {birthdateCheck()
                ? null
                : Math.floor(
                    (20200000 -
                      parseInt(
                        sideInfo[global.config.user_info_const.BIRTHDATE],
                      )) /
                      10000 +
                      2,
                  ) + '살'}
            </CustomTextMedium>
            {/* <CustomTextMedium
          size={14}
          color={palette.black}
          style={{marginLeft: 0}}>
          살
        </CustomTextMedium> */}
          </View>
          <View style={styles.belongView}>
            {nicknameCheck() ? (
              <Button
                style={{backgroundColor: palette.default_bg, elevation: 0}}
                onPress={() => navigation.navigate('Login')}>
                <CustomTextRegular size={14} color={palette.black}>
                  로그인 하기
                </CustomTextRegular>
              </Button>
            ) : (
              <CustomTextRegular size={14} color={palette.gray}>
                {sideInfo[global.config.user_info_const.BELONG] === 'belong'
                  ? null
                  : sideInfo[global.config.user_info_const.BELONG] + ' '}
              </CustomTextRegular>
            )}
            <CustomTextRegular size={14} color={palette.gray}>
              {sideInfo[global.config.user_info_const.DEPARTMENT] ===
              'department'
                ? null
                : sideInfo[global.config.user_info_const.DEPARTMENT]}
            </CustomTextRegular>
            <CustomTextRegular size={14} color={palette.gray}>
              {sideInfo[global.config.user_info_const.LOCATION] ===
                'location' ||
              sideInfo[global.config.user_info_const.LOCATION] === null ||
              sideInfo[global.config.user_info_const.LOCATION] === undefined
                ? null
                : ', ' + sideInfo[10]}
            </CustomTextRegular>
          </View>
        </View>
        <List style={styles.list}>
          {sideInfo[global.config.user_info_const.VERIFIED] === 0 ? (
            <TouchableByPlatform
              onPress={() => {
                nicknameCheck()
                  ? navigation.navigate('Login')
                  : birthdateCheck()
                  ? navigation.navigate('IV', {
                      needBtn: true,
                    })
                  : navigation.navigate('BV');
              }}>
              <ListItem icon noIndent style={styles.listItem}>
                <Left style={styles.listItemLeft}>
                  <Anticon
                    name="exclamationcircle"
                    style={styles.iconWarning}
                    size={deviceWidth * 0.813 * 0.06}
                  />
                </Left>
                <Body style={styles.listItemBody}>
                  <CustomTextRegular size={14} color={palette.red}>
                    소속 인증하기
                  </CustomTextRegular>
                </Body>
              </ListItem>
            </TouchableByPlatform>
          ) : null}

          {!nicknameCheck() && birthdateCheck() ? (
            <TouchableByPlatform
              onPress={() => {
                navigation.navigate('IV', {needBtn: true});
                console.log('goto IV');
              }}>
              <ListItem icon noIndent style={styles.listItem}>
                <Left style={styles.listItemLeft}>
                  <Anticon
                    name="exclamationcircle"
                    style={styles.iconWarning}
                    size={deviceWidth * 0.813 * 0.06}
                  />
                </Left>
                <Body style={styles.listItemBody}>
                  <CustomTextRegular size={14} color={palette.red}>
                    본인 인증하기
                  </CustomTextRegular>
                </Body>
              </ListItem>
            </TouchableByPlatform>
          ) : null}

          {sideInfo[global.config.user_info_const.AVATA] === 'avata' ||
          sideInfo[global.config.user_info_const.AVATA] === null ? (
            <TouchableByPlatform
              navigation={navigation}
              onPress={() =>
                sideInfo[global.config.user_info_const.NICKNAME] ===
                  'nickname' ||
                sideInfo[global.config.user_info_const.NICKNAME] === '' ||
                sideInfo[global.config.user_info_const.NICKNAME] === null
                  ? navigation.navigate('Login')
                  : birthdateCheck()
                  ? navigation.navigate('IV', {
                      needBtn: true,
                    })
                  : navigation.navigate('MyProfile')
              }>
              <ListItem icon noIndent style={styles.listItem}>
                <Left style={styles.listItemLeft}>
                  <Anticon
                    name="exclamationcircle"
                    style={styles.iconWarning}
                    size={deviceWidth * 0.813 * 0.06}
                  />
                </Left>
                <Body style={styles.listItemBody}>
                  <CustomTextRegular size={14} color={palette.red}>
                    프로필 사진 등록하기
                  </CustomTextRegular>
                </Body>
              </ListItem>
            </TouchableByPlatform>
          ) : null}
          <TouchableByPlatform
            onPress={() =>
              nicknameCheck()
                ? navigation.navigate('Login')
                : birthdateCheck()
                ? navigation.navigate('IV', {
                    needBtn: true,
                  })
                : navigation.navigate('AddFriends')
            }>
            <ListItem icon noIndent style={styles.listItem}>
              <Left style={styles.listItemLeft}>
                <Image
                  source={require('~/images/addfriend_icon.png')}
                  style={styles.iconAddFriend}
                />
              </Left>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.orange}>
                  내 친구 추가하기
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <CustomTextRegular size={14} color={palette.orange[0]}>
                  {sideInfo[global.config.user_info_const.NEW_FRIEND_REQUESTS] >
                  0
                    ? 'new'
                    : null}
                </CustomTextRegular>
              </Right>
            </ListItem>
          </TouchableByPlatform>

          <ListItem noIndent style={styles.friendListPane}>
            <Body style={styles.listItemBody}>
              {/* {numOfFreinds === 0 ? ( */}
              <View style={styles.noFriend}>
                <CustomTextRegular
                  size={12}
                  color={palette.black}
                  style={{marginBottom: 5}}>
                  친구 추가하고 무료야미 받아가세요!
                </CustomTextRegular>
              </View>
              {/* ) : (
            <Content contentContainerStyle={styles.friendList}>
              <Thumbnail
                source={require('~/images/test-user-profile-2.png')}
                style={styles.friend}
                size={deviceWidth * 0.81 * 0.163}
              />
              <Thumbnail
                source={require('~/images/test-user-profile-3.png')}
                style={styles.friend}
                size={deviceWidth * 0.81 * 0.163}
              />
              <Thumbnail
                source={require('~/images/test-user-profile-4.png')}
                style={styles.friend}
                size={deviceWidth * 0.81 * 0.163}
              />
              <Thumbnail
                source={require('~/images/test-user-profile-5.png')}
                style={styles.friend}
                size={deviceWidth * 0.81 * 0.163}
              />
            </Content>
          )} */}
            </Body>
          </ListItem>
          {/* <TouchableByPlatform onPress={() => navigation.navigate('Signup')}>
        <ListItem icon noIndent style={styles.listItem}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              (임시) 회원가입
            </CustomTextRegular>
          </Body>
        </ListItem>
      </TouchableByPlatform> */}
          <TouchableByPlatform
            onPress={() =>
              nicknameCheck()
                ? navigation.navigate('Login')
                : birthdateCheck()
                ? navigation.navigate('IV', {
                    needBtn: true,
                  })
                : navigation.navigate('Store')
            }>
            <ListItem icon noIndent style={styles.listItem}>
              <Left style={styles.listItemLeft}>
                <Materialicon
                  name="store"
                  size={deviceWidth * 0.813 * 0.06}
                  style={styles.iconStore}
                />
              </Left>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  야미 스토어
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <Image
                  style={styles.iconYami}
                  source={require('~/images/yami_icon.png')}
                />
                <CustomTextRegular size={12} color={palette.black}>
                  {sideInfo[global.config.user_info_const.YAMI] === 'yami'
                    ? null
                    : sideInfo[global.config.user_info_const.YAMI]}
                </CustomTextRegular>
              </Right>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform
            onPress={() =>
              nicknameCheck()
                ? navigation.navigate('Login')
                : birthdateCheck()
                ? navigation.navigate('IV', {
                    needBtn: true,
                  })
                : navigation.navigate('Shield')
            }>
            <ListItem icon noIndent style={styles.listItem}>
              <Left style={styles.listItemLeft}>
                <MaterialCommunityicon
                  name="shield-account"
                  size={deviceWidth * 0.813 * 0.06}
                  style={styles.iconStore}
                />
              </Left>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  아는 사람 피하기
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          {/* <ListItem
        button
        icon
        noIndent
        style={styles.listItem}
        onPress={() => {
          setToggle(!toggle);
        }}>
        <Left style={styles.listItemLeft}>
          <MaterialCommunityicon
            name="shield-check"
            size={deviceWidth * 0.813 * 0.06}
            style={styles.iconStore}
          />
        </Left>
        <Body style={styles.listItemBody}>
          <CustomTextRegular size={14} color={palette.black}>
            전공 또는 직업 가리기
          </CustomTextRegular>
        </Body>
        <Right style={styles.listItemRight}>
          <Switch
            value={toggle}
            onValueChange={() => {
              setToggle(!toggle);
            }}
            thumbColor="white"
            trackColor={{false: palette.nonselect, true: palette.orange}}
          />
        </Right>
      </ListItem> */}

          <ListItem itemDivider style={styles.itemDivider}>
            <CustomTextMedium
              size={24}
              color={palette.black}
              style={{paddingTop: 25}}>
              더보기
            </CustomTextMedium>
          </ListItem>
          <TouchableByPlatform onPress={() => navigation.navigate('Guide')}>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  야미구 이용 방법
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform onPress={() => gotoChat()}>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  1:1 질문하기
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <Image
                  style={styles.iconKakao}
                  source={require('~/images/icon-kakao-with-bg.png')}
                />
              </Right>
            </ListItem>
          </TouchableByPlatform>
          {/* <TouchableByPlatform onPress={() => navigation.navigate('Login')}>
        <ListItem noIndent style={styles.listItem}>
          <Body style={styles.listItemBody}>
            <CustomTextRegular size={14} color={palette.black}>
              (임시) 로그인 화면
            </CustomTextRegular>
          </Body>
        </ListItem>
      </TouchableByPlatform> */}
          <TouchableByPlatform onPress={() => navigation.navigate('Notice')}>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  공지사항
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform
            onPress={() =>
              nicknameCheck()
                ? navigation.navigate('Login')
                : birthdateCheck()
                ? navigation.navigate('IV', {
                    needBtn: true,
                  })
                : navigation.navigate('Setting')
            }>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  설정
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>

          <ListItem itemDivider style={styles.itemDivider}>
            <CustomTextMedium
              size={24}
              color={palette.black}
              style={{paddingTop: 25}}>
              정보
            </CustomTextMedium>
          </ListItem>
          <TouchableByPlatform>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  앱 버전
                </CustomTextRegular>
              </Body>
              <Right style={styles.listItemRight}>
                <CustomTextRegular size={14} color={palette.orange}>
                  {global.config.app_version}
                </CustomTextRegular>
              </Right>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform onPress={() => navigation.navigate('Privacy')}>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  개인정보 취급방침
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform onPress={() => navigation.navigate('Terms')}>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  서비스 이용 약관
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
        </List>
      </Content>
      {/* <Text onPress={() => props.navigation.navigate('Signup')}>asd</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: deviceWidth * 0.813,

    backgroundColor: palette.default_bg,
  },
  profileView: {},
  profileBackground: {
    width: '100%',
    height: deviceWidth * 0.813 * 0.702,
    paddingTop: deviceWidth * 0.813 * 0.702 * 0.285,
    alignItems: 'center',
    overflow: 'visible',
  },
  icon: {
    marginTop: deviceWidth * 0.813 * 0.702 * 0.037,
  },
  profilePane: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
  },
  profileWrapper: {
    width: deviceWidth * 0.813 * 0.3934,
    height: deviceWidth * 0.813 * 0.3934,
  },
  thumbnailWrapper: {
    backgroundColor: palette.default_bg,
    width: deviceWidth * 0.813 * 0.3934,
    height: deviceWidth * 0.813 * 0.3934,
    borderRadius: deviceWidth * 0.813 * 0.3934 * 0.5,
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  thumbnail: {
    borderRadius: deviceWidth * 0.813 * 0.3934 * 0.5,
    width: deviceWidth * 0.813 * 0.3934,
    height: deviceWidth * 0.813 * 0.3934,
    alignSelf: 'center',
  },
  nameAndAgeView: {
    marginTop: deviceWidth * 0.813 * 0.3934 * 0.1291,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  belongView: {
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    marginTop: deviceWidth * 0.81 * 0.0393,
    backgroundColor: 'white',
    paddingBottom: 0,
    marginBottom: 0,
  },
  listItem: {
    width: deviceWidth * 0.813,
    paddingRight: 0,
    borderBottomWidth: 3,
    borderColor: palette.default_bg,
  },
  listItemLeft: {},
  listItemBody: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemRight: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    overflow: 'visible',
    borderBottomWidth: 0,
  },
  listItemButton: {
    flex: 1,
    backgroundColor: '#ffffff00',
    width: deviceWidth * 0.813,
    elevation: 0,
  },
  iconWarning: {
    color: palette.red,
  },
  iconAddFriend: {
    width: deviceWidth * 0.81 * 0.056,
    height: deviceWidth * 0.81 * 0.056,
  },
  iconYami: {
    width: deviceWidth * 0.81 * 0.056,
    height: deviceWidth * 0.81 * 0.056,
    marginRight: 5,
    resizeMode: 'contain',
  },
  iconKakao: {
    width: deviceWidth * 0.81 * 0.056,
    height: deviceWidth * 0.81 * 0.056,
  },
  iconStore: {
    color: palette.black,
  },
  friendListPane: {
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: palette.default_bg,
  },
  friendList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friend: {
    marginLeft: deviceWidth * 0.81 * 0.039,
    borderRadius: deviceWidth * 0.81 * 0.3934 * 0.5,
  },
  noFriend: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDivider: {
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
export default SideMenu;
