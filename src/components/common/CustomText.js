/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';

export const CustomTextRegular = props => {
  return (
    <Text
      style={
        props.style || {
          fontFamily: 'NotoSansCJKkr-Regular',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : '',
        }
      }>
      {props.children}
    </Text>
  );
};
export const CustomTextMedium = props => {
  return (
    <Text
      style={[
        props.style,
        {
          fontFamily: 'NotoSansCJKkr-Medium',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : '',
        },
      ]}>
      {props.children}
    </Text>
  );
};
export const CustomTextBold = props => {
  return (
    <Text
      style={[
        props.style,
        {
          fontFamily: 'NotoSansCJKkr-Bold',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : '',
        },
      ]}>
      {props.children}
    </Text>
  );
};
export const CustomTextBlack = props => {
  return (
    <Text
      style={[
        props.style,
        {
          fontFamily: 'NotoSansCJKkr-Black',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : '',
        },
      ]}>
      {props.children}
    </Text>
  );
};
export const CustomTextLight = props => {
  return (
    <Text
      textDecorationLine={props.decoLine ? props.decoLine : ''}
      style={[
        props.style,
        {
          fontFamily: 'NotoSansCJKkr-Light',
          color: props.color ? props.color : 'black',
          fontSize: props.size ? props.size : 16,
          lineHeight: props.size ? props.size + 10 : 18,
          includeFontPadding: false,
          textDecorationLine: props.decoLine ? props.decoLine : '',
        },
      ]}>
      {props.children}
    </Text>
  );
};
