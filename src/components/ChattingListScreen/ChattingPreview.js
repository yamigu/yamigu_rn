import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import {ListItem, Left, Badge, Body, Right} from 'native-base';
import UserProfileSmall from '../common/UserProfileSmall';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';

const ChattingPreview = ({style, label, navigation}) => (
  <ListItem
    avatar
    style={[styles.chatPreview, style]}
    onPress={() => navigation.navigate('Chatting')}>
    <Left style={styles.chatPreviewLeft}>
      <UserProfileSmall
        imageSource={require('~/images/test-user-profile-4.png')}
        badgeComponent={label ? <Badge style={styles.label} /> : null}
      />
    </Left>
    <Body style={styles.chatPreviewBody}>
      <View style={styles.chatPreviewBodyTextView}>
        <CustomTextMedium size={16} color={palette.black}>
          꿈발라
        </CustomTextMedium>
        <CustomTextRegular size={12} color={palette.gray}>
          미팅 신청이 들어왔어요!
        </CustomTextRegular>
      </View>
    </Body>
    <Right style={styles.chatPreviewRight}>
      <View style={styles.chatPreviewRightTextView}>
        <CustomTextRegular size={10} color={palette.gray}>
          오후 2:22
        </CustomTextRegular>
        <Badge style={styles.badgeUnread}>
          <CustomTextMedium size={10} color="white">
            1
          </CustomTextMedium>
        </Badge>
      </View>
    </Right>
  </ListItem>
);

const styles = StyleSheet.create({
  badgeUnread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  chatPreview: {
    borderBottomWidth: 0,
  },
  chatPreviewLeft: {
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  chatPreviewBody: {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  chatPreviewRight: {
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  chatPreviewBodyTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  chatPreviewRightTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  label: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: palette.orange[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChattingPreview;
