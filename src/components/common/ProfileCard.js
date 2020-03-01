/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
} from 'native-base';
import {
  CustomTextBold,
  CustomTextMedium,
  CustomTextRegular,
} from './CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const ProfileCard = ({
  location,
  size,
  fontSizes,
  nickname,
  avata,
  age,
  belong,
  department,
  bothLike,
  rightComponent,
}) => {
  useEffect(() => {
    console.log(avata);
  }, []);
  return (
    <List style={{height: size}}>
      <ListItem avatar style={{marginLeft: 0}}>
        <Left style={{paddingTop: 0, paddingBottom: 0}}>
          <Thumbnail
            style={{
              alignSelf: 'center',
              height: size,
              width: size,
              borderRadius: size / 2,
            }}
            source={
              avata
                ? {uri: avata.uri}
                : require('~/images/user-default-profile.png')
            }
          />
        </Left>
        <Body
          style={{
            justifyContent: 'center',
            height: '100%',
            borderBottomWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}>
          <View style={styles.textView}>
            <View style={styles.firstLine}>
              <CustomTextBold
                style={{marginRight: 8}}
                size={fontSizes[0]}
                color={palette.black}>
                {nickname}
              </CustomTextBold>
              <CustomTextMedium size={fontSizes[1]} color={palette.black}>
                {age + (age === '' ? '' : '살')}
              </CustomTextMedium>
            </View>
            <View style={styles.secondLine}>
              <CustomTextRegular size={fontSizes[2]} color={palette.sub}>
                {belong} {department}, {location}
              </CustomTextRegular>
            </View>
          </View>
        </Body>

        <Right
          style={{
            borderBottomWidth: 0,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 10,
          }}>
          {/* {bothLike === true ? (
            <Image source={require('~/images/bothlike-icon.png')} />
          ) : null} */}
          {rightComponent}
          {bothLike && <Image source={require('~/images/bothlike-icon.png')} />}
        </Right>
      </ListItem>
    </List>
  );
};
const styles = StyleSheet.create({
  textView: {
    justifyContent: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondLine: {},
  bothLike: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 52,
  },
  modalButtonMultiple: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 0,
    height: 52,
  },
  modalBtnContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
export default ProfileCard;
