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
  noTouch,
  verified,
  uid,
  setLiked,
  liked,
  navigation,
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
  addF,
}) => {
  useEffect(() => {
    console.log(avata);
  }, []);
  return (
    <List style={{height: size}}>
      <ListItem
        avatar
        style={{
          marginLeft: 0,
          marginTop: 0,
          // backgroundColor: palette.gold,
          paddingTop: 0,
          paddingLeft: 0,
        }}>
        <Left style={{paddingTop: 0, paddingBottom: 0}}>
          <TouchableByPlatform
            onPress={() => {
              if (noTouch !== true) {
                navigation.navigate('Profile', {
                  viewpagerIndex: 0,
                  location,
                  verified,
                  uid,
                  nickname,
                  avata: avata.uri,
                  age,
                  belong,
                  department,
                  liked,
                  setLiked: value => setLiked(value),
                });
              }
            }}>
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
          </TouchableByPlatform>
        </Left>
        <Body
          style={{
            justifyContent: size === 66 ? 'center' : null,
            height: '100%',
            borderBottomWidth: 0,
            paddingTop: 0,
            marginTop: 0,
            // backgroundColor: palette.blue,
          }}>
          <View style={styles.textView}>
            <View style={styles.firstLine}>
              <CustomTextBold
                style={{
                  marginRight: 8,
                  paddingTop: 0,
                  marginTop: 0,
                }}
                size={fontSizes[0]}
                color={palette.black}>
                {nickname}
              </CustomTextBold>
              <CustomTextMedium size={fontSizes[1]} color={palette.black}>
                {age + (age === '' ? '' : '살')}
              </CustomTextMedium>
            </View>
            <View style={styles.secondLine}>
              {addF === true ? (
                <CustomTextRegular size={fontSizes[2]} color={palette.sub}>
                  {belong} {department}
                </CustomTextRegular>
              ) : (
                <CustomTextRegular size={fontSizes[2]} color={palette.sub}>
                  {belong} {department}, {location}
                </CustomTextRegular>
              )}
            </View>
          </View>
        </Body>

        <Right
          style={{
            borderBottomWidth: 0,
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingRight: 0,
            // backgroundColor: palette.gray,
          }}>
          {/* {bothLike === true ? (
            <Image source={require('~/images/bothlike-icon.png')} />
          ) : null} */}
          {rightComponent}
          {bothLike && (
            <Image
              style={{
                width: 50,
                height: 50,
                // backgroundColor: palette.blue
              }}
              source={require('~/images/bothlike-icon.png')}
            />
          )}
        </Right>
      </ListItem>
    </List>
  );
};
const styles = StyleSheet.create({
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  firstLine: {
    marginTop: 0,
    paddingTop: 0,
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
