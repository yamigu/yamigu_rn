/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextRegular,
  CustomTextMedium,
  CustomTextBold,
} from '~/components/common/CustomText';
import {Container, Button} from 'native-base';
import palette from '~/lib/styles/palette';
import LinearGradient from 'react-native-linear-gradient';
import RoundBorderTextView from '~/components/common/RoundBorderTextView';
import {ScrollView} from 'react-native-gesture-handler';

const dw = Dimensions.get('window').width;

const NoticeScreen = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: palette.default_bg,
      }}>
      <LinearGradient
        colors={['#FFA022', '#FF6C2B']}
        style={{
          height: 180,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={{height: '80%', width: '40%'}}
          source={require('~/images/logo_guide.png')}
        />

        {/* <Image source={require('~/images/copy_guide.png')} />
        <CustomTextBold color="white" size={14}>
          - 이용 안내 -
        </CustomTextBold> */}
      </LinearGradient>

      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          미팅 주선을 신청하세요!
        </CustomTextBold>
        <Button style={styles.oBtn}>
          <CustomTextMedium
            style={{backgroundColor: 'white'}}
            color="#FF8826"
            size={12}>
            # 미팅, 과팅, 직장인 미팅
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          1:1 만남이 아닌 친구들과 함께 새로운 이성친구들을 만나보세요.
        </CustomTextRegular>
        <Button style={styles.oBtn}>
          <CustomTextMedium color="#FF8826" size={12}>
            # 매주 무료 미팅
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          웰컴 선물로 무료로 미팅 상대를 주선받을 수 있어요. 깜짝 무료 미팅
          주선도 기대하세요!
        </CustomTextRegular>
        <Button style={styles.oBtn}>
          <CustomTextMedium color="#FF8826" size={12}>
            # 미팅, 과팅, 직장인 미팅
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          원하는 인원, 날짜, 나이대를 설정하세요! 같은 설정을 한 이성과 미팅을
          주선해 드려요!
        </CustomTextRegular>
      </View>

      <View style={styles.bigView}>
        <CustomTextBold
          size={20}
          color={palette.black}
          style={{marginBottom: 10}}>
          피드에서 이성친구를 찾아보세요!
        </CustomTextBold>
        <Button style={styles.oBtn}>
          <CustomTextMedium color="#FF8826" size={12}>
            # 무한 좋아요
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          친해지고 싶은 이성이 있으면 좋아요를 눌러보세요. 걱정마세요! 누가
          좋아요 했는지는 상대에게 알려주지 않아요.
        </CustomTextRegular>
        <Button style={styles.oBtn}>
          <CustomTextMedium color="#FF8826" size={12}>
            # 대화 신청
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          친해지고 싶은 이성이 있나요? 대화 신청을 바로 보내보세요! 이성이
          수락하면 바로 대화 시작!
        </CustomTextRegular>
        <Button style={styles.oBtn}>
          <CustomTextMedium color="#FF8826" size={12}>
            # 좋아요 매칭 & 바로 대화하기
          </CustomTextMedium>
        </Button>
        <CustomTextRegular style={{margin: 5}} size={16} color={palette.black}>
          만약 서로 좋아요를 누르면 그때는 서로 알려드려요! 대화를 걸어서 새로운
          친구를 사겨보세요.
        </CustomTextRegular>
      </View>
      <View style={{width: 1, height: 40}} />
    </ScrollView>
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
    width: dw * 0.93,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 16,
  },
  oBtn: {
    alignSelf: 'flex-start',
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 15,
    marginTop: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF8826',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default NoticeScreen;
