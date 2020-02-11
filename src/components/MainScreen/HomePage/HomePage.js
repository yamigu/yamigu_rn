/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import palette from '~/lib/styles/palette';
import {
  CustomTextBold,
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import {Button, Row} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const dw = Dimensions.get('window').width;
const HomePage = props => {
  return (
    <View style={styles.root}>
      <View style={styles.topLayout}>
        <CustomTextBold size={24} color={palette.black}>
          미팅 주선
        </CustomTextBold>
        <CustomTextRegular size={24} color="#646363">
          매력적인 이성과의 미팅
        </CustomTextRegular>
      </View>

      <View style={styles.bottomLayout}>
        <View
          style={{
            width: dw * 0.9,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <CustomTextRegular>미팅 설정</CustomTextRegular>
          <Button
            style={{
              borderRadius: 15,
              backgroundColor: palette.default_bg,
              width: 65,
              elevation: 0,
              height: 30,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: palette.orange,
              borderWidth: 1,
            }}>
            <CustomTextMedium color={palette.orange} size={12}>
              이용 안내
            </CustomTextMedium>
          </Button>
        </View>

        <View style={styles.mainCondition}>
          <CustomTextBold
            size={14}
            color={palette.gray}
            style={{paddingLeft: 6}}>
            인원
          </CustomTextBold>
          <TouchableByPlatform style={styles.touch}>
            <CustomTextMedium size={14} color={palette.black}>
              인원 상관 없음
            </CustomTextMedium>
            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <View style={styles.mainCondition}>
          <CustomTextBold
            size={14}
            color={palette.gray}
            style={{paddingLeft: 6}}>
            날짜
          </CustomTextBold>
          <TouchableByPlatform style={styles.touch}>
            <CustomTextMedium size={14} color={palette.black}>
              날짜 상관 없음
            </CustomTextMedium>
            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <View style={styles.mainCondition}>
          <CustomTextBold
            size={14}
            color={palette.gray}
            style={{paddingLeft: 6}}>
            선호 나이
          </CustomTextBold>
          <TouchableByPlatform style={styles.touch}>
            <CustomTextMedium size={14} color={palette.black}>
              20 ~ 26
            </CustomTextMedium>
            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <LinearGradient
          colors={['#FFA022', '#FF6C2B']}
          style={styles.gradientLayout}>
          <TouchableByPlatform style={styles.mainBtn}>
            <CustomTextMedium size={16} color="white">
              미팅 주선 신청하기
            </CustomTextMedium>
            <CustomTextMedium size={16} color="white">
              무료 1회
            </CustomTextMedium>
          </TouchableByPlatform>
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: dw,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLayout: {
    flex: 1,
    width: dw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLayout: {
    flex: 1,
    width: dw,
    marginBottom: 75,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradientLayout: {
    borderRadius: 10,
    width: dw * 0.9,
    height: 56,
    marginTop: 20,
  },
  mainCondition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9D9',
    width: dw * 0.87,
    marginTop: 21,
    paddingBottom: 10,
  },
  touch: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: dw * 0.56,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  mainBtn: {
    width: dw * 0.9,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
export default HomePage;
