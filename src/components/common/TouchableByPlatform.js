import React from 'react';
import {Platform} from 'react-native';
import {
  TouchableNativeFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';

const TouchableByPlatform = props => {
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback style={props.style}>
        {props.children}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableHighlight style={props.style}>
        {props.children}
      </TouchableHighlight>
    );
  }
};

export default TouchableByPlatform;
