import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import KakaoLoginButton from '~/components/LoginScreen/KakaoLoginButton';
import AppleLoginButton from '~/components/LoginScreen/AppleLoginButton';
import KakaoLogins from '@react-native-seoul/kakao-login';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import {
  CustomTextRegular,
  CustomTextBold,
  CustomTextMedium,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import Navigation from '~/../Navigation';
import {CommonActions} from '@react-navigation/native';
import {HeaderBackButton} from 'react-navigation-stack';
import utf8 from 'utf8';
import {SampleConsumer} from '~/Context/Sample';

const majorVersionIOS = parseInt(Platform.Version, 10);
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const ButtonContainerAndroid = ({kakaoLogin}) => {
  return (
    <View style={styles.buttonContainer}>
      <KakaoLoginButton onPress={kakaoLogin} />
    </View>
  );
};
const ButtonContainerApple = ({kakaoLogin, onAppleButtonPress}) => {
  return (
    <View style={styles.buttonContainer}>
      {/* <AppleButton
        width={dw * 0.8}
        height={50}
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        onPress={onAppleButtonPress}
      /> */}
      {majorVersionIOS > 12 ? (
        <AppleLoginButton onPress={onAppleButtonPress} />
      ) : null}
      <KakaoLoginButton onPress={kakaoLogin} />
    </View>
  );
};
const ButtonContainerbyPlatform = Platform.select({
  ios: ({kakaoLogin, onAppleButtonPress}) => {
    return (
      <ButtonContainerApple
        kakaoLogin={kakaoLogin}
        onAppleButtonPress={onAppleButtonPress}
      />
    );
  },
  android: ({kakaoLogin}) => {
    return <ButtonContainerAndroid kakaoLogin={kakaoLogin} />;
  },
});

const TOKEN_EMPTY = 'token has not fetched';

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};
const deviceWidth = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginToken, setLoginToken] = useState(TOKEN_EMPTY);

  const onAppleButtonPress = async () => {
    console.log('onAppleButtonPress pressed');
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    // get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
      () => {
        console.log('check credentialState');
      },
    );
    console.log('holy shit');

    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // user is authenticated

      axios
        .post('http://13.124.126.30:8000/authorization/oauth/apple/', {
          access_token: appleAuthRequestResponse.authorizationCode,
          id_token: appleAuthRequestResponse.identityToken,
        })
        .then(result => {
          console.log('data:::::::');
          console.log(result.data);
          setLoginToken(result.data.key);
          axios.defaults.headers.common['Authorization'] =
            'Token ' + result.data.key;
        })
        .then(() => navigation.navigate('Main'));

      console.log(appleAuthRequestResponse);
      // navigation.navigate('Main');
      Alert.alert('authed!');
    } else {
      console.log('user not auth');
    }
  };
  // const async_navigate = async () => {
  //   var response = await navigation.navigate('App');
  // };
  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login()
      .then(result => {
        logCallback(`Access Token is ${result.accessToken}`, null);
        return axios.post(
          'http://13.124.126.30:8000/authorization/oauth/kakao/',
          {
            access_token: result.accessToken,
          },
        );
      })
      .then(result => {
        setLoginToken(result.data.key);
        axios.defaults.headers.common['Authorization'] =
          'Token ' + result.data.key;
        console.log('token : ' + result.data.key);
        logCallback(
          `Login Finished, Token is ${JSON.stringify(result.data.key)}`,
          setLoginLoading(false),
        );
      })
      .then(() => navigation.navigate('Main'))
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setLoginLoading(false),
          );
        }
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <CustomTextMedium size={20} color={palette.black}>
            안녕하세요
          </CustomTextMedium>
          <CustomTextMedium size={20} color={palette.black}>
            야미구 이용에 로그인이 필요합니다
          </CustomTextMedium>

          <Spinner
            visible={loginLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainerWrapper}>
            <ButtonContainerbyPlatform
              kakaoLogin={kakaoLogin}
              onAppleButtonPress={onAppleButtonPress}
            />
          </View>
          <View style={styles.policyContainer}>
            <CustomTextRegular size={10}>로그인시 </CustomTextRegular>
            <TouchableOpacity>
              <CustomTextBold decoLine="underline" size={10}>
                이용약관
              </CustomTextBold>
            </TouchableOpacity>
            <CustomTextRegular size={10}> & </CustomTextRegular>
            <TouchableOpacity>
              <CustomTextBold decoLine="underline" size={10}>
                개인정보 취급방침
              </CustomTextBold>
            </TouchableOpacity>
            <CustomTextRegular size={10}>
              에 동의한 것으로 간주합니다
            </CustomTextRegular>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = ({navigation}) => ({
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
      로그인
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: 18,
  },
  viewPager: {
    marginTop: 15,
    height: deviceWidth * 1.16,
    justifyContent: 'flex-start',
  },
  viewPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  dot: {
    backgroundColor: palette.nonselect,
  },
  selectedDot: {
    backgroundColor: palette.orange[0],
  },
  image: {
    resizeMode: 'contain',
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 10,
  },
  buttonContainerWrapper: {
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyContainer: {
    flexDirection: 'row',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
    justifyContent: 'space-between',
  },
});
export default LoginScreen;
