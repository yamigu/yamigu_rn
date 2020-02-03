import React from 'react';
import {Platform} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';

const TouchableByPlatform = props => {
  if (Platform.OS === 'android') {
    return <TouchableNativeFeedback>{props.children}</TouchableNativeFeedback>;
  } else {
    return <TouchableHighlight>{props.children}</TouchableHighlight>;
  }
};

export default TouchableByPlatform;
