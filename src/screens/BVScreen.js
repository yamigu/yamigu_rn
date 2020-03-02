/* eslint-disable no-new */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PixelRatio,
  Image,
  Alert,
} from 'react-native';
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
import Spinner from 'react-native-loading-spinner-overlay';
import file_upload from '~/lib/utils/file_upload';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const dw = Dimensions.get('window').width;
const BVScreen = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);

  useEffect(() => {
    axios
      .get('http://13.124.126.30:8000/authorization/user/belong_verification/')
      .then(result => {
        // console.log(result.data);
        return result.data;
      })
      .then(data => {
        if (data.belong === null) {
          console.log('nothing');
        } else {
          if (data.is_student === true) {
            setToggle(1);
          } else {
            setToggle(2);
          }
          setText1(data.belong);
          data.department === null ? null : setText2(data.department);
          // console.log(data.image.src);
          if (data.image !== null) {
            let source = {
              uri: data.image.src,
              name: data.image.src,
            };
            setImageSource(source);
          } else {
            setImageSource(null);
          }
        }
      });
    // console.log('useEffect');
  }, []);

  const doVerify = source => {
    return new Promise((resolve, reject) => {
      // setUploading(true);
      // console.log('doverererer');
      const formData = new FormData();
      const image = source;
      // console.log(source);
      const belong = text1;
      const department = text2;
      const studentToggle = toggle;

      if (studentToggle == 1) {
        formData.append('is_student', true);
      } else if (studentToggle == 2) {
        formData.append('is_student', false);
      }
      formData.append('belong', belong);
      formData.append('department', department);
      if (image === null || image === undefined) {
        // console.log(image);
        setUploading(false);
        return;
      }
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.uri,
      });
      resolve(
        file_upload(
          formData,
          'http://13.124.126.30:8000/authorization/user/belong_verification/',
        )
          .then(result => {
            console.log('here result aa');
            // setUploading(false);
            return true;
          })
          .catch(error => {
            // setUploading(false);
            return false;
          }),
      );
    });
  };

  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
    };

    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          name: response.uri,
          type: response.type,
        };
        // console.log('image uri' + response.uri);
        setImageSource(source);
        navigation.setParams({
          doVerify: source => doVerify(source),
          toggle: toggle,
          text1: text1,
          text2: text2,
          imageSource: source,
        });
      }
    });
  };

  const clickButton = pos => {
    let value = 0;
    if (pos === toggle) {
      value = 0;
    } else {
      value = pos;
    }
    setToggle(value);
    navigation.setParams({
      doVerify: source => doVerify(source),
      toggle: value,
      text1: text1,
      text2: text2,
      imageSource: imageSource,
    });
  };

  return (
    <Content style={styles.root}>
      <Spinner
        visible={uploading}
        textContent={'Uploading...'}
        textStyle={styles.spinnerTextStyle}
      />
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
              onChangeText={value => {
                // console.log(value);
                setText1(value);
                navigation.setParams({
                  doVerify: source => doVerify(source),
                  toggle: toggle,
                  text1: value,
                  text2: text2,
                  imageSource: imageSource,
                });
              }}
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
              onChangeText={value => {
                setText2(value);
                navigation.setParams({
                  doVerify: source => doVerify(source),
                  toggle: toggle,
                  text1: text1,
                  text2: value,
                  imageSource: imageSource,
                });
              }}
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
        color={palette.gray}
        style={{marginTop: 24, marginBottom: 10}}>
        소속인증
      </CustomTextRegular>
      <Button
        onPress={selectPhotoTapped}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: palette.nonselect,
          backgroundColor: palette.default_bg,
          borderRadius: 5,
          width: dw * 0.9,
          height: dw * 0.41,
          elevation: 0,
        }}>
        {imageSource === null ? (
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
          <Image style={styles.ImageContainer} source={imageSource} />
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
    <TouchableByPlatform
      disabled={
        navigation.getParam('text1') === '' ||
        navigation.getParam('text2') === '' ||
        navigation.getParam('toggle') === 0 ||
        navigation.getParam('imageSource') === null
      }
      transparent
      style={{
        backgroundColor: 'white',
        marginRight: 10,
        height: 40,
        elevation: 0,
      }}
      onPress={() => {
        let imgsrc = navigation.getParam('imageSource');
        let tmpDoVerify = navigation.getParam('doVerify');
        console.log(tmpDoVerify);
        console.log(imgsrc);

        tmpDoVerify(imgsrc).then(result => {
          if (result) {
            Alert.alert(
              '인증신청되었습니다. 10분 소요 예정입니다!',
              '',
              [
                {
                  text: '확인',
                  onPress: () => {
                    navigation.navigate('Main');
                    console.log('YES LOGOUT');
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Failed');
          }
        });
      }}>
      <CustomTextRegular
        size={15}
        color={
          navigation.getParam('text1') === '' ||
          navigation.getParam('text2') === '' ||
          navigation.getParam('toggle') === 0 ||
          navigation.getParam('imageSource') === null
            ? palette.nonselect
            : palette.orange
        }>
        인증
      </CustomTextRegular>
    </TouchableByPlatform>
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
    color: palette.black,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
export default BVScreen;
