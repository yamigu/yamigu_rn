/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import palette from '~/lib/styles/palette';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

const KakaoLoginButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Image style={styles.icon} source={require('~/images/kakao.png')} />
        <Text
          style={{
            color: palette.kakao_font,
            padding: 0,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Kakao로 로그인
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth >= 375 ? 320 : 280,
    height: 51,
    borderRadius: 5,
    backgroundColor: palette.kakao_bg,
    marginTop: 6,
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 3,
    width: 13,
    height: 13,
  },
});

export default KakaoLoginButton;
