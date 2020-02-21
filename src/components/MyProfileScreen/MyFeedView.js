/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import {
  CustomTextMedium,
  CustomTextRegular,
  CustomTextBold,
} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from 'react-native-best-viewpager';
import TouchableByPlatform from '../common/TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import {Button} from 'native-base';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const MyFeedView = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  }; // for uploading pictures

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  }; // for viewpage indicator

  return (
    <View style={styles.container}>
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
                Alert.alert('이때 서버 보내기');
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
              setModalVisible(false);
              setImageSource(null);
            }}>
            <CustomTextBold size={17} color={palette.black}>
              취소
            </CustomTextBold>
          </Button>
        </View>
      </Modal>

      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 30, marginBottom: 20}}>
        내 피드
      </CustomTextMedium>
      <IndicatorViewPager
        style={styles.viewPager}
        indicator={_renderDotIndicator()}>
        {imageSource === null ? (
          <ImageBackground
            style={styles.viewPage}
            key="1"
            source={require('~/images/addFeedExample.png')}>
            <TouchableByPlatform onPress={selectPhotoTapped}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomTextRegular color="white" size={40} style={styles.feedT}>
                  +
                </CustomTextRegular>
                <CustomTextRegular color="white" size={20} style={styles.feedT}>
                  내 피드 추가하기
                </CustomTextRegular>
              </View>
            </TouchableByPlatform>
          </ImageBackground>
        ) : (
          <Image style={styles.viewPage} source={imageSource} />
        )}
        <Image
          style={styles.viewPage}
          key="2"
          source={require('~/images/test-user-profile-girl.png')}>
          {/* <View
              style={{
                height: dh,
                width: dw,
                backgroundColor: 'rgba(0,0,0,0.6)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomTextRegular color="white" size={20} style={styles.feedT}>
                {feedText}
              </CustomTextRegular>
            </View> */}
        </Image>
        <Image
          style={styles.viewPage}
          key="3"
          source={require('~/images/test-user-profile-7.png')}
        />
      </IndicatorViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewPager: {
    width: dw,
    height: dw / 1.618,
  },
  selectedDot: {
    backgroundColor: palette.orange[0],
  },
  indicator: {
    width: dw,
    position: 'absolute',
    top: dw / 1.618 - 20,
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

export default MyFeedView;