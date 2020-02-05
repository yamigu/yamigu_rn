import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium} from '../common/CustomText';
import {ListItem, List, Badge} from 'native-base';
import ChattingPreview from './ChattingPreview';

const ChattingList = ({style}) => (
  <List style={[styles.list, style]}>
    <ListItem itemDivider style={styles.listItemHeader}>
      <View style={styles.listItemHeaderView}>
        <CustomTextMedium color={palette.black} size={16}>
          대화중인 미팅
        </CustomTextMedium>
      </View>
    </ListItem>
    <ChattingPreview style={{marginBottom: 18}} />
    <ChattingPreview style={{marginBottom: 18}} />
    <ChattingPreview style={{marginBottom: 18}} />
    <ChattingPreview style={{marginBottom: 18}} />
    <ChattingPreview style={{marginBottom: 18}} />
    <ChattingPreview style={{marginBottom: 18}} />
  </List>
);

const styles = StyleSheet.create({
  list: {},
  listItemHeader: {
    paddingVertical: 0,
  },
  listItemHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ChattingList;
