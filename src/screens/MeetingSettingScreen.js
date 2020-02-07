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
import {Row} from 'native-base';
import RoundBorderTextView from '~/components/common/RoundBorderTextView';

const deviceWidth = Dimensions.get('window').width;
const MeetingSettingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View name="인원선택whole">
        <View name="인원선택div" style={styles.grayBox}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={12}
            color={palette.gray}>
            아아아
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
          * 인원은 상대방과 대화를 통해 조율해도 괜찮아요
        </CustomTextRegular>
      </View>
    </SafeAreaView>
  );
};

MeetingSettingScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,

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
    backgroundColor: palette.default_bg,
  },
  base: {
    backgroundColor: palette.nonselect,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  grayBox: {
    marginTop: 24,
    width: deviceWidth * 0.93,
    height: 40,
    backgroundColor: '#000000',
  },
  itemList: {
    flexDirection: 'row',
    width: deviceWidth * 0.93,
    marginTop: 12,
    height: 40,
    backgroundColor: palette.orange,
  },
  notice: {
    width: deviceWidth * 0.93,
    marginTop: 15,
    height: 10,
    backgroundColor: palette.gold,
  },
});
export default MeetingSettingScreen;
