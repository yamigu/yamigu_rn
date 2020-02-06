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

  return (
    <SafeAreaView style={styles.root}>
      <ViewPager ref={viewPager} style={styles.viewPager} scrollEnabled={false}>
        <NicknamePage />
        <BelongPage />
        <ImagePage />
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
          <Button
            onPress={() => {
              navigation.navigate('Main');
              go(0);
            }}
            style={styles.button}>
            <CustomTextRegular size={14} color="white">
              야미구 시작하기
            </CustomTextRegular>
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () =>
    navigation.getParam('page', 0) > 0 ? (
      <HeaderBackButton
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
});
export default SignupScreen;
