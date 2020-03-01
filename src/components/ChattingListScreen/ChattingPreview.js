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
  avata,
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
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('chatStorage');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };
  useEffect(() => {
    getStorage().then(storage => {
      firebase
        .database()
        .ref('message/' + roomId)
        .orderByKey()
        .limitToLast(1)
        .on('child_added', result => {
          console.log(result.val());
          setLastMessage(result.val());
          if (
            storage === null ||
            storage === undefined ||
            result.val().time >
              storage['room' + roomId][storage['room' + roomId].length - 1].time
          ) {
            setIsNew(true);
          }
        });
    });
    return () => {
      firebase
        .database()
        .ref('message/' + roomId)
        .off('child_added');
    };
  }, []);
  return (
    <ListItem
      avatar
      style={[styles.chatPreview, style]}
      onPress={() => {
        if (hasVerified === 0) {
          console.log('hasVerified :: ' + hasVerified);
          Alert.alert('소속인증이 필요한 서비스입니다!');
          navigation.navigate('BV');
        } else if (hasVerified === 1) {
          Alert.alert(
            '소속인증 중입니다! 30분안에 해드릴게요 잠시만 기다려주세요!',
          );
        } else {
          setIsNew(false);
          navigation.navigate('Chatting', {
            partner: {
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
  );
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
