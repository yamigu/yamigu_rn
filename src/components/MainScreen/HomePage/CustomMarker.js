import React from 'react';
import {StyleSheet, Image} from 'react-native';
import MaterialCommunityicon from 'react-native-vector-icons/MaterialCommunityIcons';
import palette from '~/lib/styles/palette';

class CustomMarker extends React.Component {
  render() {
    return (
      <MaterialCommunityicon
        name="rectangle"
        color="white"
        size={20}
        style={{
          borderWidth: 1,
          borderColor: palette.black,
          backgroundColor: 'white',
        }}
      />
    );
  }
}

export default CustomMarker;
