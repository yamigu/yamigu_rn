/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Platform} from 'react-native';

const os = Platform.OS;
export const CustomTextRegular = props => {
  return (
    <Text
      style={[
        {
          fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',
          fontWeight: os === 'android' ? 'normal' : '300',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : 'none',
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export const CustomTextMedium = props => {
  return (
    <Text
      style={[
        {
          fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',
          fontWeight: os === 'android' ? 'normal' : '500',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : 'none',
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export const CustomTextBold = props => {
  return (
    <Text
      style={[
        {
          fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',
          fontWeight: 'bold',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : 'none',
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
