import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium} from '../common/CustomText';
import {ListItem, List, Badge} from 'native-base';
import ChattingPreview from './ChattingPreview';

const ChattingList = ({style, navigation}) => (
  <List style={[styles.list, style]}>
    <ListItem itemDivider style={styles.listItemHeader}>
      <View style={styles.listItemHeaderView}>
        <CustomTextMedium color={palette.black} size={16}>
          대화중인 미팅
        </CustomTextMedium>
      </View>
    </ListItem>
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
    <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
  </List>
);

const styles = StyleSheet.create({
  list: {},
  listItemHeader: {
    marginTop: 12,
    paddingTop: 0,
    paddingBottom: 3,
  },
  listItemHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ChattingList;
