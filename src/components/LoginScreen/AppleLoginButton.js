/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

const AppleLoginButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable}>
        <IonIcon name="logo-apple" style={styles.icon} size={16} />
        <Text
          style={{
            color: 'white',
            padding: 0,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Apple 로그인
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
    backgroundColor: 'black',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    marginRight: 3,
  },
});

export default AppleLoginButton;
