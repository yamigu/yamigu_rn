/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, createRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import {CustomTextBold, CustomTextRegular} from './CustomText';
import file_upload from '~/lib/utils/file_upload';
import file_upload_for_pf from '~/lib/utils/file_upload_for_pf';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import '~/config';

const deviceWidth = Dimensions.get('window').width;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
const temp_init_data = [
  {
    src: null,
    number: 1,
  },
  {
    src: null,
    number: 2,
  },
  {
    src: null,
    number: 3,
  },
  {
    src: null,
    number: 4,
  },
  {
    src: null,
    number: 5,
  },
];
const ProfileImageAddView = ({
  scroll,
  offsetY,
  feed_list,
  setFeed_list,
  imageNo,
  setImageNo,
}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pfImageList, setPfImageList] = useState(temp_init_data);
  const [pfImageTempList, setPfImageTempList] = useState(temp_init_data);
  const [uploading, setUploading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [btnMeasure, setBtnMeasure] = useState(null);
  const [btnMeasureRight, setBtnMeasureRight] = useState(null);

  const _imageLeft = createRef();
  const _imageRight = createRef();
  const _measure = (obj, number) => {
    obj.current.measure((x, y, width, height, pagex, pagey) => {
      const location = {
        fx: x,
        fy: y,
        px: pagex,
        py: pagey,
        width: width,
        height: height,
        number: number,
      };
      if (number === 3) {
        location.px = location.px + 10 + ((deviceWidth - 76) / 2) * 0.468;
      } else if (number === 4) {
        location.py = location.py + 10 + ((deviceWidth - 76) / 2) * 0.468;
      } else if (number === 5) {
        location.px = location.px + 10 + ((deviceWidth - 76) / 2) * 0.468;
        location.py = location.py + 10 + ((deviceWidth - 76) / 2) * 0.468;
      }
      location.py = location.py + offsetY;
      obj === _imageLeft
        ? setBtnMeasure(location)
        : setBtnMeasureRight(location);
    });
    scroll.current.scrollTo(0, 0, true);
  };
  const _retrieveData = async () => {
    try {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      if (userValue !== null) {
        // console.log('qweqwe');
        // console.log(jUserValue);
        setUserInfo(jUserValue);
        // console.log(jUserValue[3]);
      } else {
      }
    } catch (error) {}
  };
  const measureView = event => {
    console.log(`*** event: ${JSON.stringify(event.nativeEvent)}`);
    // you'll get something like this here:
    // {"target":1105,"layout":{"y":0,"width":256,"x":32,"height":54.5}}
  };

  useEffect(() => {
    _retrieveData();
    axios({
      url: global.config.api_host + 'authorization/user/profile_image/',
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(result => {
      const tmp = temp_init_data.slice();
      let count = 0;
      result.data.map((item, index) => {
        tmp[item.number - 1] = item;
        if (item.src !== null) count++;
      });
      console.log(count);
      setImageNo(count);
      setPfImageList(tmp);
    });
  }, []);

  const selectPhotoTapped = number => {
    if (number === 1) setBtnMeasure(_measure(_imageLeft, number));
    else setBtnMeasureRight(_measure(_imageRight, number));
    const options = {
      title: null,
      cancelButtonTitle: '취소',
      takePhotoButtonTitle: '카메라',
      chooseFromLibraryButtonTitle: '사진 앨범',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.showImagePicker(options, response => {
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
          number: number,
        };
        let temp = pfImageTempList.slice();
        temp[number - 1].src = source.uri;
        setImageSource(source);
        setPfImageTempList(temp);
        setModalVisible(true);
      }
    });
  };

  return (
    <View>
      {console.log(imageNo)}
      <Spinner
        visible={uploading}
        textContent={'Uploading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        {btnMeasure !== null &&
        btnMeasure !== undefined &&
        pfImageTempList[0].src !== null ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: (deviceWidth - 76) / 2,
              height: (deviceWidth - 76) / 2,
              left: btnMeasure.px,
              top: btnMeasure.py,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Image style={styles.fill} source={{uri: pfImageTempList[0].src}} />
            <Image
              style={styles.mainButtonCameraIcon}
              source={require('~/images/profile_camera.png')}
            />
          </View>
        ) : null}
        {btnMeasureRight !== null &&
        btnMeasureRight !== undefined &&
        pfImageTempList[btnMeasureRight.number - 1].src !== null ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: ((deviceWidth - 76) / 2) * 0.468,
              height: ((deviceWidth - 76) / 2) * 0.468,
              left: btnMeasureRight.px,
              top: btnMeasureRight.py,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Image
              style={styles.fill}
              source={{uri: pfImageTempList[btnMeasureRight.number - 1].src}}
            />
          </View>
        ) : null}
        <SafeAreaView
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.modalButtonMultiple}
              onPress={() => {
                // setUploading(true);
                const formData = new FormData();
                formData.append('image', {
                  uri: imageSource.uri,
                  type: imageSource.type,
                  name: imageSource.uri,
                });
                formData.append('number', imageSource.number);

                console.log('formdata::::');
                console.log(formData);

                file_upload_for_pf(
                  formData,
                  global.config.api_host + 'authorization/user/profile_image/',
                )
                  .then(result => {
                    console.log('data::::');
                    // console.log(result);
                    let temp = pfImageList.slice();
                    temp[result.number - 1] = result;
                    // console.log(imageSource.number);
                    if (imageSource.number === 1) {
                      let newUserInfo = userInfo.slice();
                      newUserInfo[global.config.user_info_const.AVATA] =
                        result.src;
                      console.log('new profile image: ');
                      // console.log(result);
                      AsyncStorage.setItem(
                        'userValue',
                        JSON.stringify(newUserInfo),
                      );
                    }
                    // console.log(temp);
                    setPfImageList(temp);
                    // console.log(temp_init_data);
                    setPfImageTempList(temp_init_data);
                    setModalVisible(false);
                    return result;
                  })
                  .then(newPf => {
                    // console.log('hihi');
                    // console.log(newPf.feed);
                    let tmp = feed_list.slice();
                    tmp.unshift(newPf.feed);
                    // console.log(tmp);
                    let tmpCount = imageNo + 1;
                    setImageNo(tmpCount);
                    setFeed_list(tmp);
                    setUploading(false);
                  });
              }}>
              <CustomTextRegular size={17} color={palette.red}>
                완료
              </CustomTextRegular>
            </Button>
          </View>

          <Button
            style={styles.modalButtonCancle}
            onPress={() => {
              setPfImageTempList(temp_init_data);
              setBtnMeasure(null);
              setBtnMeasureRight(null);
              setImageSource(null);

              setModalVisible(!modalVisible);
            }}>
            <CustomTextBold size={17} color={palette.black}>
              취소
            </CustomTextBold>
          </Button>
        </SafeAreaView>
      </Modal>
      {/* modal end */}

      <View
        style={styles.buttonView}
        ref={_imageLeft}
        onLayout={event => {
          measureView(event);
        }}>
        <Button style={styles.mainButton} onPress={() => selectPhotoTapped(1)}>
          {modalVisible && pfImageTempList[0].src !== null ? (
            <Image style={styles.fill} source={{uri: pfImageTempList[0].src}} />
          ) : pfImageList.length > 0 && pfImageList[0].src !== null ? (
            <TouchableByPlatform style={styles.mainButtonImageWrapper}>
              <Image
                style={styles.mainButtonImage}
                source={{uri: pfImageList[0].src}}
              />
            </TouchableByPlatform>
          ) : (
            <View style={styles.plusIconView}>
              <AntDesignIcon
                name="plus"
                size={((deviceWidth - 76) / 2) * 0.332}
                color={palette.orange[0]}
              />
            </View>
          )}
          <Image
            style={styles.mainButtonCameraIcon}
            source={require('~/images/profile_camera.png')}
          />
        </Button>

        <View
          onLayout={event => {
            measureView(event);
          }}
          ref={_imageRight}
          style={styles.rightButtonView}>
          <View style={styles.rightButtonViewFirst}>
            <Button
              style={imageNo > 0 ? styles.button : styles.nonactive_button}
              onPress={() => {
                if (imageNo > 0) {
                  selectPhotoTapped(2);
                } else {
                  null;
                }
              }}>
              {modalVisible && pfImageTempList[1].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[1].src}}
                />
              ) : pfImageList.length > 1 && pfImageList[1].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[1].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={imageNo > 0 ? palette.orange[0] : palette.gray}
                />
              )}
            </Button>
            <Button
              style={imageNo > 1 ? styles.button : styles.nonactive_button}
              onPress={() => {
                if (imageNo > 1) {
                  selectPhotoTapped(3);
                } else {
                  null;
                }
              }}>
              {modalVisible && pfImageTempList[2].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[2].src}}
                />
              ) : pfImageList.length > 2 && pfImageList[2].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[2].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={imageNo > 1 ? palette.orange[0] : palette.gray}
                />
              )}
            </Button>
          </View>

          <View style={styles.rightButtonViewSecond}>
            <Button
              style={imageNo > 2 ? styles.button : styles.nonactive_button}
              onPress={() => {
                if (imageNo > 2) {
                  selectPhotoTapped(4);
                } else {
                  null;
                }
              }}>
              {modalVisible && pfImageTempList[3].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[3].src}}
                />
              ) : pfImageList.length > 3 && pfImageList[3].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[3].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={imageNo > 2 ? palette.orange[0] : palette.gray}
                />
              )}
            </Button>
            <Button
              style={imageNo > 3 ? styles.button : styles.nonactive_button}
              onPress={() => {
                if (imageNo > 3) {
                  selectPhotoTapped(5);
                } else {
                  null;
                }
              }}>
              {modalVisible && pfImageTempList[4].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[4].src}}
                />
              ) : pfImageList.length > 4 && pfImageList[4].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[4].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={imageNo > 3 ? palette.orange[0] : palette.gray}
                />
              )}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 12,
    width: deviceWidth - 66,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: ((deviceWidth - 76) / 2) * (1 + 0.293 * 0.5),
  },
  plusIconView: {
    width: (deviceWidth - 76) / 2,
    height: (deviceWidth - 76) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonBG: {
    width: (deviceWidth - 76) / 2,
    height: (deviceWidth - 76) / 2,
  },
  mainButton: {
    width: (deviceWidth - 76) / 2,
    height: (deviceWidth - 76) / 2,
    borderRadius: 5,
    backgroundColor: '#ffffff00',
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 0.5,
    borderColor: palette.orange,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainButtonImageWrapper: {
    width: (deviceWidth - 76) / 2,
    height: (deviceWidth - 76) / 2,
    borderRadius: 5,
  },
  mainButtonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  mainButtonCameraIcon: {
    width: ((deviceWidth - 76) / 2) * 0.293,
    height: ((deviceWidth - 76) / 2) * 0.293,
    marginTop: (-((deviceWidth - 76) / 2) * 0.293) / 2,
  },
  rightButtonView: {
    width: (deviceWidth - 76) / 2,
    height: (deviceWidth - 76) / 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightButtonViewFirst: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rightButtonViewSecond: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: ((deviceWidth - 76) / 2) * 0.468,
    height: ((deviceWidth - 76) / 2) * 0.468,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: '#ffffff00',
    borderColor: palette.orange[0],
    borderWidth: 0.5,
    borderRadius: 5,
    elevation: 0,
  },
  nonactive_button: {
    width: ((deviceWidth - 76) / 2) * 0.468,
    height: ((deviceWidth - 76) / 2) * 0.468,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: palette.default_bg,
    borderColor: '#AEAEAE',
    borderWidth: 0.5,
    borderRadius: 5,
    elevation: 0,
  },

  modalButtonCancle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 52,
  },
  modalButtonMultiple: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 0,
    height: 52,
  },
  modalBtnContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  fill: {
    width: '100%',
    height: '100%',
  },
});
export default ProfileImageAddView;
