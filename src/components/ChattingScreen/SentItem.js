import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Left, Right, Body, ListItem, Thumbnail, Row} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';

const deviceWidth = Dimensions.get('window').width;

const ReceivedItem = ({params}) => (
  <ListItem style={styles.listItem}>
    <Body style={styles.bodySent}>
      <View style={styles.chattingBox}>
        <CustomTextRegular color={palette.black} size={14}>
          안녕하세요, 야미구 매칭 축하드려요! 두 분과 친구들과 만날 약속을 빨리
          잡아 즐거운 미팅 하시길 바래요!
        </CustomTextRegular>
      </View>
      <View style={{flexDirection: 'row'}}>
        <CustomTextRegular
          color={palette.gray}
          size={10}
          style={{alignSelf: 'flex-end'}}>
          오후 15:15
        </CustomTextRegular>
      </View>
    </Body>
  </ListItem>
);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 15,
    marginTop: 15,
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
