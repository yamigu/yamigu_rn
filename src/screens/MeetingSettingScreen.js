import React, {useState, createRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {SafeAreaView} from 'react-navigation';

const MeetingSettingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.bottomView}>
        <View style={styles.indicator}>
          <CustomTextRegular
            style={styles.indicatorText}
            size={12}
            color={palette.gray}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

MeetingSettingScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () =>
    navigation.getParam('page', 0) > 0 ? (
      <HeaderBackButton
        onPress={() => {
          const page = navigation.getParam('page', 0);
          navigation.getParam('move')(page - 1);
          navigation.setParams({
            page: page - 1,
          });
        }}
      />
    ) : null,
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      미팅 설정
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
export default MeetingSettingScreen;
