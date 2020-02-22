/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';

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
const ProfileImageAddView = ({image1, image2, image3, image4, image5}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pfImageList, setPfImageList] = useState(temp_init_data);
  const [pfImageTempList, setPfImageTempList] = useState(temp_init_data);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios({
      url: 'http://13.124.126.30:8000/authorization/user/profile_image/',
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(result => {
      console.log(result.data);
      let tmp = ['', '', '', '', ''];
      result.data.map((item, index) => {
        tmp[index] = item.src;
      });
      setPfImageList(result.data);
    });
  }, []);

  const selectPhotoTapped = number => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    console.log(pfImageList[0]);

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          name: response.fileName,
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
        <SafeAreaView
          style={{
            height: '100%',

            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.modalButtonMultiple}
              onPress={() => {
                setUploading(true);
                const formData = new FormData();
                formData.append('image', {
                  uri: imageSource.uri,
                  type: imageSource.type,
                  name: imageSource.name,
                });
                formData.append('number', imageSource.number);
                file_upload(
                  formData,
                  'http://13.124.126.30:8000/authorization/user/profile_image/',
                ).then(result => {
                  setUploading(false);
                  let temp = pfImageList.slice();
                  temp[result.data.number - 1] = result.data;
                  setPfImageList(temp);
                  setPfImageTempList(temp_init_data);
                  setModalVisible(false);
                  // Alert.alert(
                  //   'Alert Title',
                  //   'My Alert Msg',
                  //   [{text: 'OK', onPress: () => setModalVisible(false)}],
                  //   {cancelable: false},
                  // );
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
              setModalVisible(!modalVisible);
              setPfImageTempList(temp_init_data);
            }}>
            <CustomTextBold size={17} color={palette.black}>
              취소
            </CustomTextBold>
          </Button>
        </SafeAreaView>
      </Modal>
      {/* modal end */}

      <View style={styles.buttonView}>
        <Button style={styles.mainButton} onPress={() => selectPhotoTapped(1)}>
          {pfImageTempList[0].src !== null ? (
            <Image style={styles.fill} source={{uri: pfImageTempList[0].src}} />
          ) : pfImageList[0].src !== null ? (
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
            source={require('~/images/icon-camera-circle.png')}
          />
        </Button>
        <View style={styles.rightButtonView}>
          <View style={styles.rightButtonViewFirst}>
            <Button style={styles.button} onPress={() => selectPhotoTapped(2)}>
              {pfImageTempList[1].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[1].src}}
                />
              ) : pfImageList[1].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[1].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
                />
              )}
            </Button>
            <Button style={styles.button} onPress={() => selectPhotoTapped(3)}>
              {pfImageTempList[2].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[2].src}}
                />
              ) : pfImageList[2].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[2].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
                />
              )}
            </Button>
          </View>
          <View style={styles.rightButtonViewSecond}>
            <Button style={styles.button} onPress={() => selectPhotoTapped(4)}>
              {pfImageTempList[3].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[3].src}}
                />
              ) : pfImageList[3].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[3].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
                />
              )}
            </Button>
            <Button style={styles.button} onPress={() => selectPhotoTapped(5)}>
              {pfImageTempList[4].src !== null ? (
                <Image
                  style={styles.fill}
                  source={{uri: pfImageTempList[4].src}}
                />
              ) : pfImageList[4].src !== null ? (
                <Image style={styles.fill} source={{uri: pfImageList[4].src}} />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
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
