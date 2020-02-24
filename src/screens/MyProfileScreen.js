/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, createRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import ImageView from '~/components/MyProfileScreen/ImageView';
import FriendsView from '~/components/MyProfileScreen/FriendsView';
import MyFeedView from '~/components/MyProfileScreen/MyFeedView';
import InfoView from '~/components/MyProfileScreen/InfoView';
import {Content, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const MyProfileScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState ([]);
  const [offsetY, setOffsetY] = useState (0);
  const _scroll = createRef ();
  const _retrieveData = async () => {
    try {
      const userValue = await AsyncStorage.getItem ('userValue');
      const jUserValue = JSON.parse (userValue);
      if (userValue !== null) {
        // console.log('qweqwe');
        // console.log(jUserValue);
        setUserInfo (jUserValue);
        // console.log(jUserValue[3]);
      } else {
        console.log ('asdasd');
      }
    } catch (error) {}
  };
  useEffect (() => {
    _retrieveData ();
  }, []);

  return (
    <ScrollView
      ref={_scroll}
      showsVerticalScrollIndicator={false}
      style={styles.root}
      onScroll={e => {
        setOffsetY (e.nativeEvent.contentOffset.y);
      }}
    >
      <ImageView scroll={_scroll} offsetY={offsetY} />
      <View style={styles.divider} />
      <MyFeedView scroll={_scroll} offsetY={offsetY} userInfo={userInfo} />
      <FriendsView navigation={navigation} />
      <View style={styles.divider} />
      <InfoView navigation={navigation} userInfo={userInfo} />
    </ScrollView>
  );
};
MyProfileScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor={palette.black}
      onPress={() => {
        navigation.goBack ();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      프로필 수정
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});
const styles = StyleSheet.create ({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
  divider: {
    height: 1,
    backgroundColor: palette.divider,
    marginHorizontal: 12,
  },
});
export default MyProfileScreen;
