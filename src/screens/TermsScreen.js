/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Content} from 'native-base';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import * as RNFS from 'react-native-fs';

const os = Platform.OS;
const TermsScreen = () => {
  const [termsAndroid, termsSetAndroid] = useState('');
  const [termsIos, setTermsIos] = useState('');
  const [termsIos2, setTermsIos2] = useState('');

  let filePath = '';
  if (os === 'ios') {
    filePath = RNFS.MainBundlePath + '/Fonts/policy.txt';
    RNFS.readFile(filePath).then(res => {
      setTermsIos(res.slice(0, 4490));
      setTermsIos2(res.slice(4491, 8549));
    });
  } else {
    filePath = 'data/policy.txt';
    RNFS.readFileAssets(filePath).then(res => {
      termsSetAndroid(res);
    });
  }

  return (
    <Content style={styles.bigView}>
      {os === 'ios' ? (
        <View>
          <CustomTextMedium size={12} color={palette.black}>
            {termsIos}
          </CustomTextMedium>
          <CustomTextMedium size={12} color={palette.black}>
            {termsIos2}
          </CustomTextMedium>
        </View>
      ) : (
        <CustomTextMedium size={12} color={palette.black}>
          {termsAndroid}}
        </CustomTextMedium>
      )}
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
