/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import {Container, Header, Content, Accordion} from 'native-base';
import palette from '~/lib/styles/palette';

const dataArray = [
  {title: '친구 등록 방법 수정 안내', content: 'TBD'},
  {
    title: '대화 중 연락처 관련 안내',
    content:
      '매칭이후 대화 중 연락처를 교환하시려는 유저분들 때문에 많은 유저분들이 불편함과 부담감을 느끼고 있기 때문에 해당 부분에 대해서는 가차없이 정지 처리하고, 해당 과정에서 욕설이나 모욕적인 언사가 오갔을 경우에는 고발 조치까지도 고려하고 있으니 사용시 반드시 참고해 주세요. ',
  },
  {title: '미팅 하기 전 안전 관련 안내', content: 'TBD'},
];

const NoticeScreen = () => {
  return (
    <Container style={{backgroundColor: palette.default_bg}}>
      <Accordion
        dataArray={dataArray}
        expandedIcon="remove"
        expandedIconStyle={{color: palette.orange}}
        headerStyle={{
          backgroundColor: 'white',
          marginTop: 10,
          paddingLeft: 20,
          height: 60,
          fontFamily: 'NotoSansCJKkr-Regular',
          fontSize: 16,
          color: '#343434',
        }}
        contentStyle={{
          backgroundColor: 'white',
          paddingLeft: 20,
          marginTop: 3,
          fontFamily: 'NotoSansCJKkr-Regular',
          fontSize: 12,
          color: '#898989',
        }}
      />
    </Container>
  );
};

NoticeScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor="black"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextRegular size={16} color="#333333">
      공지사항
    </CustomTextRegular>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

export default NoticeScreen;
