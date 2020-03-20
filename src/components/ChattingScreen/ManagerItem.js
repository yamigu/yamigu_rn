import React from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {Left, Right, Body, ListItem, Thumbnail, Row} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';

const deviceWidth = Dimensions.get('window').width;
const ManagerItem = ({text, time}) => {
  return (
    <ListItem avatar style={styles.listItem}>
      <Left style={styles.left}>
        <Thumbnail
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          source={require('~/images/profile-yamigu.png')}
        />
      </Left>
      <Body style={styles.bodyReceived}>
        <View>
          <CustomTextRegular
            size={12}
            color={palette.gray}
            style={styles.alignLeft}>
            야미구
          </CustomTextRegular>
          <View style={[styles.chattingBox, {backgroundColor: '#FFF7F0'}]}>
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
    marginTop: 0,
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
export default ManagerItem;
