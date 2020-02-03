import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CustomTextRegular} from './CustomText';
import IonIcon from 'react-native-vector-icons/Ionicons';
const ListItemWithIcon = props => {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Image source={props.imageSource} style={styles.icon} />
        <CustomTextRegular size={14}>{props.children}</CustomTextRegular>
      </View>
      <View style={styles.right}>
        <IonIcon name="ios-arrow-forward" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    paddingLeft: 28,
    paddingRight: 28,
    marginBottom: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
  },
  button: {},
});
export default ListItemWithIcon;
