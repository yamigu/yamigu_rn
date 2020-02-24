/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import '~/config';
import file_upload from '~/lib/utils/file_upload';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const MyFeedView = ({userInfo}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [feed_list, setFeed_list] = useState([]);

  useEffect(() => {
    if (userInfo[global.config.user_info_const.UID] !== undefined) {
      axios
        .get(
          'http://13.124.126.30:8000/core/feed/' +
            userInfo[global.config.user_info_const.UID] +
            '/',
        )
        .then(result => {
          console.log(result.data);
          let tmpFeed = [];
          let count = 0;
          result.data.map(item => {
            tmpFeed[count] = item;
            count++;
          });
          tmpFeed.reverse();
          setFeed_list(tmpFeed);
        });
    }
  }, [userInfo]);
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
        pageCount={feed_list.length + 1}
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
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.modalButtonMultiple}
              onPress={() => {
                const formData = new FormData();
                formData.append('image', {
                  uri: imageSource.uri,
                  type: imageSource.type,
                  name: imageSource.uri,
                });
                file_upload(
                  formData,
                  'http://13.124.126.30:8000/core/feed/',
                ).then(result => {
                  setImageSource(null);
                  setModalVisible(false);
                  let tmpFeed = feed_list.slice();
                  tmpFeed.unshift(result.data);
                  console.log(result.data);
                  setFeed_list(tmpFeed);
                });
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
        style={{marginLeft: 30, marginBottom: 20, marginTop: 16}}>
        내 피드
      </CustomTextMedium>
      {imageSource === null ? (
        <IndicatorViewPager
          style={styles.viewPager}
          indicator={_renderDotIndicator()}>
          <ImageBackground
            style={styles.viewPage}
            key="1"
            source={require('~/images/addFeedExample.png')}>
            <TouchableByPlatform onPress={selectPhotoTapped}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
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
          {feed_list.map((item, index) => {
            console.log(item);
            return (
              <Image
                style={styles.viewPage}
                key={index + 2}
                source={item.img_src === null ? null : {uri: item.img_src}}
              />
            );
          })}
        </IndicatorViewPager>
      ) : (
        <Image style={styles.viewPager} source={imageSource} />
      )}
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
