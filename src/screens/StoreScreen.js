import React from 'react';
import {View, StyleSheet, Image, Platform} from 'react-native';
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
import * as RNIap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: ['com.example.coins100'],
  android: ['com.example.coins100'],
});

// async componentDidMount() {
//   try {
//     const products: Product[] = await RNIap.getProducts(itemSkus);
//     this.setState({ products });
//   } catch(err) {
//     console.warn(err); // standardized err.code and err.message available
//   }
// }

const StoreScreen = ({navigation}) => {
  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;
  /**
  let requestPurchase = async (sku: string) => {
    try {
      await RNIap.requestPurchase(sku, false);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  let requestSubscription = async (sku: string) => {
    try {
      await RNIap.requestSubscription(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  function componentDidMount() {
    purchaseUpdateSubscription = purchaseUpdatedListener(
      (purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase) => {
        console.log('purchaseUpdatedListener', purchase);
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          yourAPI
            .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
            .then(deliveryResult => {
              if (isSuccess(deliveryResult)) {
                // Tell the store that you have delivered what has been paid for.
                // Failure to do this will result in the purchase being refunded on Android and
                // the purchase event will reappear on every relaunch of the app until you succeed
                // in doing the below. It will also be impossible for the user to purchase consumables
                // again untill you do this.
                if (Platform.OS === 'ios') {
                  RNIap.finishTransactionIOS(purchase.transactionId);
                } else if (Platform.OS === 'android') {
                  // If consumable (can be purchased again)
                  RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                  // If not consumable
                  RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
                }

                // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
                // If consumable (can be purchased again)
                RNIap.finishTransaction(purchase, true);
                // If not consumable
                RNIap.finishTransaction(purchase, false);
              } else {
                // Retry / conclude the purchase is fraudulent, etc...
              }
            });
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.warn('purchaseErrorListener', error);
      },
    );
  }

  function componentWillUnmount() {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }
**/
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
