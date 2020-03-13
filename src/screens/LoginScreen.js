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
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';
const majorVersionIOS = parseInt(Platform.Version, 10);
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
let tmpValue = [
  'token',
  'uid',
  'nickname',
  'avata',
  'birthdate',
  'belong',
  'department',
  'gender',
  'verified',
  'yami',
  'location',
];
let originValue = [];

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
  useEffect(() => {
    console.log('hererere');
    const userVal = _retrieveData();

    //axios.defaults.headers.common['Authorization'] = '';
    console.log(originValue);
  }, []);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userValue');
      if (value !== null) {
        for (let i = 0; i < 9; i++) {
          originValue[i] = value[i];
        }
        const userVal = JSON.parse(value);
        if (
          userVal[global.config.user_info_const.TOKEN] !== 'token' &&
          userVal[global.config.user_info_const.TOKEN] !== '' &&
          userVal[global.config.user_info_const.TOKEN] !== null
        ) {
          if (
            userVal[global.config.user_info_const.NICKNAME] === 'nickname' ||
            userVal[global.config.user_info_const.NICKNAME] === '' ||
            userVal[global.config.user_info_const.NICKNAME] === null
          ) {
            navigation.navigate('Signup');
          } else if (
            userVal[global.config.user_info_const.BIRTHDATE] === 'birthdate' ||
            userVal[global.config.user_info_const.BIRTHDATE] === '' ||
            userVal[global.config.user_info_const.BIRTHDATE] === null
          ) {
            navigation.navigate('IV', {needBtn: true});
          }
        }
        return userVal;
      }
    } catch (error) {
      // Error retrieving data
      return null;
    }
  };
  const onAppleButtonPress = async () => {
    console.log('onAppleButtonPress pressed');
    // performs login request
    logCallback('Login Start', setLoginLoading(true));

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

    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      // user is authenticated

      axios
        .post(global.config.api_host + 'authorization/oauth/apple/', {
          access_token: appleAuthRequestResponse.authorizationCode,
          id_token: appleAuthRequestResponse.identityToken,
        })
        .then(result => {
          console.log('data:::::::');
          console.log(result.data);
          setLoginToken(result.data.key);
          axios.defaults.headers.common['Authorization'] =
            'Token ' + result.data.key;
          return result.data.key;
        })
        .catch(error => {
          setLoginLoading(false);
        })
        .then(async key => {
          tmpValue[global.config.user_info_const.TOKEN] = key;
          const userInfo = await axios.get(
            global.config.api_host + 'authorization/user/info/',
          );
          setLoginLoading(false);
          return userInfo;
        })
        .then(async result => {
          tmpValue[global.config.user_info_const.AVATA] =
            result.data.avata !== null ? result.data.avata : 'avata';
          tmpValue[global.config.user_info_const.BELONG] =
            result.data.belong !== null ? result.data.belong : 'belong';
          tmpValue[global.config.user_info_const.BIRTHDATE] =
            result.data.birthdate !== null
              ? result.data.birthdate
              : 'birthdate';
          tmpValue[global.config.user_info_const.DEPARTMENT] =
            result.data.department !== null
              ? result.data.department
              : 'department';
          tmpValue[global.config.user_info_const.GENDER] =
            result.data.gender !== null ? result.data.gender : 'gender';
          tmpValue[global.config.user_info_const.LOCATION] =
            result.data.location !== null ? result.data.location : 'location';
          tmpValue[global.config.user_info_const.NICKNAME] =
            result.data.nickname !== null ? result.data.nickname : 'nickname';
          tmpValue[global.config.user_info_const.UID] =
            result.data.uid !== null ? result.data.uid : 'uid';
          tmpValue[global.config.user_info_const.VERIFIED] =
            result.data.verified !== null ? result.data.verified : 'verified';
          AsyncStorage.setItem('userValue', JSON.stringify(tmpValue));
          if (
            tmpValue[global.config.user_info_const.NICKNAME] === 'nickname' ||
            tmpValue[global.config.user_info_const.NICKNAME] === '' ||
            tmpValue[global.config.user_info_const.NICKNAME] === null
          ) {
            navigation.navigate('Signup');
          } else if (
            tmpValue[global.config.user_info_const.GENDER] === 'gender' ||
            tmpValue[global.config.user_info_const.GENDER] === '' ||
            tmpValue[global.config.user_info_const.GENDER] === null
          ) {
            navigation.navigate('IV', {
              needBtn: true,
            });
          } else {
            navigation.navigate('Main');
          }
        });
      // navigation.navigate('Main');
      // Alert.alert('authed!');
    } else {
      setLoginLoading(false);
      console.log('user not auth');
    }
  };
  // const async_navigate = async () => {
  //   var response = await navigation.navigate('App');
  // };
  const kakaoLogin = () => {
    // logCallback('Login Start', setLoginLoading(true));
    KakaoLogins.login()
      .then(async result => {
        logCallback(`Access Token is ${result.accessToken}`, null);
        // return await axios.post(
        //   global.config.api_host + 'authorization/oauth/kakao/',
        //   {
        //     access_token: result.accessToken,
        //   },
        // );
        return await axios({
          url: global.config.api_host + 'authorization/oauth/kakao/',
          method: 'POST',
          data: {
            access_token: result.accessToken,
          },
        });
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
        return result.data.key;
      })
      .then(async key => {
        tmpValue[global.config.user_info_const.TOKEN] = key;
        return await axios.get(
          global.config.api_host + 'authorization/user/info/',
        );
      })
      .then(async result => {
        tmpValue[global.config.user_info_const.AVATA] =
          result.data.avata !== null ? result.data.avata : 'avata';
        tmpValue[global.config.user_info_const.BELONG] =
          result.data.belong !== null ? result.data.belong : 'belong';
        tmpValue[global.config.user_info_const.BIRTHDATE] =
          result.data.birthdate !== null ? result.data.birthdate : 'birthdate';
        tmpValue[global.config.user_info_const.DEPARTMENT] =
          result.data.department !== null
            ? result.data.department
            : 'department';
        tmpValue[global.config.user_info_const.GENDER] =
          result.data.gender !== null ? result.data.gender : 'gender';
        tmpValue[global.config.user_info_const.LOCATION] =
          result.data.location !== null ? result.data.location : 'location';
        tmpValue[global.config.user_info_const.NICKNAME] =
          result.data.nickname !== null ? result.data.nickname : 'nickname';
        tmpValue[global.config.user_info_const.UID] =
          result.data.uid !== null ? result.data.uid : 'uid';
        tmpValue[global.config.user_info_const.VERIFIED] =
          result.data.verified !== null ? result.data.verified : 'verified';
        AsyncStorage.setItem('userValue', JSON.stringify(tmpValue));
        if (
          tmpValue[global.config.user_info_const.NICKNAME] === 'nickname' ||
          tmpValue[global.config.user_info_const.NICKNAME] === '' ||
          tmpValue[global.config.user_info_const.NICKNAME] === null
        ) {
          navigation.navigate('Signup');
        } else if (
          tmpValue[global.config.user_info_const.GENDER] === 'gender' ||
          tmpValue[global.config.user_info_const.GENDER] === '' ||
          tmpValue[global.config.user_info_const.GENDER] === null
        ) {
          navigation.navigate('IV', {
            needBtn: true,
          });
        } else {
          navigation.navigate('Main');
        }
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
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <CustomTextMedium size={24} color={palette.black}>
            안녕하세요
          </CustomTextMedium>
          <CustomTextMedium size={24} color={palette.black}>
            먼저 로그인이 필요해요!
          </CustomTextMedium>

          <Spinner
            visible={loginLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomTextRegular
            size={16}
            color={palette.gray}
            style={{marginBottom: 9}}>
            간편하게 로그인하세요 :)
          </CustomTextRegular>

          <View style={styles.buttonContainerWrapper}>
            <ButtonContainerbyPlatform
              kakaoLogin={kakaoLogin}
              onAppleButtonPress={onAppleButtonPress}
            />
          </View>
          <View style={styles.policyContainer}>
            <CustomTextRegular size={10}>로그인시 </CustomTextRegular>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <CustomTextBold decoLine="underline" size={10}>
                이용약관
              </CustomTextBold>
            </TouchableOpacity>
            <CustomTextRegular size={10}> & </CustomTextRegular>
            <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
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
        navigation.navigate('Main');
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
  drawerLockMode: 'locked-closed',
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
