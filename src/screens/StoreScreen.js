import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  Alert,
  ScrollView,
  Text,
} from 'react-native';
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
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import NativeButton from 'apsl-react-native-button';

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable',
    'point_1000',
    '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const StoreScreen = ({navigation}) => {
  return (
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
        <ListItemWithPrice
          hot
          title="야미 30개"
          price="21,000"
          discount={12.5}
        />
        <ListItemWithPrice title="야미 50개" price="32,000" discount={20} />
        <ListItemWithPrice title="야미 100개" price="56,000" discount={30} />

        {/* <TouchableByPlatform>
          <Image
            onPress={requestPurchase(product.productId)}
            source={require('~/images/test-user-profile-girl.png')}
            style={{width: 100, height: 100, alignSelf: 'flex-end'}}
          />
        </TouchableByPlatform> */}
        <ListItem itemDivider>
          <CustomTextMedium size={18} color={palette.black}>
            무료로 야미 받기
          </CustomTextMedium>
        </ListItem>

        {/* Async로 usevalue불러와서 각 분기별 null 처리 */}
        <ListItemWithNavigation
          title="야미 10개 무료"
          toGoDisplay="친구 등록"
          toGo={() => navigation.navigate('AddFriends')}
        />
        <ListItemWithNavigation
          title="야미 5개 무료"
          toGoDisplay="소속 인증하기"
          toGo={() => navigation.navigate('BV')}
        />
        <ListItemWithNavigation
          title="야미 3개 무료"
          toGoDisplay="프로필 사진 등록하기"
          toGo={() => navigation.navigate('MyProfile')}
        />
      </List>
    </Content>
  );
};
StoreScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor={palette.black}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
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
