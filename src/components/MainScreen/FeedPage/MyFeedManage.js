/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useReducer, useEffect} from 'react';
import ProfileCard from '~/components/common/ProfileCard';
import palette from '~/lib/styles/palette';
import {Thumbnail, Input, Button} from 'native-base';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommuniticons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
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

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;
const nowYear = 20200000;
const MyFeedManage = ({navigation}) => {
  useEffect(() => {
    let tmpUrl;
    axios
      .get('http://13.124.126.30:8000/authorization/user/info/')
      .then(result => {
        setMyUid(result.data.uid);
        setNickname(result.data.nickname);
        setAvata(result.data.avata);
        setAge(result.data.age);
        setBelong(result.data.belong);
        setDepartment(result.data.department);
        tmpUrl = 'http://13.124.126.30:8000/core/feed/' + result.data.uid + '/';
        return tmpUrl;
      })
      .then(url =>
        // () => console.log(feedCalling),
        axios.get(url).then(result => {
          let tmpFeed = [];
          let count = 0;
          result.data.map(item => {
            tmpFeed[count] = item;
            count++;
          });
          setFeed_list(tmpFeed);
        }),
      );
  }, []);

  const [uid, setMyUid] = useState('');
  const [nickname, setNickname] = useState('');
  const [avata, setAvata] = useState('');
  const [age, setAge] = useState(0);
  const [belong, setBelong] = useState('');
  const [department, setDepartment] = useState('');

  const [feed_list, setFeed_list] = useState([]);
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
        setFeedDisplay(true);
        setImageSource(source);
        setModalVisible(true);
      }
    });
  }; // for uploading pictures

  const [feedDisplay, setFeedDisplay] = useState(false);

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={feed_list.length}
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
                color={palette.orange}
                size={12}
                style={{marginLeft: 5, color: palette.orange}}
              />
            ) : (
              <AntDesignIcon
                name="caretdown"
                color="#898989"
                size={12}
                style={{marginLeft: 5, color: palette.orange}}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {feedDisplay === true ? (
        <IndicatorViewPager
          style={styles.viewPager}
          indicator={_renderDotIndicator()}>
          {feed_list.map(item => {
            if (imageSource !== null) {
              return <Image style={styles.viewPage} source={imageSource} />;
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Profile', {
                    uid,
                    nickname,
                    avata,
                    age,
                    belong,
                    department,
                    feed_list,
                  });
                }}>
                <Image
                  style={styles.viewPage}
                  key="1"
                  source={{url: item.img_src}}
                />
              </TouchableOpacity>
            );
          })}
        </IndicatorViewPager>
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