import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import palette from '~/lib/styles/palette';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import {List, ListItem, Body, Content} from 'native-base';
import ListItemWithPrice from '~/components/StoreScreen/ListItemWithPrice';
import ListItemWithNavigation from '~/components/StoreScreen/ListItemWithNavigation';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';

const StoreScreen = ({navigation}) => (
  <Content showsVerticalScrollIndicator={false} style={styles.root}>
    <List style={styles.list}>
      <ListItem itemHeader style={styles.listItemHeader}>
        <Body style={styles.listItemHeaderBody}>
          <CustomTextMedium size={14} color={palette.black}>
            현재 보유 야미
          </CustomTextMedium>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.iconYami}
              source={require('~/images/icon-yami.png')}
            />
            <CustomTextRegular size={16} color={palette.black}>
              10
            </CustomTextRegular>
          </View>
        </Body>
      </ListItem>
      <ListItemWithPrice title="야미 10개" price="8,000" />
      <ListItemWithPrice hot title="야미 30개" price="21,000" discount={12.5} />
      <ListItemWithPrice title="야미 50개" price="32,000" discount={20} />
      <ListItemWithPrice title="야미 100개" price="56,000" discount={30} />
      <ListItem itemDivider>
        <CustomTextMedium size={18} color={palette.black}>
          무료로 야미 받기
        </CustomTextMedium>
      </ListItem>
      <ListItemWithNavigation
        title="야미 10개 무료"
        toGoDisplay="친구 등록"
        toGo={() => navigation.navigate('AddFriends')}
      />
      <ListItemWithNavigation
        title="야미 5개 무료"
        toGoDisplay="소속 인증하기"
        toGo={() => navigation.navigate('AddFriends')}
      />
      <ListItemWithNavigation
        title="야미 3개 무료"
        toGoDisplay="프로필 완성하기"
        toGo={() => navigation.navigate('MyProfile')}
      />
    </List>
  </Content>
);
StoreScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      야미 스토어
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: palette.default_bg,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {},
  listItemHeader: {
    backgroundColor: palette.default_bg,
    paddingBottom: 20,
    paddingTop: 20,
  },
  listItemHeaderBody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconYami: {
    width: 16.67,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
  },
});
export default StoreScreen;
