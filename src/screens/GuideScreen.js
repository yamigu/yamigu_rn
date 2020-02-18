/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
  CustomTextBold,
} from '~/components/common/CustomText';
import {Container} from 'native-base';
import palette from '~/lib/styles/palette';
import LinearGradient from 'react-native-linear-gradient';
import RoundBorderTextView from '~/components/common/RoundBorderTextView';

const NoticeScreen = () => {
  return (
    <Container style={{backgroundColor: palette.default_bg}}>
      <LinearGradient
        colors={['#FFA022', '#FF6C2B']}
        style={{
          height: 180,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('~/images/logo_guide.png')} />
        <Image source={require('~/images/copy_guide.png')} />
        <CustomTextBold color="white" size={14}>
          - 이용 안내 -
        </CustomTextBold>
      </LinearGradient>

      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          먼저 기본 설정을 해보세요!
        </CustomTextBold>
        {/* <RoundBorderTextView size={12} color={palette.black}>
          # 배경사진, 기본정보
        </RoundBorderTextView> */}
        <CustomTextRegular size={16} color={palette.black}>
          배경은 친구들 사진, 내가 잘나온 사진, 내가 올리고 싶은 모든 사진
          상관없어요! 지역과 키도 설정하세요!
        </CustomTextRegular>
      </View>

      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          좋아요를 눌러보세요!
        </CustomTextBold>
        {/* <RoundBorderTextView size={12} color={palette.black}>
          # 무한 좋아요
        </RoundBorderTextView> */}
        <CustomTextRegular size={16} color={palette.black}>
          "음 괜찮은데?"라 생각되면 부담없이 좋아요를 눌러보세요! 걱정마세요
          상대는 누가 좋아요했는지 몰라요!
        </CustomTextRegular>
      </View>
      {/* 
      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          먼저 기본 설정을 해보세요!
        </CustomTextBold>
        <RoundBorderTextView size={12} color={palette.black}>
          # 배경사진, 기본정보
        </RoundBorderTextView>
        <CustomTextRegular size={16} color={palette.black}>
          배경은 친구들 사진, 내가 잘나온 사진, 내가 올리고 싶은 모든 사진
          상관없어요! 지역과 키도 설정하세요!
        </CustomTextRegular>
      </View>

      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          먼저 기본 설정을 해보세요!
        </CustomTextBold>
        <RoundBorderTextView size={12} color={palette.black}>
          # 배경사진, 기본정보
        </RoundBorderTextView>
        <CustomTextRegular size={16} color={palette.black}>
          배경은 친구들 사진, 내가 잘나온 사진, 내가 올리고 싶은 모든 사진
          상관없어요! 지역과 키도 설정하세요!
        </CustomTextRegular>
      </View> */}
    </Container>
  );
};

NoticeScreen.navigationOptions = ({navigation}) => ({
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
    <CustomTextRegular size={16} color={palette.black}>
      이용 방법
    </CustomTextRegular>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  bigView: {
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 20,
    padding: 16,
  },
});
export default NoticeScreen;
