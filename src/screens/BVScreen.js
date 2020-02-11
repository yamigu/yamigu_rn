/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, PixelRatio, Image} from 'react-native';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {Button, Form, Item, Label, Input, Content} from 'native-base';
import MaterialCommunityicon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {HeaderBackButton} from 'react-navigation-stack';

const dw = Dimensions.get('window').width;
const BVScreen = ({params}) => {
  const [ImageSource, setImageSource] = useState(null);

  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImageSource(source);
      }
    });
  };

  const [toggle, setToggle] = useState(0);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const clickButton = pos => {
    if (pos === toggle) {
      setToggle(0);
    } else {
      setToggle(pos);
      console.log(dw);
    }
  };
  return (
    <Content style={styles.root}>
      <CustomTextMedium size={20} color={palette.black}>
        소속을 인증 해 주세요
      </CustomTextMedium>
      <CustomTextRegular size={16} color={palette.gray}>
        *소속이 있는 회원만 가입이 가능합니다.
      </CustomTextRegular>
      <View style={styles.buttonView}>
        <Button
          style={[
            toggle === 1 ? styles.buttonActive : styles.button,
            styles.buttonLeft,
          ]}
          onPress={() => clickButton(1)}>
          <CustomTextRegular
            size={14}
            color={toggle === 1 ? palette.orange[0] : palette.nonselect}>
            대학(원)생
          </CustomTextRegular>
        </Button>
        <Button
          style={[
            toggle === 2 ? styles.buttonActive : styles.button,
            styles.buttonRight,
          ]}
          onPress={() => clickButton(2)}>
          <CustomTextRegular
            size={14}
            color={toggle === 2 ? palette.orange[0] : palette.nonselect}>
            직장인
          </CustomTextRegular>
        </Button>
      </View>
      {toggle !== 0 ? (
        <Form style={styles.form}>
          <Item stackedLabel style={styles.formItem}>
            <Label style={styles.label}>
              {toggle === 1 ? '학교 입력' : '직장 입력'}
            </Label>
            <Input
              style={styles.input}
              placeholder={
                focus1
                  ? ''
                  : toggle === 1
                  ? 'ex) 연세대, 고려대, 서울대, 이화여대, OO대'
                  : 'ex) 삼성전자, 스타트업, 프리랜서'
              }
              onChangeText={value => setText1({value})}
              value={text1}
              selectionColor={palette.orange[0]}
              placeholderTextColor={palette.nonselect}
              caretHidden={true}
              onFocus={setFocus1}
            />
          </Item>
          <Item stackedLabel style={styles.formItem}>
            <Label style={styles.label}>
              {toggle === 1 ? '전공 입력 (선택)' : '직업 입력 (선택)'}
            </Label>
            <Input
              style={styles.input}
              placeholder={
                focus2
                  ? ''
                  : toggle === 1
                  ? 'ex) 전기전자공학부, 경영학과, 의학과'
                  : 'ex) 디자이너, 의사, 개발자, 선생님'
              }
              onChangeText={value => setText2({value})}
              value={text2}
              selectionColor={palette.orange[0]}
              placeholderTextColor={palette.nonselect}
              caretHidden={true}
              onFocus={setFocus2}
            />
          </Item>
        </Form>
      ) : null}
      <CustomTextRegular
        color="#707070"
        style={{marginTop: 24, marginBottom: 10}}>
        소속인증
      </CustomTextRegular>
      <Button
        onPress={selectPhotoTapped}
        style={{
          flex: 1,
          borderColor: palette.nonselect,
          backgroundColor: palette.default_bg,
          borderRadius: 5,
          width: dw * 0.9,
          height: dw * 0.41,
        }}>
        {ImageSource === null ? (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: palette.nonselect,
              backgroundColor: palette.default_bg,
              borderRadius: 5,
              width: dw * 0.9,
              height: dw * 0.41,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityicon
              name="paperclip"
              size={32}
              style={styles.icon}
            />
            <CustomTextRegular size={14} color={palette.nonselect}>
              인증하기
            </CustomTextRegular>
            <CustomTextRegular size={11} color={palette.nonselect}>
              * 사원증, 명함, 사업자등록증 등을 첨부해주세요
            </CustomTextRegular>
          </View>
        ) : (
          <Image style={styles.ImageContainer} source={ImageSource} />
        )}
      </Button>
      <View style={{marginLeft: dw * 0.04}}>
        <CustomTextRegular
          color={palette.black}
          size={12}
          style={{marginTop: 9}}>
          * 본인 인증과 입력한 정보가 동일한지 확인합니다.
        </CustomTextRegular>
        <CustomTextRegular color={palette.black} size={12}>
          * 인증은 최대 2일까지 소요됩니다.
        </CustomTextRegular>
        <CustomTextRegular color={palette.black} size={12}>
          * 개인정보는 인증시에만 사용됩니다.
        </CustomTextRegular>
        <CustomTextRegular color={palette.black} size={12}>
          * 사원증 위조는 사문서부정행사죄가 성립됩니다.
        </CustomTextRegular>
      </View>
    </Content>
  );
};

BVScreen.navigationOptions = ({navigation}) => ({
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
      소속 인증하기
    </CustomTextRegular>
  ),
  headerRight: () => (
    <Button style={{backgroundColor: 'white', marginRight: 10, height: 40}}>
      <CustomTextRegular size={15} color={palette.orange}>
        인증
      </CustomTextRegular>
    </Button>
  ),
  headerMode: 'screen',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  attachBox: {
    width: dw * 0.9,
    borderRadius: 5,
    backgroundColor: palette.default_bg,
  },
  buttonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.default_bg,
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  icon: {
    marginBottom: 8,
    height: 32,
    width: 32,
    color: palette.nonselect,
  },
  buttonActive: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.default_bg,
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.orange[0],
  },
  buttonLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0.5,
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0.5,
  },
  ImageContainer: {
    borderWidth: 1,
    borderColor: palette.nonselect,
    backgroundColor: palette.default_bg,
    borderRadius: 5,
    width: dw * 0.9,
    height: dw * 0.41,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 0,
  },
  formItem: {
    marginLeft: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    textAlignVertical: 'bottom',
    lineHeight: 14,
    fontFamily: 'NotoSansCJKkr-Medium',
    paddingBottom: 0,
    color: palette.gray,
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'bottom',
    lineHeight: 14,
    fontFamily: 'NotoSansCJKkr-Regular',
    paddingBottom: 0,
    marginBottom: -10,
    color: palette.black,
  },
});
export default BVScreen;
