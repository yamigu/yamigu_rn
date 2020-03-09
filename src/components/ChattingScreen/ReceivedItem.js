import React from 'react';
import {StyleSheet, Dimensions, Text, View, Alert} from 'react-native';
import {Left, Right, Body, ListItem, Thumbnail, Row} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import TouchableByPlatform from '../common/TouchableByPlatform';

const deviceWidth = Dimensions.get('window').width;
const nowYear = 20200000;
const ReceivedItem = ({
  navigation,
  manager,
  text,
  time,
  partnerInfo,
  hasProfile,
}) => {
  // uid 로 avata 가져와서 저장해놓기

  return (
    <ListItem avatar style={styles.listItem}>
      <Left style={styles.left}>
        <TouchableByPlatform
          onPress={() => {
            if (!hasProfile) {
              Alert.alert(
                '프로필 사진을 등록하세요!',
                '상대방의 프로필을 보기 위해서는 먼저 프로필 사진을 등록해야해요!',
                [
                  {
                    text: '다음에',
                    style: 'cancel',
                    onPress: () => console.log('NOPE'),
                  },
                  {
                    text: '사진등록',
                    style: 'default',
                    onPress: () => {
                      navigation.navigate('MyProfile');
                    },
                  },
                ],
              );
            } else {
              navigation.navigate('Profile', {
                location: partnerInfo.location,
                height: partnerInfo.height,
                verified: partnerInfo.verified,
                uid: partnerInfo.uid,
                nickname: partnerInfo.nickname,
                avata: partnerInfo.avata,
                age: Math.floor((nowYear - partnerInfo.birthdate) / 10000 + 2),
                belong: partnerInfo.belong,
                department: partnerInfo.department,
                is_chatting: true,
              });
            }
          }}>
          <Thumbnail
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
            source={
              partnerInfo.avata === null
                ? require('~/images/user-default-profile.png')
                : {uri: partnerInfo.avata}
            }
          />
        </TouchableByPlatform>
      </Left>
      <Body style={styles.bodyReceived}>
        <View>
          <CustomTextRegular
            size={12}
            color={palette.gray}
            style={styles.alignLeft}>
            {partnerInfo.nickname}
          </CustomTextRegular>
          <View
            style={
              manager
                ? [styles.chattingBox, {backgroundColor: '#FFF7F0'}]
                : styles.chattingBox
            }>
            <CustomTextRegular size={14} color={palette.black}>
              {text}
            </CustomTextRegular>
          </View>
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <CustomTextRegular color={palette.gray} size={10}>
            {time}
          </CustomTextRegular>
        </View>
      </Body>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  listItem: {
    marginLeft: 15,
    marginBottom: 15,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  left: {
    paddingTop: 0,
    alignSelf: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chattingBox: {
    marginTop: 2,
    borderTopLeftRadius: 10,
    padding: 10,
    marginRight: 4,
    backgroundColor: 'white',
    maxWidth: deviceWidth - 144,
  },
  bodyReceived: {
    flexDirection: 'row',
    paddingTop: 0,
    borderBottomWidth: 0,
  },
  right: {
    paddingTop: 0,
    alignSelf: 'flex-end',
    marginLeft: 4,
    paddingLeft: 0,
    borderBottomWidth: 0,
  },
  alignLeft: {},
});
export default ReceivedItem;
