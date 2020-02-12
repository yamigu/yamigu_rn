/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
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
} from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import palette from '~/lib/styles/palette';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import ProfileCard from '~/components/common/ProfileCard';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from 'react-native-best-viewpager';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MeetingSettingPane from '~/components/common/MeetingSettingPane';
import {HeaderBackButton} from 'react-navigation-stack';
const deviceWidth = Dimensions.get('window').width;
const meeting_setting_data = [
  '2:2 미팅',
  '3:3 미팅',
  '4:4 미팅',
  '날짜는 조율 가능해요',
  '수도권',
];
const frineds_list_data = [
  {
    name: '상큼한 딸기',
    age: 24,
    belong: '삼성물산',
    department: '',
    location: '서울',
    image: require('~/images/test-user-profile-6.png'),
  },
  {
    name: '안암불주먹',
    age: 24,
    belong: '고려대',
    department: '의과병원',
    location: '서울',
    image: require('~/images/test-user-profile-7.png'),
  },
  {
    name: '연남도끼',
    age: 24,
    belong: '프리랜서',
    department: '디자이너',
    location: '서울',
    image: require('~/images/test-user-profile-8.png'),
  },
  {
    name: 'Jane Park',
    age: 24,
    belong: '5급 공무원',
    department: '',
    location: '서울',
    image: require('~/images/test-user-profile-6.png'),
  },
];
const ProfileDetailScreen = props => {
  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  };
  return (
    <View style={styles.root}>
      <Container style={styles.container}>
        <Content
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          <IndicatorViewPager
            style={styles.viewPager}
            indicator={_renderDotIndicator()}>
            <Image
              style={styles.viewPage}
              key="1"
              source={require('~/images/test-user-profile-5.png')}
            />
            <Image
              style={styles.viewPage}
              key="2"
              source={require('~/images/test-user-profile-5.png')}
            />
            <Image
              style={styles.viewPage}
              key="3"
              source={require('~/images/test-user-profile-5.png')}
            />
          </IndicatorViewPager>
          <View style={styles.cardView}>
            <ProfileCard
              size={66}
              fontSizes={[16, 14, 14]}
              nickname="또잉또잉또잉"
              image={require('~/images/test-user-profile-1.png')}
              age={24}
              belong="서울대"
              department="자유전공학부"
              location="서울"
            />
            {/* <MeetingSettingPane data={meeting_setting_data} /> */}
            <View style={styles.horizontalDivider} />
          </View>
          <View style={styles.actionView}>
            <TouchableByPlatform style={styles.touchable}>
              <View style={styles.button}>
                <Ionicon name="ios-heart-empty" color="#898989" size={18} />
                <CustomTextMedium
                  size={14}
                  color={palette.sub}
                  style={{marginLeft: 4}}>
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
                <CustomTextMedium
                  size={14}
                  color={palette.sub}
                  style={{marginLeft: 4}}>
                  미팅 신청
                </CustomTextMedium>
              </View>
            </TouchableByPlatform>
          </View>
          <List style={styles.detailList}>
            <ListItem noIndent style={styles.detailListItem}>
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
                  본인인증
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
                <CustomTextRegular size={14} color={palette.red}>
                  미완료
                </CustomTextRegular>
              </Right>
            </ListItem>
          </List>
          <List style={styles.friendsList}>
            <ListItem noIndent style={styles.friendsListHeader}>
              <CustomTextRegular size={14} color={palette.black}>
                또잉또잉또잉님의 실제 친구들
              </CustomTextRegular>
            </ListItem>
            {frineds_list_data.map(friend => (
              <ListItem noIndent style={styles.friendsListItem}>
                <Body>
                  <ProfileCard
                    size={50}
                    fontSizes={[14, 12, 12]}
                    nickname={friend.name}
                    image={friend.image}
                    age={friend.age}
                    belong={friend.belong}
                    department={friend.department}
                    location={friend.location}
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
      tintColor="#FFFFFF"
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
    marginTop: 6,
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
});

export default ProfileDetailScreen;
