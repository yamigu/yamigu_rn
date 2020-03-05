/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, ScrollView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import palette from '~/lib/styles/palette';
import {Content, Button} from 'native-base';
import {CustomTextBold, CustomTextMedium} from '~/components/common/CustomText';
import {HeaderBackButton} from 'react-navigation-stack';
const deviceWidth = Dimensions.get('window').width;
const HomeGuideScreen = ({navigation}) => (
  <ScrollView
    style={{
      backgroundColor: palette.default_bg,
      paddingVertical: 20,
      // backgroundColor: palette.gold,
    }}
    contentContainerStyle={{
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
    {/* <Image
      style={{
        paddingTop: 0,
        marginTop: 0,
        // width: 100,
        height: 1500,
        // backgroundColor: palette.blue,
        resizeMode: 'contain',
      }}
      source={require('~/images/guide.png')}
    /> */}
    <Image
      style={{
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 777) / 2.4511 / 375,
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
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 565) / 2.4511 / 375,
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
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 291) / 2.4511 / 375,
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
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 453) / 2.4511 / 375,
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
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 545) / 2.4511 / 375,
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
        width: (deviceWidth * 777) / 2.4511 / 375,
        height: (deviceWidth * 777) / 2.4511 / 375,
        resizeMode: 'cover',
      }}
      source={require('~/images/homeguidescreen-6.png')}
    />
    {/* <CustomTextBold size={100}>asd</CustomTextBold> */}
  </ScrollView>
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
