import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import palette from '~/lib/styles/palette';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import {Button, Input} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const deviceWidth = Dimensions.get('window').width;

const ImagePage = ({params}) => (
  <View style={styles.root}>
    <CustomTextMedium size={20} color={palette.black}>
      마지막이에요! 사진을 올려주세요
    </CustomTextMedium>
    <CustomTextRegular size={16} color={palette.gray}>
      *최소 2장의 본인 사진을 등록해주세요.
    </CustomTextRegular>
    <View style={styles.buttonView}>
      <ImageBackground
        style={styles.mainButtonBG}
        source={require('~/images/btn-plus-image-with-cam.png')}>
        <Button style={styles.mainButton}>
          <AntDesignIcon
            name="plus"
            size={((deviceWidth - 76) / 2) * 0.332}
            color={palette.orange[0]}
          />
        </Button>
      </ImageBackground>
      <View style={styles.rightButtonView}>
        <View style={styles.rightButtonViewFirst}>
          <Button style={styles.button}>
            <AntDesignIcon
              name="plus"
              size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
              color={palette.orange[0]}
            />
          </Button>
          <Button style={styles.button}>
            <AntDesignIcon
              name="plus"
              size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
              color={palette.orange[0]}
            />
          </Button>
        </View>
        <View style={styles.rightButtonViewSecond}>
          <Button style={styles.button}>
            <AntDesignIcon
              name="plus"
              size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
              color={palette.orange[0]}
            />
          </Button>
          <Button style={styles.button}>
            <AntDesignIcon
              name="plus"
              size={((deviceWidth - 76) / 2) * 0.468 * 0.332}
              color={palette.orange[0]}
            />
          </Button>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
  },
  buttonView: {
    marginTop: 21,
    marginHorizontal: 13,
    width: deviceWidth - 66,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainButtonBG: {
    width: (deviceWidth - 76) / 2,
    height: ((deviceWidth - 76) / 2) * 1.067,
    resizeMode: 'contain',
  },
  mainButton: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#ffffff00',
    elevation: 0,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default ImagePage;
