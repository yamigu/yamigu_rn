import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {Button} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';
const deviceWidth = Dimensions.get('window').width;

const ProfileImageAddView = ({image1}) => {
  return (
    <View style={styles.buttonView}>
      <Button style={styles.mainButton}>
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
});
export default ProfileImageAddView;
