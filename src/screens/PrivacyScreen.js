/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {CustomTextRegular} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';

const PrivacyScreen = () => {
  return (
    <View style={{backgroundColor: palette.default_bg}}>
      <View style={styles.bigView}>
        <CustomTextRegular size={16}>
          프라이버시 스크린 입니다.~~~프라이버시 스크린 입니다.~~~프라이버시
          스크린 입니다.~~~프라이버시 스크린 입니다.~~~ 프라이버시 스크린
          입니다.~~~프라이버시 스크린 입니다.~~~프라이버시 스크린 입니다.~~~
          프라이버시 스크린 입니다.~~~프라이버시 스크린 입니다.~~~프라이버시
          스크린 입니다.~~~프라이버시 스크린 입니다.~~~ 프라이버시 스크린
          입니다.~~~프라이버시 스크린 입니다.~~~프라이버시 스크린
          입니다.~~~프라이버시 스크린 입니다.~~~ 프라이버시 스크린
          입니다.~~~프라이버시 스크린 입니다.~~~프라이버시 스크린 입니다.~~~
        </CustomTextRegular>
      </View>
    </View>
  );
};

PrivacyScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor=palette.black
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextRegular size={16} color=palette.black>
      개인정보 취급방침
    </CustomTextRegular>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  bigView: {
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    margin: 16,
    padding: 16,
  },
});
export default PrivacyScreen;
