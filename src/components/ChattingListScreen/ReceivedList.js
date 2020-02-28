import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextBold} from '../common/CustomText';
import {ListItem, List, Badge} from 'native-base';
import ChattingPreview from './ChattingPreview';

const ReceivedList = ({style, navigation, chatList}) => (
  <List style={[styles.list, style]}>
    {chatList.length > 0 ? (
      <ListItem itemDivider style={styles.listItemHeader}>
        <View style={styles.listItemHeaderView}>
          <CustomTextMedium color={palette.black} size={16}>
            주선된 미팅
          </CustomTextMedium>
          {/* <Badge style={styles.badge}>
            <CustomTextMedium size={12} color="white">
              2
            </CustomTextMedium>
          </Badge> */}
        </View>
      </ListItem>
    ) : null}
    {chatList.map(item => {
      return (
        <ChattingPreview style={{marginVertical: 9}} navigation={navigation} />
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
  badge: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    backgroundColor: palette.orange[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});
export default ReceivedList;
