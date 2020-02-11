/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Content} from 'native-base';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import * as RNFS from 'react-native-fs';

const TermsScreen = () => {
  const [terms, setTerms] = useState('');
  const [termsIos, setTermsIos] = useState('');
  const [termsIos2, setTermsIos2] = useState('');

  const filePath = RNFS.MainBundlePath + '/Fonts/privacy.txt';
  RNFS.readFile(filePath).then(res => {
    setTermsIos(res.slice(0, 4490));
    setTermsIos2(res.slice(4491, 8549));

    console.log(res.length);
  });

  return (
    <Content style={{flex: 1, backgroundColor: palette.default_bg}}>
      <CustomTextMedium size={12} color={palette.gold}>
        asdasd+
      </CustomTextMedium>
      <CustomTextMedium color={palette.blue}>{termsIos}</CustomTextMedium>
      <CustomTextMedium color={palette.blue}>{termsIos2}</CustomTextMedium>
    </Content>
  );
};

TermsScreen.navigationOptions = ({navigation}) => ({
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
    <CustomTextRegular size={16} color={palette.black}>
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
