import React from 'react';
import {Platform} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const TouchableByPlatform = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback style={props.style} onPress={props.onPress}>
        {props.children}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }
};

export default TouchableByPlatform;
