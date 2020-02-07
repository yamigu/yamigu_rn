import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {CustomTextMedium} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import ImageView from '~/components/MyProfileScreen/ImageView';
import FriendsView from '~/components/MyProfileScreen/FriendsView';
import InfoView from '~/components/MyProfileScreen/InfoView';

const MyProfileScreen = ({params}) => (
  <View style={styles.root}>
    <ImageView />
    <FriendsView />
    <InfoView />
  </View>
);
MyProfileScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
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
});
export default MyProfileScreen;
