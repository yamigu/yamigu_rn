import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextBold} from '../common/CustomText';
import {ListItem, List, Badge} from 'native-base';
import ChattingPreview from './ChattingPreview';

const ChattingList = ({style, navigation, chatList, hasVerified}) => (
  <List style={[styles.list, style]}>
    <ListItem itemDivider style={styles.listItemHeader}>
      <View style={styles.listItemHeaderView}>
        <CustomTextMedium color={palette.black} size={16}>
          대화중인 친구
        </CustomTextMedium>
      </View>
    </ListItem>
    {chatList.map((item, index) => {
      return (
        <ChattingPreview
          key={index}
          hasVerified={hasVerified}
          style={{marginVertical: 9}}
          navigation={navigation}
          avata={item.avata}
          nickname={item.nickname}
          created_at={item.created_at}
          approved={item.approved_on !== null ? true : false}
          roomId={item.id}
        />
      );
    })}
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
