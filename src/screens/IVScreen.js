import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, SafeAreaView} from 'react-native';
import {Container, Content, Icon, Button} from 'native-base';
import {
  CustomTextRegular,
  CustomTextBold,
  CustomTextMedium,
  CustomTextLight,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {WebView} from 'react-native-webview'; // for webview
import {HeaderBackButton} from 'react-navigation-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// import TouchableByPlatform from '~/components/common/TouchableByPlatform';

const IVScreen = ({navigation}) => {
  const [btnNeeded, setBtnNeeded] = useState(false);
  useEffect(() => {
    if (navigation !== undefined) setBtnNeeded(navigation.getParam('needBtn'));
  }, []);

  const gotoWebView = () => {
    console.log('button clicked');
    navigation.navigate('WebView');
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={
        btnNeeded && {
          flex: 1,
          justifyContent: 'flex-end',
        }
      }>
      <View
        style={{
          flex: 1,
          paddingTop: btnNeeded ? 20 : 0,
          paddingHorizontal: 20,
          height: '100%',
          backgroundColor: palette.default_bg,
          flexDirection: 'column',
        }}>
        <CustomTextMedium size={24} color={palette.black}>
          본인인증 부탁드려요!
        </CustomTextMedium>
        <CustomTextMedium size={16} color={palette.gray}>
          *번거롭더라도 안전한 미팅을 위해 꼭 필요해요
        </CustomTextMedium>
        {/* <CustomTextLight size={12} color={palette.orange}>
          실제 이름, 휴대폰 번호는 절대 다른 회원들에게 공개되지 않습니다.
        </CustomTextLight> */}
      </View>
      {btnNeeded === true ? (
        <View style={{padding: 20}}>
          <Button style={styles.button} onPress={gotoWebView}>
            <CustomTextMedium size={16} color="white">
              본인인증하고 시작하기!
            </CustomTextMedium>
          </Button>
          <CustomTextMedium
            size={12}
            color={palette.gray}
            style={styles.center}>
            거짓된 정보 및 중복 가입을 방지 하기 위한 인증입니다.
          </CustomTextMedium>
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};
IVScreen.navigationOptions = ({navigation}) => ({
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
    <>
      <CustomTextRegular>본인인증</CustomTextRegular>
    </>
  ),
  headerTitleAlign: 'center',
  drawerLockMode: 'locked-closed',
});

const styles = StyleSheet.create({
  dividerLine: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    height: 0.5,
    marginTop: 26,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'space-between',
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 10,
  },
  button: {
    elevation: 0,
    borderRadius: 5,
    backgroundColor: palette.orange[0],
    justifyContent: 'center',
  },
  center: {
    alignSelf: 'center',
  },
});

export default IVScreen;
