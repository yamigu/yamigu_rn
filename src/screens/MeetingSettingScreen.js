import React, {useState, createRef} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {SafeAreaView} from 'react-navigation';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Row, Button} from 'native-base';
import RoundBorderTextView from '~/components/common/RoundBorderTextView';
import RoundBorderOrangeText from '~/components/MeetingSettingScreen/RoundBorderOrangeText';
import {Switch} from 'react-native-switch';

const deviceWidth = Dimensions.get('window').width;

const MeetingSettingScreen = ({navigation}) => {
  const [toggle, setToggle] = useState(false);
  const memberList = ['2:2 미팅', '3:3미팅', '4:4미팅'];
  const areaMain = '수도권';
  const areaList = [
    '신촌',
    '홍대',
    '강남',
    '건대',
    '왕십리',
    '안암',
    '서울대입구',
    '송도',
    '수원',
  ];
  const dayMain = '날짜는 조율 가능해요';
  let [dayList, setDayList] = useState(['오늘', '내일']);
  let [teamIntro, setTeamIntro] = useState([
    '분위기 잘맞춰요',
    '분위기 메이커,',
    '등등',
  ]);
  const changeOut = () => {
    setToggle(!toggle);
    console.log('parent');
  };
  const changeIn = e => {
    setToggle(!toggle);
    console.log('The link was clicked.');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Button
        onPress={changeIn}
        style={{width: 200, backgroundColor: palette.orange}}>
        <Switch value={toggle} onValueChange={changeIn} />
      </Button>
      <View name="인원선택whole">
        <View name="인원선택div" style={styles.grayBox}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={13}
            color="#505050">
            인원선택
          </CustomTextRegular>

          <CustomTextRegular
            style={{paddingLeft: 12}}
            size={12}
            color="#B1B1B1">
            (복수 선택 가능)
          </CustomTextRegular>
        </View>
        <View name="인원선택list" style={styles.itemList}>
          <View
            style={{
              backgroundColor: 'white',
              height: 35,
            }}>
            <RoundBorderOrangeText>wowowo</RoundBorderOrangeText>
          </View>
          <View>
            <RoundBorderTextView>3:3 미팅</RoundBorderTextView>
          </View>
          <View>
            <CustomTextRegular>4:4 미팅</CustomTextRegular>
          </View>
        </View>
        <CustomTextRegular
          size={10}
          color={'#B9B9B9'}
          padding={0}
          margin={0}
          style={{marginTop: 15}}>
          * 인원은 상대방과 대화를 통해 조율해도 괜찮아요
        </CustomTextRegular>
      </View>
      {/* 인원선택 끝 */}
      <View name="날짜선택whole">
        <View name="날짜선택div" style={styles.grayBox}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={13}
            color="#505050">
            날짜 선택
          </CustomTextRegular>
          <CustomTextRegular
            style={{paddingLeft: 12}}
            size={12}
            color="#B1B1B1">
            (3개까지 선택 가능)
          </CustomTextRegular>
        </View>
        <View name="날짜선택list" style={styles.itemList}>
          <View
            style={{
              backgroundColor: 'white',
              height: 35,
            }}></View>
          <RoundBorderTextView style={{backgroundColor: 'white'}}>
            2:2 미팅
          </RoundBorderTextView>
          <View>
            <CustomTextRegular>3:3 미팅</CustomTextRegular>
          </View>
          <View>
            <CustomTextRegular>4:4 미팅</CustomTextRegular>
          </View>
        </View>
        <CustomTextRegular
          size={10}
          color={'#B9B9B9'}
          padding={0}
          margin={0}
          style={{marginTop: 15}}>
          *같은 날짜를 선택한 이성을 주선해주니 신중하게 선택하세요!
        </CustomTextRegular>
      </View>
      {/* 날짜 선택 끝*/}

      <View name="장소선택whole">
        <View name="장소선택div" style={styles.grayBox}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={13}
            color="#505050">
            미팅지역
          </CustomTextRegular>
          <CustomTextRegular
            style={{paddingLeft: 12}}
            size={12}
            color="#B1B1B1">
            (복수 선택 가능)
          </CustomTextRegular>
        </View>
        <View name="인원선택list" style={styles.itemList}>
          <View
            style={{
              backgroundColor: 'white',
              height: 35,
            }}></View>
          <RoundBorderTextView style={{backgroundColor: 'white'}}>
            2:2 미팅
          </RoundBorderTextView>
          <View>
            <CustomTextRegular>3:3 미팅</CustomTextRegular>
          </View>
          <View>
            <CustomTextRegular>4:4 미팅</CustomTextRegular>
          </View>
        </View>
        <CustomTextRegular
          size={10}
          color={'#B9B9B9'}
          padding={0}
          margin={0}
          style={{marginTop: 15}}>
          * 다른 지역을 원하시면 내설정에서 바꿔주세요!
        </CustomTextRegular>
      </View>
      {/* 미팅지역 선택 끝 */}

      <View name="팀소개whole">
        <View name="팀소개div" style={styles.grayBox}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={13}
            color="#505050">
            팀 소개
          </CustomTextRegular>
          <CustomTextRegular
            style={{paddingLeft: 12}}
            size={12}
            color="#B1B1B1">
            (복수 선택 가능)
          </CustomTextRegular>
        </View>
        <View name="인원선택list" style={styles.itemList}>
          <View
            style={{
              backgroundColor: 'white',
              height: 35,
            }}></View>
          <RoundBorderTextView style={{backgroundColor: 'white'}}>
            2:2 미팅
          </RoundBorderTextView>
          <View>
            <CustomTextRegular>3:3 미팅</CustomTextRegular>
          </View>
          <View>
            <CustomTextRegular>4:4 미팅</CustomTextRegular>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

MeetingSettingScreen.navigationOptions = ({navigation}) => ({
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
      미팅 설정
    </CustomTextMedium>
  ),
  headerBackTitle: false,
  headerTruncatedBackTitle: false,
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  base: {
    backgroundColor: palette.nonselect,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  grayBox: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    width: deviceWidth * 0.93,
    height: 40,
    backgroundColor: '#F3F2F2',
  },
  itemList: {
    flexDirection: 'row',
    width: deviceWidth * 0.93,
    marginTop: 12,
    height: 40,
    backgroundColor: 'white',
  },
  notice: {
    width: deviceWidth * 0.93,
    marginTop: 15,
    height: 10,
    backgroundColor: palette.gold,
  },
});
export default MeetingSettingScreen;
