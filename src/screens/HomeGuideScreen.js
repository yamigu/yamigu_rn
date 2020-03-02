/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import palette from '~/lib/styles/palette';
import {Content} from 'native-base';
import {CustomTextBold, CustomTextMedium} from '~/components/common/CustomText';
import {HeaderBackButton} from 'react-navigation-stack';
const deviceWidth = Dimensions.get('window').width;
const HomeGuideScreen = ({navigation}) => (
  <Content
    style={{
      flex: 1,
      width: '100%',
      paddingVertical: 0,
      backgroundColor: palette.default_bg,
    }}
    contentContainerStyle={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {/* <CustomTextBold size={100}>asd</CustomTextBold> */}
    <Image
      style={{
        width: deviceWidth * 0.9,
        // height: '100%',
        // width: (deviceWidth * 317) / 375,
        // height:
        resizeMode: 'repeat',
      }}
      source={require('~/images/guide.png')}
    />
    {/* <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 317) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-1.png')}
    />
    <View
      style={{
        width: (deviceWidth * 351) / 375,
        height: 1,
        marginVertical: 20,
        backgroundColor: palette.divider,
      }}
    />
    <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 225) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-2.png')}
    />
    <View
      style={{
        width: (deviceWidth * 351) / 375,
        height: 1,
        marginVertical: 20,
        backgroundColor: palette.divider,
      }}
    />
    <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 130) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-3.png')}
    />
    <View
      style={{
        width: (deviceWidth * 351) / 375,
        height: 1,
        marginVertical: 20,
        backgroundColor: palette.divider,
      }}
    />
    <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 180) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-4.png')}
    />
    <View
      style={{
        width: (deviceWidth * 351) / 375,
        height: 1,
        marginVertical: 20,
        backgroundColor: palette.divider,
      }}
    />
    <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 172) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-5.png')}
    />
    <View
      style={{
        width: (deviceWidth * 351) / 375,
        height: 1,
        marginVertical: 20,
        backgroundColor: palette.divider,
      }}
    />
    <Image
      style={{
        width: (deviceWidth * 317) / 375,
        height: (deviceWidth * 317) / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-6.png')}
    /> */}
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
