import React, {useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styled from 'styled-components/native';
import KakaoLoginButton from '~/components/LoginScreen/KakaoLoginButton';
import AppleLoginButton from '~/components/LoginScreen/AppleLoginButton';
import KakaoLogins from '@react-native-seoul/kakao-login';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const TopDiv = Styled.View`
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const BottomDiv = Styled.View`
    height: 16%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;

`;
const YamiguLogo = Styled.Image`
    overflow: visible;
    height: 14%;
    resizeMode: contain;
`;
const YamiguSubLogo = Styled.Image`
    height: 7%;
    marginTop: 4%;
    resizeMode: contain;
`;

const BottomDivAndroid = ({kakaoLogin}) => {
  return (
    <BottomDiv>
      <KakaoLoginButton onPress={kakaoLogin} />
    </BottomDiv>
  );
};
const BottomDivApple = ({kakaoLogin}) => {
  return (
    <BottomDiv>
      <AppleLoginButton />
      <KakaoLoginButton onPress={kakaoLogin} />
    </BottomDiv>
  );
};
const BottomDivbyPlatform = Platform.select({
  ios: ({kakaoLogin}) => {
    return <BottomDivApple kakaoLogin={kakaoLogin} />;
  },
  android: ({kakaoLogin}) => {
    return <BottomDivAndroid kakaoLogin={kakaoLogin} />;
  },
});

const TOKEN_EMPTY = 'token has not fetched';

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};
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
  return (
    <LinearGradient
      colors={['#FFA022', '#FF6C2B']}
      style={styles.linearGradient}>
      <TopDiv>
        <YamiguLogo source={require('~/images/yamigu-logo.png')} />
        <YamiguSubLogo source={require('~/images/yamigu-sub-logo.png')} />
        <Spinner
          visible={loginLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </TopDiv>
      <BottomDivbyPlatform kakaoLogin={kakaoLogin} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
export default LoginScreen;
