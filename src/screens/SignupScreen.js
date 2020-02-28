import React, {useState, createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import NicknamePage from '~/components/SignupScreen/NicknamePage';
import BelongPage from '~/components/SignupScreen/BelongPage';
import ImagePage from '~/components/SignupScreen/ImagePage';
import ViewPager from '@react-native-community/viewpager';
import {Button} from 'native-base';
import {SafeAreaView} from 'react-navigation';
import PersonalInfoPage from '~/components/SignupScreen/PersonalInfoPage';
import IVScreen from './IVScreen';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let global_viewPager;
const SignupScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [belong, setBelong] = useState('');
  const [department, setDepartment] = useState('');
  const [is_student, setIs_student] = useState('');

  const [page, setPage] = useState(0);
  const viewPager = createRef();
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
    go(page + delta);
  };

  const gotoWebView = () => {
    console.log('button clicked');
    navigation.navigate('WebView');
  };

  return (
    <SafeAreaView style={styles.root}>
      <ViewPager ref={viewPager} style={styles.viewPager} scrollEnabled={false}>
        <NicknamePage setNickname={setNickname} />
        <BelongPage
          setBelong={setBelong}
          setDepartment={setDepartment}
          setIs_student={setIs_student}
        />
        <IVScreen />
      </ViewPager>

      <View style={styles.bottomView}>
        <View style={styles.indicator}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={12}
            color={palette.gray}>
            ({page + 1}/3)
          </CustomTextRegular>
          <View style={styles.indicatorBarBG}>
            <View
              style={[styles.indicatorBar, {width: (page + 1) * 33.3 + '%'}]}
            />
          </View>
        </View>

        <Button
          onPress={async () => {
            const userValue = await AsyncStorage.getItem('userValue');
            const jUserValue = JSON.parse(userValue);
            Axios.defaults.headers.common['Authorization'] =
              'Token ' + jUserValue[0];
            if (page === 1) {
              //server로 nickname, belong, department, is_student 보내기
              // console.log(nickname);
              // console.log(department);
              // console.log(belong);
              // console.log(is_student);
              // console.log(isStudentString);
              let isStudentString = is_student.toString();

              Axios.post(
                'http://13.124.126.30:8000/authorization/user/signup/',
                {
                  nickname: nickname,
                  is_student: isStudentString,
                  department: department,
                  belong: belong,
                },
              ).then(() => console.log('done'));
            } else if (page === 2) {
              gotoWebView();
              go(0);
              setPage(0);
            }
            move(1);
            console.log(Axios.defaults.headers.common['Authorization']);
          }}
          style={styles.button}>
          {page !== 2 ? (
            <CustomTextRegular size={14} color="white">
              다음
            </CustomTextRegular>
          ) : (
            <CustomTextMedium size={16} color="white">
              본인인증 하고 야미구 시작하기!
            </CustomTextMedium>
          )}
        </Button>
      </View>
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
    ) : (
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
    flex: 1,
    backgroundColor: palette.default_bg,
    justifyContent: 'space-between',
  },
  viewPager: {
    flex: 1,
  },
  bottomView: {
    padding: 20,
    paddingTop: 0,
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
  buttonLast: {
    elevation: 0,
    borderRadius: 5,
    backgroundColor: '#60BAFF',
    justifyContent: 'center',
  },
});
export default SignupScreen;
