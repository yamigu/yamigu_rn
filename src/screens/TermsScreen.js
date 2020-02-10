/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {CustomTextRegular} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';

const TermsScreen = () => {
  return (
    <View style={{backgroundColor: palette.default_bg}}>
      <View style={styles.bigView}>
        <CustomTextRegular size={16}>
          서비스 이용 약관 스크린 입니다.서비스 이용 약관 스크린 입니다.서비스
          이용 약관 스크린 입니다.서비스 이용 약관 스크린 입니다.서비스 이용
          약관 스크린 입니다.서비스 이용 약관 스크린 입니다.서비스 이용 약관
          스크린 입니다.서비스 이용 약관 스크린 입니다.서비스 이용 약관 스크린
          입니다.서비스 이용 약관 스크린 입니다.서비스 이용 약관 스크린
          입니다.서비스 이용 약관 스크린 입니다.서비스 이용 약관 스크린
          입니다.서비스 이용 약관 스크린 입니다.
        </CustomTextRegular>
      </View>
    </View>
  );
};

TermsScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor="black"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextRegular size={16} color="#333333">
      서비스 이용 약관
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
export default TermsScreen;
