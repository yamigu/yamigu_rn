import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {List, ListItem, Left, Right} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import TouchableByPlatform from '../common/TouchableByPlatform';
import {TouchableOpacity} from 'react-native-gesture-handler';
const InfoView = ({params}) => (
  <View style={styles.container}>
    <CustomTextMedium size={18} color={palette.black} style={{marginLeft: 21}}>
      기본 정보
    </CustomTextMedium>
    <List style={styles.list}>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            닉네임
          </CustomTextRegular>
        </Left>
        <Right>
          <CustomTextRegular size={16} color={palette.gray}>
            읏츄읏츄
          </CustomTextRegular>
        </Right>
      </ListItem>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            성별
          </CustomTextRegular>
        </Left>
        <Right>
          <CustomTextRegular size={16} color={palette.gray}>
            남자
          </CustomTextRegular>
        </Right>
      </ListItem>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            나이
          </CustomTextRegular>
        </Left>
        <Right>
          <CustomTextRegular size={16} color={palette.gray}>
            27살
          </CustomTextRegular>
        </Right>
      </ListItem>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            소속
          </CustomTextRegular>
        </Left>
        <Right>
          <TouchableOpacity style={styles.listItemRight}>
            <CustomTextRegular size={16} color={palette.red}>
              인증하기
            </CustomTextRegular>
            <Anticon
              name="exclamationcircle"
              style={styles.iconWarning}
              size={18}
            />
          </TouchableOpacity>
        </Right>
      </ListItem>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            지역
          </CustomTextRegular>
        </Left>
        <Right>
          <TouchableOpacity style={styles.listItemRight}>
            <CustomTextRegular size={16} color={palette.red}>
              설정하기
            </CustomTextRegular>
            <Anticon
              name="exclamationcircle"
              style={styles.iconWarning}
              size={18}
            />
          </TouchableOpacity>
        </Right>
      </ListItem>
      <ListItem noIndent style={styles.listItem}>
        <Left>
          <CustomTextRegular size={16} color={palette.black}>
            키
          </CustomTextRegular>
        </Left>
        <Right>
          <TouchableOpacity style={styles.listItemRight}>
            <CustomTextRegular size={16} color={palette.red}>
              설정하기
            </CustomTextRegular>
            <Anticon
              name="exclamationcircle"
              style={styles.iconWarning}
              size={18}
            />
          </TouchableOpacity>
        </Right>
      </ListItem>
    </List>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  list: {
    marginTop: 12,
  },
  listItem: {
    borderBottomWidth: 0,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWarning: {
    color: palette.red,
    marginLeft: 3,
  },
});
export default InfoView;
