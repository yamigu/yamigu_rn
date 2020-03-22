import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Left, Right, Body, ListItem, Thumbnail, Row} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';

const deviceWidth = Dimensions.get('window').width;

const ReceivedItem = ({nickname, text, time, uid, style}) => {
  return (
    <ListItem style={[styles.listItem, style]}>
      <Body style={styles.bodySent}>
        <View style={styles.chattingBox}>
          <CustomTextRegular color={palette.black} size={14}>
            {text}
          </CustomTextRegular>
        </View>
        <View style={{flexDirection: 'row'}}>
          <CustomTextRegular
            color={palette.gray}
            size={10}
            style={{alignSelf: 'flex-end'}}>
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
    borderBottomWidth: 0,
    flexDirection: 'row-reverse',
  },
  chattingBox: {
    padding: 10,
    marginLeft: 4,
    backgroundColor: '#FFDBBD',
    borderTopRightRadius: 10,
  },
  bodySent: {
    paddingTop: 0,
    borderBottomWidth: 0,
    maxWidth: deviceWidth - 144,
    flexDirection: 'row-reverse',
  },
  right: {
    flexDirection: 'row-reverse',
    paddingTop: 0,
    alignSelf: 'flex-end',
    marginLeft: 4,
    paddingLeft: 0,
    borderBottomWidth: 0,
  },
  alignLeft: {},
});
export default ReceivedItem;
