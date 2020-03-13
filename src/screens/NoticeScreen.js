/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Button, Platform} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import {Container, Header, Content, Accordion} from 'native-base';
import palette from '~/lib/styles/palette';
const os = Platform.OS;
const dataArray = [
  {
    title: '친구 등록 안내',
    content:
      '야미구에는 특별한 기능이 있어요. 친구들과 함께하는 미팅이다 보니 내 친구 등록이 있습니다. 등록 페이지에서 친구 번호를 등록하고 수락하면 끝! 만약 새로운 친구가 가입을 완료하면 보너스 야미 (8,000원!?)도 드리고 있어요. 야미구에서 친구가 제일 많은 유저가 되어 보세요! 단, 친구 정보는 자세히 볼 수 없으니 걱정마세요!',
  },
  {
    title: '대화 중 매너 관련 안내',
    content:
      '주선 이후 일방적인 카카오톡 ID 또는 연락처 교환은 불쾌함을 초래할 수 있어요. 미팅을 위해 친구들과의 단톡방 등이런 경우는 유저분들의 판단하에 교환해주세요. 야미구내 채팅 기능은 최소한의 미팅 진행을 도와주고 있습니다. 만약 불쾌한 채팅이 오고갔을 경우는 채팅내 신고 기능으로 꼭 알려주세요! ',
  },
  {
    title: '코로나 조심조심',
    content:
      '안녕하세요, 야미구팀입니다. 야미구에서 미팅할 때 코로나 예방에 항상 신경써주세요. 사실 코로나가 잠잠해진 이후에 미팅하는게 제일 좋은 방법입니다!',
  },
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
          fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',

          fontSize: 16,
          color: '#343434',
        }}
        contentStyle={{
          backgroundColor: 'white',
          paddingLeft: 20,
          marginTop: 3,
          fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',

          fontSize: 12,
          color: palette.black,
        }}
      />
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
      공지사항
    </CustomTextRegular>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
  drawerLockMode: 'locked-closed',
});

export default NoticeScreen;
