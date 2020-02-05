/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import RoundBorderTextView from './RoundBorderTextView';

const MeetingSettingPane = ({data}) => (
  <View
    style={{flex: 1, marginTop: 12, flexWrap: 'wrap', flexDirection: 'row'}}>
    {data.map(item => (
      <RoundBorderTextView>{item}</RoundBorderTextView>
    ))}
  </View>
);

export default MeetingSettingPane;
