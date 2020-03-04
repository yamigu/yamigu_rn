/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {
  Icon,
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
} from 'native-base';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from 'react-native-best-viewpager';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import palette from '~/lib/styles/palette';

import ProfileCard from '~/components/common/ProfileCard';
import {HeaderBackButton} from 'react-navigation-stack';
import axios from 'axios';
import SendChatting from '~/components/common/SendChatting';
import Call911Modal from '~/components/common/Call911Modal';
import MoreModal from '~/components/common/MoreModal';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Dimensions.get('window').width;
const nowYear = 20200000;

const ProfileDetailScreen = ({navigation}) => {
  const uid = navigation.getParam('uid');
  const nickname = navigation.getParam('nickname');
  const avata = navigation.getParam('avata');
  const age = navigation.getParam('age');
  const belong = navigation.getParam('belong');
  const department = navigation.getParam('department');
  const bothLike = navigation.getParam('bothLike');
  const myFeed = navigation.getParam('my_feed');
  const liked = navigation.getParam('liked');
  const verified = navigation.getParam('verified');
  const location = navigation.getParam('location');
  const viewpagerIndex = navigation.getParam('viewpagerIndex');

  const [likedState, setLikedState] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [feedList, setFeedList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [call911ModalVisible, setCall911ModalVisible] = useState(false);

  const postLike = () => {
    console.log('like pressed');
    if (likedState === true) {
      // console.log('좋아요 취소');
      axios
        .post(
          'http://13.124.126.30:8000/core/like/' + feedList[0].id + '/cancel/',
        )
        .then(result => {
          console.log(result.data);
          setLikedState(!likedState);
          navigation.getParam('setLiked')(!likedState);
        });
    } else {
      // console.log('좋아요 보내기');
      axios
        .post('http://13.124.126.30:8000/core/like/' + feedList[0].id + '/')
        .then(result => {
          console.log(result.data);
          setLikedState(!likedState);
          navigation.getParam('setLiked')(!likedState);
        });
    }
  };

  const tmp = () => {
    setMoreModalVisible(true);
  };
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('userValue');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  useEffect(() => {
    navigation.setParams({
      setModal: tmp,
    });
    console.log(liked);
    setLikedState(liked);
    axios
      .get('http://13.124.126.30:8000/core/feed/' + uid + '/')
      .then(result => {
        // console.log(result.data);
        let tmpFeedList = [];

        result.data.map((item, index) => {
          tmpFeedList[index] = item;
        });
        setFeedList(tmpFeedList.reverse());
      });
    axios
      .get('http://13.124.126.30:8000/core/friends/' + uid + '/')
      .then(result => {
        // console.log(result.data);
        let tmpFriendList = [];
        let count = 0;

        result.data.map((item, index) => {
          if (item.approved === true) {
            tmpFriendList[count] = item.user_info;
            count++;
          }
        });

        console.log(tmpFriendList);
        setFriendList(tmpFriendList);
      });
  }, []);

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={feedList.length}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  };

  return (
    <View style={styles.root}>
      <Modal
        ava={avata}
        animationType="none"
        transparent={true}
        visible={modalVisible}>
        <SendChatting
          navigation={navigation}
          setModalVisible={setModalVisible}
          uid={uid}
          avata={avata}
        />
      </Modal>
      <Modal
        style={{backgroundColor: palette.gold}}
        visible={moreModalVisible}
        transparent={true}>
        <MoreModal
          setMoreModalVisible={setMoreModalVisible}
          uid={uid}
          setCall911ModalVisible={setCall911ModalVisible}
        />
      </Modal>
      <Modal
        style={{backgroundColor: palette.gold}}
        visible={call911ModalVisible}
        transparent={true}>
        <Call911Modal
          setCall911ModalVisible={setCall911ModalVisible}
          uid={uid}
        />
      </Modal>

      <Container style={styles.container}>
        <Content
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          <IndicatorViewPager
            initialPage={viewpagerIndex}
            style={styles.viewPager}
            indicator={_renderDotIndicator()}>
            {feedList.map(item => {
              return (
                <Image
                  style={styles.viewPage}
                  key="1"
                  source={{uri: item.img_src}}
                />
              );
            })}
          </IndicatorViewPager>

          <View style={styles.cardView}>
            <ProfileCard
              size={66}
              fontSizes={[16, 14, 14]}
              nickname={nickname}
              avata={{uri: avata}}
              age={age}
              belong={belong}
              department={department}
              bothLike={bothLike}
              location={location}
              noTouch={true}
            />
            {/* <MeetingSettingPane data={meeting_setting_data} /> */}
            <View style={styles.horizontalDivider} />
          </View>

          {bothLike === true ? (
            <TouchableByPlatform
              style={styles.soleAction}
              onPress={() => {
                getStorage().then(result => {
                  Alert.alert(
                    '대화를 시작하시겠어요?',
                    '야미 3개가 필요합니다!',
                    [
                      {
                        text: '취소',
                      },
                      {
                        text: '대화하기',
                        onPress: () => {
                          if (result[9] < 3) {
                            Alert.alert(
                              '야미가 부족합니다.',
                              '스토어에서 야미를 구입하시겠어요?',
                              [
                                {text: '취소'},
                                {
                                  text: '스토어 가기',
                                  onPress: () => {
                                    navigation.navigate('Store');
                                    setModalVisible(false);
                                  },
                                },
                              ],
                              '',
                            );
                          } else {
                            //대화방 만들기~~
                          }
                        },
                      },
                    ],
                    '',
                  );
                });
              }}>
              <View style={styles.button}>
                <Image
                  source={require('~/images/chat_send.png')}
                  style={{height: 16, width: 16, marginTop: 2}}
                />
                <CustomTextMedium
                  size={14}
                  color={palette.sub}
                  style={{marginLeft: 4}}>
                  대화하기
                </CustomTextMedium>
              </View>
            </TouchableByPlatform>
          ) : myFeed !== true ? (
            <View style={styles.actionView}>
              <TouchableByPlatform
                style={styles.touchable}
                onPress={() => {
                  postLike();
                }}>
                <View style={styles.button}>
                  <Ionicon
                    name="ios-heart-empty"
                    size={18}
                    color={likedState === false ? '#898989' : palette.orange}
                    style={{marginTop: 3}}
                  />
                  <CustomTextMedium
                    size={14}
                    color={likedState === false ? '#898989' : palette.orange}
                    style={{marginLeft: 4}}>
                    좋아요
                  </CustomTextMedium>
                </View>
              </TouchableByPlatform>
              <View style={styles.verticalDivider} />

              <TouchableByPlatform
                style={styles.touchable}
                onPress={() => {
                  setModalVisible(true);
                }}>
                <View style={styles.button}>
                  <View style={{paddingTop: 2}}>
                    <Image
                      source={require('~/images/chat_send.png')}
                      style={{
                        width: 18,
                        height: 18,
                      }}
                    />
                  </View>
                  <CustomTextMedium
                    size={14}
                    color="#898989"
                    style={{
                      marginLeft: 4,
                      // backgroundColor: palette.gray
                    }}>
                    대화 신청
                  </CustomTextMedium>
                </View>
              </TouchableByPlatform>
            </View>
          ) : (
            <TouchableByPlatform
              style={styles.soleAction}
              onPress={() => navigation.navigate('MyProfile')}>
              <View style={styles.button}>
                <Image
                  source={require('~/images/pencil_gary.png')}
                  style={{height: 20, width: 20}}
                />
                <CustomTextMedium
                  size={14}
                  color={palette.sub}
                  style={{marginLeft: 4}}>
                  프로필 수정하기
                </CustomTextMedium>
              </View>
            </TouchableByPlatform>
          )}

          <List style={styles.detailList}>
            {/* <ListItem noIndent style={styles.detailListItem}>
              <Left>
                <CustomTextRegular size={14} color={palette.black}>
                  지역
                </CustomTextRegular>
              </Left>
              <Right>
                <CustomTextRegular size={14} color={palette.sub}>
                  서울 관악구
                </CustomTextRegular>
              </Right>
            </ListItem> */}

            <ListItem noIndent style={styles.detailListItem}>
              <Left>
                <CustomTextRegular size={14} color={palette.black}>
                  지역
                </CustomTextRegular>
              </Left>
              <Right>
                <CustomTextRegular size={14} color={palette.gray}>
                  {location}
                </CustomTextRegular>
              </Right>
            </ListItem>
            <ListItem noIndent style={styles.detailListItem}>
              <Left>
                <CustomTextRegular size={14} color={palette.black}>
                  키
                </CustomTextRegular>
              </Left>
              <Right>
                <CustomTextRegular size={14} color={palette.sub}>
                  182cm
                </CustomTextRegular>
              </Right>
            </ListItem>
            <ListItem noIndent style={styles.detailListItem}>
              <Left>
                <CustomTextRegular size={14} color={palette.black}>
                  본인 인증
                </CustomTextRegular>
              </Left>
              <Right>
                <CustomTextRegular size={14} color={palette.blue}>
                  완료
                </CustomTextRegular>
              </Right>
            </ListItem>
            <ListItem noIndent style={styles.detailListItem}>
              <Left>
                <CustomTextRegular size={14} color={palette.black}>
                  소속 인증
                </CustomTextRegular>
              </Left>
              <Right>
                <CustomTextRegular
                  size={14}
                  color={verified === 2 ? palette.blue : palette.red}>
                  {verified === 2 ? '완료' : '미완료'}
                </CustomTextRegular>
              </Right>
            </ListItem>
          </List>

          <List style={styles.friendsList}>
            <ListItem noIndent style={styles.friendsListHeader}>
              <CustomTextRegular size={14} color={palette.black}>
                {nickname}님의 친구들
              </CustomTextRegular>
            </ListItem>
            {friendList.length === 0 ? (
              <View
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <CustomTextRegular size={14}>
                  아직 등록한 친구가 없어요 ㅠ.ㅠ
                </CustomTextRegular>
              </View>
            ) : null}
            {friendList.map(friend => (
              <ListItem noIndent style={styles.friendsListItem}>
                <Body>
                  <ProfileCard
                    size={50}
                    fontSizes={[14, 12, 12]}
                    nickname={friend.nickname}
                    avata={friend.avata}
                    age={Math.floor(
                      (nowYear - parseInt(friend.birthdate) + 20000) / 10000,
                    )}
                    belong={friend.belong}
                    department={friend.department}
                    // location={friend.location}
                  />
                </Body>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    </View>
  );
};
ProfileDetailScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor="white"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => <View />,
  headerTransparent: true,
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerRight: () => (
    <Button
      transparent
      style={{
        // backgroundColor: palette.gold,
        flexDirection: 'column',
        paddingTop: 10,
        marginRight: 10,
      }}
      onPress={() => {
        navigation.getParam('setModal')();
      }}>
      <Ionicon name="ios-more" size={26} color="white" />
    </Button>
  ),
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    backgroundColor: palette.default_bg,
  },
  innerView: {
    flexDirection: 'column',
  },
  cardView: {
    backgroundColor: 'white',
    // backgroundColor: ,

    padding: 22,
    paddingBottom: 0,
    paddingTop: 12,
  },
  touchableWrapper: {
    width: 40,
    height: 40,
  },
  viewPage: {
    resizeMode: 'cover',
  },
  viewPager: {
    width: deviceWidth,
    height: deviceWidth,
  },
  dot: {
    backgroundColor: palette.nonselect,
  },
  selectedDot: {
    backgroundColor: palette.orange[0],
  },
  indicator: {
    width: deviceWidth,
    position: 'absolute',
    top: deviceWidth - 20,
  },
  horizontalDivider: {
    height: 1,
    flex: 1,
    backgroundColor: palette.divider,
    marginTop: 12,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: palette.divider,
  },
  actionView: {
    width: deviceWidth,
    flex: 1,
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 2,
  },
  touchable: {
    width: deviceWidth / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailList: {
    marginTop: 12,
  },
  detailListItem: {
    backgroundColor: 'white',
    paddingLeft: 22,
    paddingRight: 22,
  },
  friendsList: {
    marginTop: 12,
    marginBottom: 12,
  },
  friendsListHeader: {
    backgroundColor: 'white',
    paddingLeft: 22,
  },
  friendsListItem: {
    backgroundColor: 'white',
    paddingLeft: 22,
  },
  soleAction: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default ProfileDetailScreen;
