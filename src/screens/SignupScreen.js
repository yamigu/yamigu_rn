import React, {useState, createRef, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import NicknamePage from '~/components/SignupScreen/NicknamePage';
import LocationPage from '~/components/SignupScreen/LocationPage';
import BelongPage from '~/components/SignupScreen/BelongPage';
import ImagePage from '~/components/SignupScreen/ImagePage';
import ViewPager from '@react-native-community/viewpager';
import {Button} from 'native-base';
import {SafeAreaView} from 'react-navigation';
import PersonalInfoPage from '~/components/SignupScreen/PersonalInfoPage';
import IVScreen from './IVScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
let global_viewPager;
let keyboardPadding = 0;
const pf = Platform.OS;

const isIphoneX = () => {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

const isIPhoneXSize = dim => {
  return dim.height == 812 || dim.width == 812;
};

const isIPhoneXrSize = dim => {
  return dim.height == 896 || dim.width == 896;
};

if (pf === 'ios') {
  keyboardPadding = 50;
  if (isIphoneX()) {
    keyboardPadding = 100;
  } else {
    keyboardPadding = 50;
  }
} else keyboardPadding = -400;

const SignupScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [belong, setBelong] = useState('');
  const [department, setDepartment] = useState('');
  const [is_student, setIs_student] = useState('');
  const [locationText, setLocationText] = useState('');
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [page, setPage] = useState(0);
  const viewPager = useRef();
  global_viewPager = viewPager;

  const getUserInfo = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    console.log(userValue);
    axios.defaults.headers.common['Authorization'] = 'Token ' + jUserValue[0];
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  global_viewPager = viewPager;
  const go = next_page => {
    viewPager.current.setPage(next_page);
    global_viewPager = viewPager;
    navigation.setParams({
      page: next_page,
    });
  };
  const move = delta => {
    Keyboard.dismiss();
    go(page + delta);
  };

  const gotoWebView = () => {
    console.log('button clicked');
    navigation.navigate('WebView');
  };
  const checkActivation = () => {
    return (
      (page === 0 && nicknameAvailable) ||
      (page === 1 && locationText !== '') ||
      (page === 2 && belong !== '') ||
      page === 3
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.container}>
        <ViewPager
          ref={viewPager}
          style={styles.viewPager}
          scrollEnabled={false}
          orientation="horizontal"
          initialPage={0}
          onPageSelected={e => {
            setPage(e.nativeEvent.position);
            navigation.setParams({
              page: e.nativeEvent.position,
              move: page => {
                go(page);
              },
            });
          }}>
          <NicknamePage
            key={1}
            setNickname={setNickname}
            nicknameAvailable={nicknameAvailable}
            setNicknameAvailable={setNicknameAvailable}
          />
          <LocationPage
            key={2}
            setLocationText={setLocationText}
            locationText={locationText}
          />
          <BelongPage
            key={3}
            setBelong={setBelong}
            setDepartment={setDepartment}
            setIs_student={setIs_student}
          />
          <IVScreen key={4} />
        </ViewPager>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView
        style={styles.bottomView}
        behavior="position"
        keyboardVerticalOffset={keyboardPadding}>
        <View style={styles.indicator}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={12}
            color={palette.gray}>
            ({page + 1}/4)
          </CustomTextRegular>
          <View style={styles.indicatorBarBG}>
            <View
              style={[styles.indicatorBar, {width: (page + 1) * 25 + '%'}]}
            />
          </View>
        </View>
        <Button
          onPress={() => {
            if (!checkActivation()) return;
            console.log(page);

            if (page === 2) {
              let isStudentString = is_student.toString();
              axios
                .post('http://13.124.126.30:8000/authorization/user/signup/', {
                  nickname: nickname,
                  is_student: isStudentString,
                  department: department,
                  belong: belong,
                  location: locationText,
                })
                .then(() => {
                  console.log('done');

                  viewPager.current.setPage(3);
                  navigation.setParams({
                    page: 3,
                    move: page => {
                      go(page);
                    },
                  });
                  return;
                });
            } else if (page === 3) {
              gotoWebView();
              go(0);
              setPage(0);
            }
            move(1);
          }}
          style={checkActivation() ? styles.buttonActive : styles.button}>
          {page !== 3 ? (
            <CustomTextRegular size={14} color="white">
              다음
            </CustomTextRegular>
          ) : (
            <CustomTextMedium size={16} color="white">
              본인인증하고 시작하기!
            </CustomTextMedium>
          )}
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () =>
    navigation.getParam('page', 0) > 0 ? (
      <HeaderBackButton
        label=" "
        tintColor={palette.black}
        onPress={() => {
          const page = navigation.getParam('page', 0);
          console.log(page);
          global_viewPager.current.setPage(page - 1);
          navigation.getParam('move')(page - 1);
          navigation.setParams({
            page: page - 1,
          });
        }}
      />
    ) : null,
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      회원가입
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: palette.default_bg,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
  bottomView: {
    padding: 20,
    paddingTop: 0,
    flexDirection: 'column',
  },
  indicator: {
    marginBottom: 14,
  },
  indicatorText: {
    marginBottom: 7,
    alignSelf: 'flex-end',
  },
  indicatorBarBG: {
    height: 3,
    borderRadius: 1.5,
    backgroundColor: palette.divider,
  },
  indicatorBar: {
    backgroundColor: palette.black,
    height: '100%',
    borderRadius: 1.5,
  },
  button: {
    backgroundColor: palette.nonselect,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  buttonActive: {
    backgroundColor: palette.orange[0],
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  buttonLast: {
    elevation: 0,
    borderRadius: 5,
    backgroundColor: '#60BAFF',
    justifyContent: 'center',
  },
});
export default SignupScreen;
