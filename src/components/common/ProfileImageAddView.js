import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Button} from 'native-base';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
const deviceWidth = Dimensions.get('window').width;

const ProfileImageAddView = ({params}) => (
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
);

const styles = StyleSheet.create({
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
export default ProfileImageAddView;
