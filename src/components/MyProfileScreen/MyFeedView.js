/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, createRef, useRef} from 'react';
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
import Octionicon from 'react-native-vector-icons/Octicons';
import '~/config';
import file_upload from '~/lib/utils/file_upload';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const MyFeedView = ({userInfo, scroll, offsetY}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [feed_list, setFeed_list] = useState([]);
  const [btnMeasure, setBtnMeasure] = useState(null);

  const _image = useRef();
  const _viewPager = useRef();

  const deleteFeed = () => {
    Alert.alert('정말 피드를 삭제하시겠습니까?', '', [
      {text: '취소', onPress: () => console.log('Cancel Pressed')},
      {
        text: '삭제',
        onPress: () => {
          const fid = feed_list[_viewPager.current._currentIndex - 1].id;
          axios
            .patch('http://13.124.126.30:8000/core/feed/' + fid + '/delete/')
            .then(result => {
              let temp = feed_list.slice();
              temp.splice(_viewPager.current._currentIndex - 1, 1);
              setFeed_list(temp);
            });
        },
        style: 'destructive',
      },
    ]);
  };
  const measureView = event => {};
  const _measure = obj => {
    obj.current.measure((x, y, width, height, pagex, pagey) => {
      const location = {
        fx: x,
        fy: y,
        px: pagex,
        py: pagey,
        width: width,
        height: height,
      };
      if (location.py + location.height > dh - 114) {
        scroll.current.scrollTo(offsetY + 114, 0, true);
        location.py = location.py - 114;
      }
      setBtnMeasure(location);
    });
  };
  useEffect(() => {
    if (userInfo[global.config.user_info_const.UID] !== undefined) {
      axios
        .get(
          'http://13.124.126.30:8000/core/feed/' +
            userInfo[global.config.user_info_const.UID] +
            '/',
        )
        .then(result => {
          // console.log(result.data);
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
    if (modalVisible) return;
    _measure(_image);
    const options = {
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
        };
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
          setImageSource(null);
        }}>
        {btnMeasure !== null && btnMeasure !== undefined ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              width: dw,
              height: dw / 1.618,
              left: btnMeasure.px,
              top: btnMeasure.py,
            }}>
            <Image style={styles.viewPage} source={imageSource} />
          </View>
        ) : null}
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        />
        <View style={styles.modalBtnContainer}>
          <Button
            style={styles.modalButtonMultiple}
            onPress={() => {
              const formData = new FormData();
              formData.append('image', {
                uri: imageSource.uri,
                type: imageSource.type,
                name: imageSource.name,
              });
              file_upload(
                formData,
                'http://13.124.126.30:8000/core/feed/',
              ).then(result => {
                setImageSource(null);
                setModalVisible(false);
                let tmpFeed = feed_list.slice();
                tmpFeed.unshift(result.data);
                // console.log(result.data);
                setFeed_list(tmpFeed);
              });
            }}>
            <CustomTextRegular size={17} color={palette.red}>
              완료
            </CustomTextRegular>
          </Button>
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
        내 사진들
      </CustomTextMedium>
      {imageSource === null ? (
        <IndicatorViewPager
          ref={_viewPager}
          style={styles.viewPager}
          indicator={_renderDotIndicator()}>
          <ImageBackground
            style={styles.viewPage}
            key="1"
            source={require('~/images/addFeedExample.png')}>
            <TouchableByPlatform onPress={selectPhotoTapped}>
              <View
                onLayout={event => {
                  measureView(event);
                }}
                ref={_image}
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
                  친구들 사진 올리기
                </CustomTextRegular>
              </View>
            </TouchableByPlatform>
          </ImageBackground>
          {feed_list.map((item, index) => {
            // console.log(item);
            return (
              <View key={index}>
                <Image
                  style={styles.viewPage}
                  key={index + 2}
                  source={item.img_src === null ? null : {uri: item.img_src}}
                />
                <View style={styles.roundWrapper}>
                  <Button
                    transparent
                    style={styles.deleteBtn}
                    onPress={deleteFeed}>
                    <Octionicon name="x" size={20} style={styles.iconX} />
                  </Button>
                </View>
              </View>
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
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
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
    width: '100%',
    backgroundColor: '#00000000',
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  roundWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    overflow: 'hidden',
  },
  deleteBtn: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    // backgroundColor: '#00000077',
  },
  iconX: {
    color: 'white',
  },
});

export default MyFeedView;
