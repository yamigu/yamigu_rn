import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {ListItem, Left, Body, Right} from 'native-base';
import {CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TouchableByPlatform from '../common/TouchableByPlatform';

const ListItemWithNavigation = ({title, toGo, toGoDisplay}) => (
  <TouchableByPlatform onPress={toGo}>
    <ListItem noIndent icon style={styles.listItem}>
      <Left style={styles.listItemLeft}>
        <Image
          style={styles.iconYami}
          source={require('~/images/yami_icon.png')}
        />
      </Left>
      <Body style={styles.listItemBody}>
        <CustomTextRegular size={16} color={palette.black}>
          {title}
        </CustomTextRegular>
      </Body>
      <Right style={styles.listItemRight} onPress={toGo}>
        <CustomTextRegular size={14} color={palette.gray}>
          {toGoDisplay}
        </CustomTextRegular>
        <Ionicon
          name="ios-arrow-forward"
          size={16}
          style={styles.iconForward}
        />
      </Right>
    </ListItem>
  </TouchableByPlatform>
);

const styles = StyleSheet.create({
  listItem: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: palette.default_bg,
    paddingBottom: 0,
    paddingTop: 0,
  },
  listItemLeft: {
    paddingTop: 0,
  },
  listItemBody: {
    paddingBottom: 0,
    paddingTop: 0,
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listItemRight: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  iconForward: {
    marginLeft: 2,
    color: palette.gray,
  },
  iconYami: {
    width: 16.67,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
});
export default ListItemWithNavigation;
