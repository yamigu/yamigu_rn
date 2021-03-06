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
} from '~/components/common/CustomText';
import Ionicon from 'react-native-vector-icons/Ionicons';
import palette from '~/lib/styles/palette';
import RoundBorderTextView from '~/components/common/RoundBorderTextView';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import LinearGradient from 'react-native-linear-gradient';
import MeetingSettingPane from '~/components/common/MeetingSettingPane';
import ProfileCard from '~/components/common/ProfileCard';

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
  cardView: {
    backgroundColor: 'white',
    padding: 12,
    paddingBottom: 0,
  },
});
const ProfileCardFeed = ({navigation}) => (
  <View style={styles.container}>
    <TouchableByPlatform onPress={() => navigation.navigate('Profile')}>
      <ImageBackground
        style={styles.image}
        source={require('~/images/test-user-profile-5.png')}>
        <LinearGradient
          colors={[palette.black, '#ffffff00']}
          style={styles.linearGradient}
        />
        <CustomTextMedium size={24} color="white">
          고려대랑 미팅할래요?
        </CustomTextMedium>
        <CustomTextRegular size={12} color="white">
          친구들과 새로운 친구들을 만나보세요
        </CustomTextRegular>
      </ImageBackground>
    </TouchableByPlatform>
    <View style={styles.cardView}>
      <ProfileCard
        size={50}
        fontSizes={[14, 12, 12]}
        nickname="또잉또잉또잉"
        image={require('~/images/test-user-profile-1.png')}
        age={24}
        belong="서울대"
        department="자유전공학부"
        location="서울"
      />
      <MeetingSettingPane data={data} />
    </View>
    <View style={styles.horizontalDivider} />
    <View style={styles.actionDiv}>
      <TouchableByPlatform style={styles.touchable}>
        <View style={styles.button}>
          <Ionicon name="ios-heart-empty" size={18} />
          <CustomTextMedium size={14} color="#898989" style={{marginLeft: 4}}>
            좋아요
          </CustomTextMedium>
        </View>
      </TouchableByPlatform>
      <View style={styles.verticalDivider} />
      <TouchableByPlatform style={styles.touchable}>
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

export default ProfileCardFeed;
