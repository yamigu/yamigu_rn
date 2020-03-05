import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import palette from '~/lib/styles/palette';
import {ListItem, Left, Badge, Body, Right} from 'native-base';
import UserProfileSmall from '../common/UserProfileSmall';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import Moment from 'moment';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

Moment.lang('kr');

const iso_to_string = time => {
  if (Moment(time).diff(Moment(new Date()), 'date') > 0) {
    return Moment(time).format('M월 D일');
  }
  return Moment(time).format('a h:mm');
};
const ChattingPreview = ({
  style,
  label,
  navigation,
  hasVerified,
  uid,
  avata,
  puid,
  nickname,
  created_at,
  approved,
  roomId,
}) => {
  const [lastMessage, setLastMessage] = useState({
    message: '',
    time: 123123123123,
  });
  const [isNew, setIsNew] = useState(false);
  useEffect(() => {
    let focused = true;
    const focusListener = navigation.addListener('didFocus', () => {
      focused = true;
    });
    const blurListener = navigation.addListener('willBlur', () => {
      focused = false;
    });
    firebase
      .database()
      .ref('message/' + roomId)
      .orderByKey()
      .limitToLast(1)
      .on('child_added', result => {
        setLastMessage(result.val());
        if (focused) {
          console.log('newMessage!!');
          firebase
            .database()
            .ref('user/' + uid + '/chat/' + roomId)
            .once('child_added', unread => {
              console.log('unread message?');
              console.log(unread.val());
              if (unread.val() === true) setIsNew(true);
            });
        }
      });
    return () => {
      focusListener.remove();
      blurListener.remove();
      firebase
        .database()
        .ref('message/' + roomId)
        .off('child_added');
    };
  }, []);
  return roomId > 0 ? (
    <ListItem
      avatar
      style={[styles.chatPreview, style]}
      onPress={() => {
        if (hasVerified === 0) {
          console.log('hasVerified :: ' + hasVerified);
          Alert.alert(
            '소속을 인증해보세요!',
            '채팅가능 + 보너스 야미 소속이 인증된 친구들을 만나보세요',
            [
              {
                text: '인증하기',
                onPress: () => navigation.navigate('BV'),
              },
            ],
          );
          navigation.navigate('BV');
        } else if (hasVerified === 1) {
          Alert.alert('소속인증이 진행중입니다!', '잠시만 기다려주세요');
        } else {
          setIsNew(false);
          navigation.navigate('Chatting', {
            partner: {
              uid: puid,
              nickname: nickname,
              avata: avata,
            },
            approved: approved,
            roomId: roomId,
          });
          console.log('hasVerified :: ' + hasVerified);
        }
      }}>
      <Left style={styles.chatPreviewLeft}>
        <UserProfileSmall
          imageSource={
            avata === null
              ? require('~/images/user-default-profile.png')
              : {uri: avata}
          }
          badgeComponent={isNew ? <Badge style={styles.label} /> : null}
        />
      </Left>
      <Body style={styles.chatPreviewBody}>
        <View style={styles.chatPreviewBodyTextView}>
          <CustomTextMedium size={16} color={palette.black}>
            {nickname}
          </CustomTextMedium>
          <CustomTextRegular size={12} color={palette.gray}>
            {approved ? lastMessage.message : '미팅 신청이 들어왔어요!'}
          </CustomTextRegular>
        </View>
      </Body>
      <Right style={styles.chatPreviewRight}>
        <View style={styles.chatPreviewRightTextView}>
          <CustomTextRegular size={10} color={palette.gray}>
            {approved
              ? Moment(parseInt(lastMessage.time)).diff(Moment.now(), 'day') > 0
                ? Moment(parseInt(lastMessage.time)).format('M월 DD일')
                : Moment(parseInt(lastMessage.time)).format('a h:mm')
              : iso_to_string(created_at)}
          </CustomTextRegular>
          {/* <Badge style={styles.badgeUnread}>
            <CustomTextMedium size={10} color="white">
              1
            </CustomTextMedium>
          </Badge> */}
        </View>
      </Right>
    </ListItem>
  ) : null;
};

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
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ChattingPreview;
