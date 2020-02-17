import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {CustomTextMedium} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import ImageView from '~/components/MyProfileScreen/ImageView';
import FriendsView from '~/components/MyProfileScreen/FriendsView';
import MyFeedView from '~/components/MyProfileScreen/MyFeedView';
import InfoView from '~/components/MyProfileScreen/InfoView';
import {Content} from 'native-base';
import ImagePicker from 'react-native-image-picker';

const MyProfileScreen = ({navigation}) => {
  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <ImageView />
      <View style={styles.divider} />
      <MyFeedView />
      <FriendsView navigation={navigation} />
      <View style={styles.divider} />
      <InfoView />
    </Content>
  );
};
MyProfileScreen.navigationOptions = ({navigation}) => ({
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
      프로필 수정
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});
const styles = StyleSheet.create({
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
