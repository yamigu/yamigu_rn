import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import ProfileCard from '~/components/common/ProfileCard';
import palette from '~/lib/styles/palette';
import {Thumbnail, Input, Button} from 'native-base';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ImagePicker from 'react-native-image-picker';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommuniticons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {
  IndicatorViewPager,
  PagerDotIndicator,
} from 'react-native-best-viewpager';

import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const MyFeedManage = ({navigation}) => {
  const [imageSource, setImageSource] = useState(null);
  const [feedText, setFeedText] = useState(null);

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
        setToggle(true);
        setImageSource(source);
      }
    });
  };

  const [toggle, setToggle] = useState(0);
  const showMy = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={styles.myfeed}>
        <Thumbnail
          style={{
            alignSelf: 'center',
            height: 50,
            width: 50,
            borderRadius: 50 / 2,
          }}
          source={require('~/images/user-default-profile.png')}
        />
        <Input
          autoFocus="true"
          placeholder=" 무슨 생각을 하고 계신가요"
          color={palette.black}
          size={16}
          onChange={() => {
            setToggle(true);
          }}
          style={{marginLeft: 10}}
        />
        <Feather
          name="upload"
          size={25}
          color={palette.orange}
          style={{marginRight: 10}}
        />
        {/* <CustomTextRegular
          size={16}
          color={palette.black}
          style={{marginLeft: 10}}>
          무슨 생각을 하고 계신가요?
        </CustomTextRegular> */}
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.actionDiv}>
        <TouchableByPlatform
          style={styles.touchable}
          onPress={selectPhotoTapped}>
          <View style={styles.button}>
            <AntDesignIcon
              name="picture"
              color="#898989"
              size={18}
              style={{marginRight: 5}}
            />
            <CustomTextRegular size={14} color="#898989">
              사진
            </CustomTextRegular>
          </View>
        </TouchableByPlatform>

        <View style={styles.verticalDivider} />

        <TouchableByPlatform onPress={showMy} style={styles.touchable}>
          <View style={styles.button}>
            <CustomTextRegular size={14} color="#898989">
              취소하기
            </CustomTextRegular>
            {toggle === true ? (
              <AntDesignIcon
                name="caretup"
                color={palette.orange}
                size={1}
                style={{marginLeft: 5}}
              />
            ) : (
              <AntDesignIcon
                name="caretdown"
                color="#898989"
                size={12}
                style={{marginLeft: 5}}
              />
            )}
          </View>
        </TouchableByPlatform>
      </View>
      {toggle === true ? (
        <TouchableByPlatform onPress={() => navigation.navigate('Profile')}>
          <IndicatorViewPager
            style={styles.viewPager}
            indicator={_renderDotIndicator()}>
            <ImageBackground
              style={styles.viewPage}
              key="1"
              source={require('~/images/test-user-profile-girl.png')}>
              <View
                style={{
                  height: dh,
                  width: dw,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomTextRegular color="white" size={20} style={styles.feedT}>
                  오늘 센치한 밤밤~~오늘 센치한 밤밤~~오늘 센치한 밤밤~~오늘
                  센치한 밤밤~~오늘 센치한 밤밤~~오늘 센치한 밤밤~~오늘 센치한
                  밤밤~~
                </CustomTextRegular>
              </View>
            </ImageBackground>
            <Image
              style={styles.viewPage}
              key="2"
              source={require('~/images/test-user-profile-7.png')}
            />
            <Image
              style={styles.viewPage}
              key="3"
              source={require('~/images/test-user-profile-8.png')}
            />
          </IndicatorViewPager>
        </TouchableByPlatform>
      ) : (
        <View style={{height: 0}} />
      )}
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    top: dw / 1.618,
  },
  feedT: {maxWidth: dw * 0.8},
});

export default MyFeedManage;
