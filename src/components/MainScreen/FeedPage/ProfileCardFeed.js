/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '~/components/common/CustomText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ProfileCard from '~/components/common/ProfileCard';
import axios from 'axios';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from 'react-native-best-viewpager';
import {Button} from 'native-base';
import MoreModal from '~/components/common/MoreModal';
import Call911Modal from '~/components/common/Call911Modal';
import SendChatting from '~/components/common/SendChatting';
import MaterialCommunityicon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';

// const data = ['2:2 미팅', '3:3 미팅', '4:4 미팅', '날짜는 조율 가능해요'];

const width = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  image: {
    width: width,
    height: width / 1.618,
    resizeMode: 'cover',
    paddingLeft: 12,
    paddingTop: 14,
  },
  linearGradient: {
    width: width,
    height: width / 1.618 / 2,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 10,
    paddingRight: 12,
  },
  profile: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileText: {},
  profileTextFirstLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  meetingStyles: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  horizontalDivider: {
    backgroundColor: '#DDDDDD',
    flex: 1,
    height: 1,
    marginTop: 2,
    marginLeft: 12,
    marginRight: 12,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDDDDD',
  },
  actionDiv: {
    width: width,
    flex: 1,
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  touchable: {
    width: width / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    backgroundColor: 'white',
    padding: 10,
    // paddingTop: 10,
    // paddingVertical: 10,
  },
  viewPage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewPager: {
    width: width,
    height: width / 1.618,
  },
  selectedDot: {
    backgroundColor: palette.orange[0],
  },
  indicator: {
    width: width,
    position: 'absolute',
    top: width / 1.618 - 20,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  viewTouchable: {
    width: 100,
    height: 100,
  },
});
const ProfileCardFeed = ({
  location,
  verified,
  height,
  navigation,
  uid,
  nickname,
  avata,
  age,
  belong,
  department,
  bothLike,
  likedByServer,
  hasProfile,
}) => {
  const [liked, setLiked] = useState(false);
  const [feedList, setFeedList] = useState([]);
  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [call911ModalVisible, setCall911ModalVisible] = useState(false);
  const [chattingModalVisible, setChattingModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [hasChatting, setHasChatting] = useState(false);

  useEffect(() => {
    setLiked(likedByServer);

    axios
      .get(global.config.api_host + 'core/feed/' + uid + '/')
      .then(result => {
        // console.log(result.data);
        let tmpFeedList = [];
        result.data.map((item, index) => {
          tmpFeedList[index] = item;
        });
        // console.log(tmpFeedListNo);
        setFeedList(tmpFeedList.reverse());
        setLoading(false);
      });
  }, []);

  const alertAddProfile = () => {
    Alert.alert(
      '사진 한장만 등록하세요!',
      '무제한 피드 + 보너스 야미 본인이 나온 프로필 사진이 필요해요',
      [
        {
          text: '다음에',
          onPress: () => console.log('NOPE'),
        },
        {
          text: '사진등록',
          onPress: () => {
            navigation.navigate('MyProfile');
            console.log('profile~~');
          },
        },
      ],
      {cancelable: false},
    );
  };
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('userValue');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  const postLike = () => {
    console.log('like pressed');
    if (liked === true) {
      // console.log('좋아요 취소');
      // console.log(feedList);
      // console.log(feedList[0].id);
      axios
        .post(
          global.config.api_host + 'core/like/' + feedList[0].id + '/cancel/',
        )
        .then(result => {
          // console.log(result.data);
          setLiked(!liked);
        });
    } else {
      //좋아요 보내기
      // console.log('좋아요 보내기');
      // console.log(feedList);
      // console.log(feedList[0].id);
      axios
        .post(global.config.api_host + 'core/like/' + feedList[0].id + '/')
        .then(result => {
          // console.log(result.data);
          setLiked(!liked);
        });
    }
  };

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
  return loading ? (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: palette.divider,
              marginRight: 10,
            }}
          />
          <View style={{marginVertical: 6, justifyContent: 'space-between'}}>
            <View
              style={{width: 57, height: 17, backgroundColor: palette.divider}}
            />
            <View
              style={{width: 130, height: 17, backgroundColor: palette.divider}}
            />
          </View>
        </View>
      </View>
      <View style={styles.viewPager}>
        <View style={{flex: 1, backgroundColor: palette.divider}} />
      </View>
      <View style={styles.actionDiv}></View>
    </View>
  ) : (
    <View style={styles.container}>
      <Modal visible={chattingModalVisible} transparent={true}>
        <SendChatting
          navigation={navigation}
          setModalVisible={setChattingModalVisible}
          avata={avata}
          uid={uid}
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
      {/* {console.log(call911ModalVisible)} */}
      <Modal
        style={{backgroundColor: palette.gold}}
        visible={call911ModalVisible}
        transparent={true}>
        <Call911Modal
          setCall911ModalVisible={setCall911ModalVisible}
          uid={uid}
        />
      </Modal>

      <View style={styles.cardView}>
        <ProfileCard
          uid={uid}
          verified={verified}
          height={height}
          location={location}
          size={50}
          fontSizes={[14, 12, 12]}
          nickname={nickname}
          avata={avata === null ? null : {uri: avata}}
          age={age}
          belong={belong}
          department={department}
          bothLike={bothLike}
          navigation={navigation}
          setLiked={setLiked}
          liked={likedByServer}
          rightComponent={
            <Button
              transparent
              style={{
                // backgroundColor: palette.gold,
                backgroundColor: 'white',
                paddingRight: 5,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0,
              }}
              onPress={() => setMoreModalVisible(true)}>
              <Ionicon name="ios-more" size={26} color={palette.black} />
            </Button>
          }
        />
      </View>
      {/* <TouchableByPlatform
      onPress={() => {
        // navigation.setParams('3'); signup screen.js 참고해서 page수 넘겨주기
        navigation.navigate('Profile');
      }}> */}

      <IndicatorViewPager
        style={styles.viewPager}
        indicator={_renderDotIndicator()}>
        {feedList.map((item, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                onPress={() => {
                  console.log('page : ' + index);
                  if (hasProfile === true) {
                    setChattingModalVisible(false);
                    navigation.navigate('Profile', {
                      viewpagerIndex: index,
                      location,
                      height,
                      verified,
                      uid,
                      nickname,
                      avata,
                      age,
                      belong,
                      department,
                      liked,
                      setLiked: value => setLiked(value),
                    });
                  } else {
                    alertAddProfile();
                  }
                }}>
                <Image
                  style={styles.viewPage}
                  key={index}
                  source={item.img_src === null ? null : {uri: item.img_src}}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </IndicatorViewPager>

      <View style={styles.actionDiv}>
        <TouchableByPlatform
          style={styles.touchable}
          onPress={() => {
            hasProfile === true ? postLike() : alertAddProfile();
          }}>
          <View style={styles.button}>
            <Ionicon
              name="ios-heart-empty"
              size={18}
              color={liked === false ? '#898989' : palette.orange[0]}
              style={{
                // backgroundColor: palette.blue,
                paddingTop: 3,
              }}
            />
            <CustomTextMedium
              size={14}
              color={liked === false ? '#898989' : palette.orange[0]}
              style={{
                marginLeft: 4,
                // backgroundColor: palette.blue
              }}>
              좋아요
            </CustomTextMedium>
          </View>
        </TouchableByPlatform>
        <View style={styles.verticalDivider} />

        <TouchableByPlatform
          style={styles.touchable}
          onPress={() => {
            if (hasProfile === true) {
              setChattingModalVisible(true);
            } else {
              alertAddProfile();
            }
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
    </View>
  );
};
export default ProfileCardFeed;
