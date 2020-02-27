import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ListItem, Left, Body, Right, Badge} from 'native-base';
import {CustomTextRegular, CustomTextMedium} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import Anticon from 'react-native-vector-icons/AntDesign';
import TouchableByPlatform from '../common/TouchableByPlatform';

const ListItemWithPrice = ({title, price, hot, discount, onPress}) => (
  <TouchableByPlatform>
    <ListItem noIndent icon style={styles.listItem} onPress={onPress}>
      <Left style={styles.listItemLeft}>
        <Image
          style={styles.iconYami}
          source={require('~/images/icon-yami.png')}
        />
      </Left>
      <Body style={styles.listItemBody}>
        <CustomTextRegular size={16} color={palette.black}>
          {title}
        </CustomTextRegular>
        {hot ? (
          <Badge style={styles.badgeHot}>
            <CustomTextMedium size={10} color="white">
              인기
            </CustomTextMedium>
          </Badge>
        ) : null}
      </Body>
      <Right style={styles.listItemRight}>
        {discount ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomTextRegular size={10} color={palette.red}>
              {discount}%
            </CustomTextRegular>
            <Anticon name="caretdown" style={styles.iconDown} size={10} />
          </View>
        ) : null}
        <CustomTextRegular size={16} color={palette.orange}>
          {price}
        </CustomTextRegular>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  iconDown: {
    color: palette.red,
  },
  badgeHot: {
    backgroundColor: palette.orange,
    borderRadius: 10,
    width: 38,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 7,
  },
});
export default ListItemWithPrice;
