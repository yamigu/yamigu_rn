/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '../common/CustomText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import palette from '~/lib/styles/palette';
import RoundTextView from '../common/RoundTextView';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const data = ['2:2 미팅', '3:3 미팅', '4:4 미팅', '날짜는 조율 가능해요'];

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: width - 24,
    justifyContent: 'center',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    backgroundColor: 'white',
  },
  image: {
    width: width - 24,
    height: (width - 24) / 1.618,
    resizeMode: 'cover',
    paddingLeft: 12,
    paddingTop: 14,
  },
  linearGradient: {
    width: width - 24,
    height: (width - 24) / 1.618 / 2,
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
    width: width - 24,
    flex: 1,
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  touchable: {
    width: (width - 24) / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const ProfileCard = ({params}) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.image}
      source={require('../../images/test-user-profile-5.png')}>
      <LinearGradient
        colors={['#333333ff', '#ffffff00']}
        style={styles.linearGradient}
      />
      <CustomTextMedium size={24} color="white">
        고려대랑 미팅할래요?
      </CustomTextMedium>
      <CustomTextRegular size={12} color="white">
        친구들과 새로운 친구들을 만나보세요
      </CustomTextRegular>
    </ImageBackground>
    <View style={styles.content}>
      <View style={styles.profile}>
        <Image
          style={styles.thumbnail}
          source={require('../../images/test-user-profile-5.png')}
        />
        <View style={styles.profileText}>
          <View style={styles.profileTextFirstLine}>
            <CustomTextBold
              size={14}
              color={palette.black}
              style={{marginRight: 6}}>
              또로링
            </CustomTextBold>
            <CustomTextMedium size={12} color={palette.black}>
              24살
            </CustomTextMedium>
          </View>
          <CustomTextRegular size={12} color="#898989">
            고려대, 서울
          </CustomTextRegular>
        </View>
      </View>
      <View style={styles.meetingStyles}>
        {data.map(item => {
          return <RoundTextView>{item}</RoundTextView>;
        })}
      </View>
    </View>
    <View style={styles.horizontalDivider} />
    <View style={styles.actionDiv}>
      <TouchableNativeFeedback style={styles.touchable}>
        <View style={styles.button}>
          <Ionicon name="ios-heart-empty" color="#898989" size={18} />
          <CustomTextMedium size={14} color="#898989" style={{marginLeft: 4}}>
            좋아요
          </CustomTextMedium>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.verticalDivider} />
      <TouchableNativeFeedback style={styles.touchable}>
        <View style={styles.button}>
          <Image
            source={require('../../images/chat-bubble2-outline.png')}
            style={{height: 16, width: 16}}
          />
          <CustomTextMedium size={14} color="#898989" style={{marginLeft: 4}}>
            미팅 신청
          </CustomTextMedium>
        </View>
      </TouchableNativeFeedback>
    </View>
  </View>
);

export default ProfileCard;
