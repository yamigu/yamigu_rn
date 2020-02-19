/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
} from 'react-native';
import {Button} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import {CustomTextBold, CustomTextRegular} from './CustomText';

const deviceWidth = Dimensions.get('window').width;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const ProfileImageAddView = ({image1, image2, image3, image4, image5}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImageNum, setProfileImageNum] = useState(1);

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
        setImageSource(source);
        setModalVisible(true);
      }
    });
  };
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            height: dh,
            backgroundColor: 'rgba(0,0,0,0.5)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.modalButtonMultiple}
              onPress={() => {
                setImageSource(null);
                setModalVisible(false);
                setProfileImageNum(profileImageNum + 1);

                // Alert.alert(
                //   'Alert Title',
                //   'My Alert Msg',
                //   [{text: 'OK', onPress: () => setModalVisible(false)}],
                //   {cancelable: false},
                // );
              }}>
              <CustomTextRegular size={17} color={palette.red}>
                완료
              </CustomTextRegular>
            </Button>
            <View
              style={{
                height: 1,
                width: dw - 20,
                backgroundColor: palette.black,
              }}
            />
          </View>

          <Button
            style={styles.modalButtonCancle}
            onPress={() => {
              setModalVisible(!modalVisible);
              setImageSource(null);
            }}>
            <CustomTextBold size={17} color={palette.black}>
              취소
            </CustomTextBold>
          </Button>
        </View>
      </Modal>
      {/* modal end */}

      <View style={styles.buttonView}>
        <Button style={styles.mainButton} onPress={selectPhotoTapped}>
          {image1 ? (
            <TouchableByPlatform style={styles.mainButtonImageWrapper}>
              <Image
                style={styles.mainButtonImage}
                source={require('~/images/test-user-profile-5.png')}
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
            <Button style={styles.button} onPress={selectPhotoTapped}>
              {profileImageNum > 1 ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('~/images/test-user-profile-girl.png')}
                />
              ) : profileImageNum === 1 && imageSource !== null ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={imageSource}
                />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
                />
              )}
            </Button>
            <Button style={styles.button} onPress={selectPhotoTapped}>
              {profileImageNum > 2 ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('~/images/test-user-profile-girl.png')}
                />
              ) : profileImageNum === 2 && imageSource !== null ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={imageSource}
                />
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
            <Button style={styles.button} onPress={selectPhotoTapped}>
              {profileImageNum > 3 ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('~/images/test-user-profile-girl.png')}
                />
              ) : profileImageNum === 3 && imageSource !== null ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={imageSource}
                />
              ) : (
                <AntDesignIcon
                  name="plus"
                  size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
                  color={palette.orange[0]}
                />
              )}
            </Button>
            <Button style={styles.button} onPress={selectPhotoTapped}>
              {profileImageNum > 4 ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('~/images/test-user-profile-girl.png')}
                />
              ) : profileImageNum === 4 && imageSource !== null ? (
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={imageSource}
                />
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
});
export default ProfileImageAddView;
