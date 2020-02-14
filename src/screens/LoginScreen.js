import React, {useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Image,
  Dimensions,
  ImageBackground,
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
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from 'react-native-best-viewpager';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ButtonContainerAndroid = ({kakaoLogin}) => {
  return (
    <View style={styles.buttonContainer}>
      <KakaoLoginButton onPress={kakaoLogin} />
    </View>
  );
};
const ButtonContainerApple = ({kakaoLogin}) => {
  return (
    <View style={styles.buttonContainer}>
      <AppleLoginButton />
      <KakaoLoginButton onPress={kakaoLogin} />
    </View>
  );
};
const ButtonContainerbyPlatform = Platform.select({
  ios: ({kakaoLogin}) => {
    return <ButtonContainerApple kakaoLogin={kakaoLogin} />;
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
  const [token, setToken] = useState(TOKEN_EMPTY);

  const kakaoLogin = () => {
    logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login()
      .then(result => {
        logCallback(`Access Token is ${result.accessToken}`, null);
        return axios.post(
          'http://192.168.0.4:8000/authorization/oauth/kakao/',
          {
            access_token: result.accessToken,
          },
        );
      })
      .then(result => {
        setToken(result.data.key);
        logCallback(
          `Login Finished, Token is ${JSON.stringify(result.data.key)}`,
          setLoginLoading(false),
        );
        navigation.navigate('App');
      })
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
  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <IndicatorViewPager
          style={styles.viewPager}
          indicator={_renderDotIndicator()}>
          <Image
            style={styles.viewPage}
            key="1"
            source={require('~/images/onboarding-screen-1.png')}
          />
          <Image
            style={styles.viewPage}
            key="2"
            source={require('~/images/onboarding-screen-2.png')}
          />
          <Image
            style={styles.viewPage}
            key="3"
            source={require('~/images/onboarding-screen-3.png')}
          />
        </IndicatorViewPager>
        <Spinner
          visible={loginLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainerWrapper}>
          <ButtonContainerbyPlatform kakaoLogin={kakaoLogin} />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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
});
export default LoginScreen;
