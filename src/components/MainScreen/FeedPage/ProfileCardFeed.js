/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
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

// const data = ['2:2 미팅', '3:3 미팅', '4:4 미팅', '날짜는 조율 가능해요'];

const width = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: 'center',
    marginTop: 20,
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
    padding: 12,
    paddingVertical: 10,
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
  navigation,
  uid,
  nickname,
  avata,
  age,
  belong,
  department,
  bothLike,
}) => {
  const [liked, setLiked] = useState(false);
  const [feedList, setFeedList] = useState([]);
  // const [hasChatting, setHasChatting] = useState(false);

  useEffect(() => {
    axios
      .get('http://13.124.126.30:8000/core/feed/' + uid + '/')
      .then(result => {
        console.log(result.data);
        let tmpFeedList = [];

        result.data.map((item, index) => {
          tmpFeedList[index] = item;
        });
        setFeedList(tmpFeedList.reverse());
      });
  }, []);

  const postLike = () => {
    console.log(feedList[0].id);
    axios
      .post('http://13.124.126.30:8000/core/like/' + feedList[0].id + '/')
      .then(result => console.log(result));
    setLiked(!liked);
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
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <ProfileCard
          size={50}
          fontSizes={[14, 12, 12]}
          nickname={nickname}
          avata={avata === null ? null : {uri: avata}}
          age={age}
          belong={belong}
          department={department}
          bothLike={bothLike}
          rightComponent={
            <Ionicon name="ios-more" size={26} color={palette.black} />
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
            <TouchableOpacity
              onPress={() => {
                // navigation.setParams({
                //   nickname: nickname,
                // });
                navigation.navigate('Profile', {
                  uid,
                  nickname,
                  avata,
                  age,
                  belong,
                  department,
                });
              }}>
              <Image
                style={styles.viewPage}
                key={index}
                source={item.img_src === null ? null : {uri: item.img_src}}
              />
            </TouchableOpacity>
          );
        })}
      </IndicatorViewPager>

      <View style={styles.actionDiv}>
        <TouchableByPlatform
          style={styles.touchable}
          onPress={() => {
            postLike();
          }}>
          <View style={styles.button}>
            <Ionicon
              name="ios-heart-empty"
              size={18}
              color={liked === false ? '#898989' : palette.orange}
            />
            <CustomTextMedium
              size={14}
              color={liked === false ? '#898989' : palette.orange}
              style={{marginLeft: 4}}>
              좋아요
            </CustomTextMedium>
          </View>
        </TouchableByPlatform>
        <View style={styles.verticalDivider} />
        <TouchableByPlatform
          style={styles.touchable}
          onPress={() => Alert.alert('대화 서비스는 아직 준비중입니다! ')}>
          <View style={styles.button}>
            <Image
              source={require('~/images/chat-bubble2-outline.png')}
              style={{height: 16, width: 16}}
            />
            <CustomTextMedium size={14} color="#898989" style={{marginLeft: 4}}>
              미팅 신청
            </CustomTextMedium>
          </View>
        </TouchableByPlatform>
      </View>
    </View>
  );
};
export default ProfileCardFeed;
