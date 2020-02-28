/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useReducer, useEffect} from 'react';
import palette from '~/lib/styles/palette';
import {Thumbnail, Input, Button} from 'native-base';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommuniticons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import {
  IndicatorViewPager,
  PagerDotIndicator,
} from 'react-native-best-viewpager';

import {
  CustomTextRegular,
  CustomTextMedium,
  CustomTextBold,
} from '~/components/common/CustomText';
import file_upload from '~/lib/utils/file_upload';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
const nowYear = 20200000;

const MyFeedManage = ({navigation, myFeedManageProp, myFeed, setMyFeed}) => {
  const [imageSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [feedDisplay, setFeedDisplay] = useState(false);

  useEffect(() => {
    console.log('uid::::::');
    console.log(myFeedManageProp.uid);
  }, []);

  const selectPhotoTapped = () => {
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
        setFeedDisplay(true);
        setImageSource(source);
        setModalVisible(true);
      }
    });
  }; // for uploading pictures

  const uploadMyFeed = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageSource.uri,
      type: imageSource.type,
      name: imageSource.uri,
    });
    file_upload(formData, 'http://13.124.126.30:8000/core/feed/').then(
      result => {
        setImageSource(null);
        setModalVisible(false);
        let tmpFeed = myFeed.slice();
        tmpFeed.unshift(result.data);
        // console.log(result.data);
        setMyFeed(tmpFeed);
      },
    );
  };

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={myFeed.length}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  }; // for viewpage indicator

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.modalBtnContainer}>
            <Button
              style={styles.modalButtonMultiple}
              onPress={() => uploadMyFeed()}>
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

      <View style={styles.actionDiv}>
        <TouchableByPlatform
          style={styles.touchable}
          onPress={selectPhotoTapped}>
          <View style={styles.button}>
            <AntDesignIcon name="picture" size={18} style={{marginRight: 5}} />
            <CustomTextRegular size={14} color={palette.black}>
              사진
            </CustomTextRegular>
          </View>
        </TouchableByPlatform>

        <View style={styles.verticalDivider} />

        <View style={styles.touchable}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setFeedDisplay(!feedDisplay)}>
            <CustomTextRegular size={14} color={palette.black}>
              내 피드
            </CustomTextRegular>
            {feedDisplay === true ? (
              <AntDesignIcon
                name="caretup"
                size={12}
                style={{marginLeft: 5, color: palette.orange}}
              />
            ) : (
              <AntDesignIcon
                name="caretdown"
                size={12}
                style={{marginLeft: 5, color: palette.orange}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {feedDisplay === true ? (
        imageSource !== null ? (
          <Image style={styles.viewPager} source={imageSource} />
        ) : (
          <IndicatorViewPager
            style={styles.viewPager}
            indicator={_renderDotIndicator()}>
            {myFeed.map(item => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={
                      item.img_src === null
                        ? null
                        : () => {
                            navigation.navigate('Profile', {
                              uid: myFeedManageProp.uid,
                              nickname: myFeedManageProp.nickname,
                              avata: myFeedManageProp.avata,
                              age: Math.floor(
                                (nowYear - myFeedManageProp.birthdate) / 10000 +
                                  2,
                              ),
                              belong: myFeedManageProp.belong,
                              department: myFeedManageProp.department,
                              my_feed: true,
                            });
                          }
                    }>
                    <Image
                      style={styles.viewPage}
                      key="1"
                      source={
                        item.img_src === null ? null : {uri: item.img_src}
                      }
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </IndicatorViewPager>
        )
      ) : null}
      <View style={styles.lastDivider} />
    </View>
  );
};
const styles = StyleSheet.create({
  myfeed: {
    width: dw,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    paddingVertical: 10,
  },
  horizontalDivider: {
    backgroundColor: '#D9D9D9',
    color: '#D9D9D9',
    width: dw,
    height: 0.5,
    marginTop: 2,
    marginLeft: 12,
    marginRight: 12,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDDDDD',
  },
  actionDiv: {
    backgroundColor: 'white',
    width: dw,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    alignItems: 'center',
  },
  touchable: {
    width: dw / 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastDivider: {
    backgroundColor: palette.default_bg,
    color: '#D9D9D9',
    width: dw,
    height: 10,
  },
  viewPage: {
    width: '100%',
    height: '100%',
  },
  ImageContainer: {
    width: dw,
    height: dw / 1.618,
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
  feedT: {maxWidth: dw * 0.8},

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

export default MyFeedManage;
