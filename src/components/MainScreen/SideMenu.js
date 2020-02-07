/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
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
} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import Materialicon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityicon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '~/lib/styles/palette';
import {CustomSwitch} from '../common/CustomSwtich';
import TouchableByPlatform from '../common/TouchableByPlatform';
import Navigation from '~/../Navigation';
const deviceWidth = Dimensions.get('window').width;
const SideMenu = ({navigation}) => {
  const [toggle, setToggle] = useState(false);
  const [numOfFreinds, setNumOfFriends] = useState(0);

  return (
    <SafeAreaView style={styles.root}>
      <Content showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <TouchableByPlatform onPress={() => navigation.navigate('Signup')}>
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
          </TouchableByPlatform>
          <View style={styles.thumbnailWrapper}>
            <TouchableByPlatform
              onPress={() => navigation.navigate('MyProfile')}>
              <Thumbnail
                style={styles.thumbnail}
                source={require('~/images/test-user-profile-1.png')}
              />
            </TouchableByPlatform>
          </View>
          <View style={styles.nameAndAgeView}>
            <CustomTextBold size={18} color={palette.black}>
              또잉또잉또잉
            </CustomTextBold>
            <CustomTextMedium
              size={14}
              color={palette.black}
              style={{marginLeft: 6}}>
              24살
            </CustomTextMedium>
          </View>
          <View style={styles.belongView}>
            <CustomTextRegular size={14} color={palette.gray}>
              서울대 자유전공학부, 서울
            </CustomTextRegular>
          </View>
        </View>
        <List style={styles.list}>
          <TouchableByPlatform>
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
          <TouchableByPlatform onPress={() => navigation.navigate('MyProfile')}>
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
                  프로필 완성하기 (0/3)
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform>
            <ListItem icon noIndent style={styles.listItem}>
              <Left style={styles.listItemLeft}>
                <Image
                  source={require('~/images/icon-add-friend.png')}
                  style={styles.iconAddFriend}
                />
              </Left>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.orange}>
                  내 친구 등록하기
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <ListItem noIndent style={styles.friendListPane}>
            <Body style={styles.listItemBody}>
              {numOfFreinds === 0 ? (
                <View style={styles.noFriend}>
                  <CustomTextRegular size={12} color={palette.black}>
                    야미가 부족하세요? 친구를 등록하고 받아가세요!
                  </CustomTextRegular>
                </View>
              ) : (
                <Content
                  horizontal={true}
                  contentContainerStyle={styles.friendList}>
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
              )}
            </Body>
          </ListItem>
          <TouchableByPlatform>
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
                  source={require('~/images/icon-yami.png')}
                />
                <CustomTextRegular size={12} color={palette.black}>
                  10
                </CustomTextRegular>
              </Right>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform>
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
          <ListItem icon noIndent style={styles.listItem}>
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
              <CustomSwitch
                onPress={() => setToggle(!toggle)}
                toggleState={toggle}
                size={deviceWidth * 0.813 * 0.0524}
              />
            </Right>
          </ListItem>

          <ListItem itemDivider style={styles.itemDivider}>
            <CustomTextMedium size={24} color={palette.black}>
              더보기
            </CustomTextMedium>
          </ListItem>
          <TouchableByPlatform>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  미팅하는 방법
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform>
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
          <TouchableByPlatform>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  공지사항
                </CustomTextRegular>
              </Body>
            </ListItem>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  설정
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <ListItem itemDivider style={styles.itemDivider}>
            <CustomTextMedium size={24} color={palette.black}>
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
                  1.0.0
                </CustomTextRegular>
              </Right>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  개인정보 취급방침
                </CustomTextRegular>
              </Body>
            </ListItem>
          </TouchableByPlatform>
          <TouchableByPlatform>
            <ListItem noIndent style={styles.listItem}>
              <Body style={styles.listItemBody}>
                <CustomTextRegular size={14} color={palette.black}>
                  서비스 이용약관
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
  thumbnailWrapper: {
    width: deviceWidth * 0.813 * 0.3934,
    height: deviceWidth * 0.813 * 0.3934,
    borderRadius: deviceWidth * 0.813 * 0.3934 * 0.5,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: -deviceWidth * 0.813 * 0.3934 * 0.75,
  },
  thumbnail: {
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
    alignItems: 'center',
  },
  list: {
    marginTop: deviceWidth * 0.81 * 0.0393,
  },
  listItem: {
    marginTop: deviceWidth * 0.81 * 0.009,
    backgroundColor: 'white',
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
    paddingRight: 0,
    paddingLeft: 0,
    alignSelf: 'center',
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
    marginTop: deviceWidth * 0.81 * 0.009,
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
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
    marginTop: deviceWidth * 0.81 * 0.039,
  },
});
export default SideMenu;
