import React, {useState, createRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
if (pf === 'ios') keyboardPadding = 100;
else keyboardPadding = -400;

const SignupScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [belong, setBelong] = useState('');
  const [department, setDepartment] = useState('');
  const [is_student, setIs_student] = useState('');
  const [locationText, setLocationText] = useState('');
  const [nicknameAvailable, setNicknameAvailable] = useState(false);
  const [page, setPage] = useState(0);
  const viewPager = createRef();

  const getUserInfo = async () => {
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    console.log(userValue);
    axios.defaults.headers.common['Authorization'] = 'Token ' + jUserValue[0];
  };
  useEffect(() => {
    global_viewPager = viewPager;
    getUserInfo();
  }, []);
  global_viewPager = viewPager;
  const go = next_page => {
    viewPager.current.setPage(next_page);
    setPage(next_page);
    global_viewPager = viewPager;
    navigation.setParams({
      page: next_page,
      move: page => setPage(page),
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
          scrollEnabled={false}>
          <NicknamePage
            setNickname={setNickname}
            nicknameAvailable={nicknameAvailable}
            setNicknameAvailable={setNicknameAvailable}
          />
          <LocationPage
            setLocationText={setLocationText}
            locationText={locationText}
          />
          <BelongPage
            setBelong={setBelong}
            setDepartment={setDepartment}
            setIs_student={setIs_student}
          />
          {/* <IVScreen /> */}
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
          onPress={async () => {
            if (!checkActivation()) return;
            console.log(page);

            if (page === 2) {
              //server로 nickname, belong, department, is_student 보내기
              // console.log(nickname);
              // console.log(department);
              // console.log(belong);
              // console.log(is_student);
              // console.log(isStudentString);
              console.log(locationText);
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
                  // navigation.navigate('IV');
                  move(1);
                });
            } else {
              move(1);
            }

            console.log(axios.defaults.headers.common['Authorization']);
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
        {page === 3 ? (
          <CustomTextRegular
            size={10}
            color={palette.black}
            style={{alignSelf: 'center'}}>
            본인임을 확인하고 정확한 나이와 성별을 알 수 있어요!
          </CustomTextRegular>
        ) : null}
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
