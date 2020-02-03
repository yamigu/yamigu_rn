/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomButton = ({title, backgroundColor, color}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <TouchableOpacity>
        <Text style={{color: color, fontWeight: 'bold'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 18.9,
  },
});

export default CustomButton;
