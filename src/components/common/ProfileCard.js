/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {List, ListItem, Left, Body, Right, Thumbnail} from 'native-base';
import {
  CustomTextBold,
  CustomTextMedium,
  CustomTextRegular,
} from './CustomText';
import palette from '~/lib/styles/palette';
var deviceWidth = Dimensions.get('window').width;
const ProfileCard = ({
  size,
  fontSizes,
  nickname,
  image,
  age,
  belong,
  department,
  location,
  rightComponent,
}) => (
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
          source={image ? image : require('~/images/user-default-profile.png')}
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
              {age}살
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
          justifyContent: 'center',
          paddingBottom: 0,
        }}>
        <View style={styles.bothLike}>{rightComponent}</View>
      </Right>
    </ListItem>
  </List>
);
const styles = StyleSheet.create({
  textView: {
    justifyContent: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondLine: {},
  bothLike: {},
});
export default ProfileCard;
