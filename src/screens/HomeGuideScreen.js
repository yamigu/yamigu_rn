import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import palette from '~/lib/styles/palette';
import {Content} from 'native-base';
import {CustomTextBold, CustomTextMedium} from '~/components/common/CustomText';
import {HeaderBackButton} from 'react-navigation-stack';

const HomeGuideScreen = ({navigation}) => (
  <Content
    style={{
      flex: 1,
      width: '100%',
      paddingVertical: 30,
      backgroundColor: palette.default_bg,
    }}>
    {/* <CustomTextBold size={100}>asd</CustomTextBold> */}

    <Image
      style={{width: '100%', resizeMode: 'contain'}}
      source={require('~/images/homeguidescreen.png')}
    />

    {/* <CustomTextBold size={100}>asd</CustomTextBold> */}
  </Content>
);

HomeGuideScreen.navigationOptions = ({navigation}) => ({
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
      이용 안내
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

export default HomeGuideScreen;
