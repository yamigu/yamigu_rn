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

let global_viewPager;
const SignupScreen = ({navigation}) => {
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
        <NicknamePage />
        <BelongPage />
        <IVScreen />
        {/* <BelongPage /> */}
        {/* <ImagePage /> */}
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
        {page < 2 ? (
          <Button onPress={() => move(1)} style={styles.button}>
            <CustomTextRegular size={14} color="white">
              다음
            </CustomTextRegular>
          </Button>
        ) : (
          <View>
            <Button
              style={styles.button}
              onPress={() => {
                gotoWebView();
                go(0);
              }}>
              <CustomTextMedium size={16} color="white">
                본인인증 진행하기
              </CustomTextMedium>
            </Button>
            <CustomTextMedium
              size={12}
              color={palette.gray}
              style={styles.center}>
              거짓된 정보 및 중복 가입을 방지 하기 위한 인증입니다.
            </CustomTextMedium>

            {/* <Button
              onPress={() => {
                navigation.navigate('Main');
                go(0);
              }}
              style={styles.button}>
              <CustomTextRegular size={14} color="white">
                야미구 시작하기
              </CustomTextRegular>
            </Button> */}
          </View>
        )}
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
