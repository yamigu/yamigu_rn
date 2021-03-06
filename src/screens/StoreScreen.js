/* eslint-disable react-hooks/exhaustive-deps */
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
import axios from 'axios';
import '~/config';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const itemSkus = Platform.select({
  ios: ['yami_10', 'yami_30', 'yami_50', 'yami_100'],
  android: ['yami_10', 'yami_30', 'yami_50', 'yami_100'],
});

const itemSubs = Platform.select({
  ios: [
    // 'com.cooni.point1000',
    // 'com.cooni.point5000', // dooboolab
  ],
  android: [
    // 'test.sub1', // subscription
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const StoreScreen = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [receipt, setReceipt] = useState('');
  const [availableItemsMessage, setAvailableItemsMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [yami, setYami] = useState(0);
  const [loading, setLoading] = useState(false);
  const [spinnerLoading, setSpinnerLoading] = useState(false);

  useEffect(() => {
    initIap();
    // getAvailablePurchases();
    getItems();
    _retrieveData();
  }, []);
  const _retrieveData = async () => {
    try {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);

      setUserInfo(jUserValue);
      if (userValue !== null) {
        setYami(jUserValue[global.config.user_info_const.YAMI]);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  Number.prototype.format = function() {
    if (this == 0) return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = this + '';

    while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');

    return n;
  };
  String.prototype.format = function() {
    var num = parseFloat(this);
    if (isNaN(num)) return '0';

    return num.format();
  };

  const initIap = async () => {
    try {
      const result = await RNIap.initConnection();
      await RNIap.consumeAllItemsAndroid();
      console.log('result', result);
    } catch (err) {
      throw err;
    }
    purchaseUpdateSubscription = purchaseUpdatedListener(async () => {
      const receipt = (InAppPurchase | SubscriptionPurchase).transactionReceipt;
      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            finishTransactionIOS(
              (InAppPurchase | SubscriptionPurchase).transactionId,
            );
          } else if (Platform.OS === 'android') {
            // If consumable (can be purchased again)
            consumePurchaseAndroid(
              (InAppPurchase | SubscriptionPurchase).purchaseToken,
            );
            // If not consumable
            acknowledgePurchaseAndroid(
              (InAppPurchase | SubscriptionPurchase).purchaseToken,
            );
          }
          const ackResult = await finishTransaction(
            InAppPurchase | SubscriptionPurchase,
          );
        } catch (ackErr) {
          console.warn('ackErr', ackErr);
        }
        setReceipt(receipt, () => goNext());
      }
    });
    purchaseErrorSubscription = purchaseErrorListener(PurchaseError => {
      console.log('purchaseErrorListener', PurchaseError);
      Alert.alert('purchase error', JSON.stringify(PurchaseError));
    });
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  };
  const goNext = () => {
    Alert.alert('Receipt', receipt);
  };

  const getItems = async () => {
    try {
      setSpinnerLoading(true);
      const products = await RNIap.getProducts(itemSkus);
      products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      products.map(item => {
        item['hot'] = false;
        item['discount'] = 0;
      });
      products[1].hot = true;
      products[1].discount = 7;
      products[2].discount = 15;
      products[3].discount = 27;

      setProductList(products);
      await setSpinnerLoading(false);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getAvailablePurchases = async () => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        setAvailableItemsMessage('item length : ' + purchases.length);
        setReceipt(purchases[0].transactionReceipt);
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  const requestPurchase = async sku => {
    if (spinnerLoading) return;
    setSpinnerLoading(true);
    try {
      const result = await RNIap.requestPurchase(sku, false);
      const result2 = await axios.post(
        global.config.api_host + 'purchase/validate/' + Platform.OS + '/',
        {
          payload: JSON.stringify(result),
          env: __DEV__ ? 'sandbox' : 'release',
        },
      );
      setYami(result2.data);
      const newInfo = userInfo.slice();
      newInfo[global.config.user_info_const.YAMI] = result2.data;
      setUserInfo(newInfo);
      AsyncStorage.setItem('userValue', JSON.stringify(newInfo));

      const result3 =
        Platform.OS === 'android'
          ? await RNIap.consumeAllItemsAndroid().then(result => {
              console.log(result);
            })
          : await RNIap.finishTransactionIOS().then(result => {
              console.log(result);
            });
      setSpinnerLoading(false);
    } catch (err) {
      setSpinnerLoading(false);

      Alert.alert('오류가 발생했습니다', err.message);
      console.log(err);
      if (err.code === 'E_USER_CANCELLED') {
        console.log(err.message);
      } else if (err.code === 'E_ALREADY_OWNED') {
        return Platform.OS === 'android'
          ? await RNIap.consumeAllItemsAndroid().then(result => {
              console.log(result);
            })
          : await RNIap.finishTransactionIOS().then(result => {
              console.log(result);
            });
      } else {
        return Platform.OS === 'android'
          ? await RNIap.consumeAllItemsAndroid().then(result => {
              console.log(result);
            })
          : await RNIap.finishTransactionIOS().then(result => {
              console.log(result);
            });
      }
    }
  };

  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <Spinner
        visible={spinnerLoading}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
      />
      <List style={styles.list}>
        <ListItem itemHeader style={styles.listItemHeader}>
          <Body style={styles.listItemHeaderBody}>
            <CustomTextMedium size={14} color={palette.black}>
              현재 보유 야미 {availableItemsMessage} {receipt}
            </CustomTextMedium>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.iconYami}
                source={require('~/images/yami_icon.png')}
              />
              <CustomTextRegular size={16} color={palette.black}>
                {yami === 'yami' ? null : yami}
              </CustomTextRegular>
            </View>
          </Body>
        </ListItem>
        {productList.map((product, i) => {
          return (
            <ListItemWithPrice
              key={i}
              title={product.title.split('(')[0]}
              price={product.price.format()}
              discount={product.discount === 0 ? false : product.discount}
              hot={product.hot}
              onPress={() => requestPurchase(product.productId)}
            />
          );
        })}
        {/* <TouchableByPlatform>
          <Image
            onPress={requestPurchase(product.productId)}
            source={require('~/images/test-user-profile-girl.png')}
            style={{width: 100, height: 100, alignSelf: 'flex-end'}}
          />
        </TouchableByPlatform> */}
        <ListItem itemDivider>
          <CustomTextMedium
            size={18}
            color={palette.black}
            style={{marginTop: 20, marginBottom: 10}}>
            무료로 야미 받기
          </CustomTextMedium>
        </ListItem>

        {/* Async로 usevalue불러와서 각 분기별 null 처리 */}
        <ListItemWithNavigation
          title="야미 10개 무료"
          toGoDisplay="친구 추가"
          toGo={() => navigation.navigate('AddFriends')}
        />
        {userInfo !== null &&
        userInfo[global.config.user_info_const.VERIFIED] === 0 ? (
          <ListItemWithNavigation
            title="야미 5개 무료"
            toGoDisplay="소속 인증하기"
            toGo={() => navigation.navigate('BV')}
          />
        ) : null}

        {userInfo !== null &&
        userInfo[global.config.user_info_const.AVATA] === null ? (
          <ListItemWithNavigation
            title="야미 5개 무료"
            toGoDisplay="프로필 사진 등록하기"
            toGo={() => navigation.navigate('MyProfile')}
          />
        ) : null}
      </List>
      <View
        style={{width: 1, height: 30, backgroundColor: palette.default_bg}}
      />
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
  drawerLockMode: 'locked-closed',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    paddingTop: Platform.select({
      ios: 0,
      android: 24,
    }),
    backgroundColor: 'white',
  },
  header: {
    flex: 20,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 26,
    color: 'green',
  },
  content: {
    flex: 80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: 'center',
    backgroundColor: '#00c40f',
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 16,
    color: 'white',
  },
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
