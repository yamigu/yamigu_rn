import React from 'react';
import {View, StyleSheet} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    width: 56,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 5,
  },
  touchable: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const FAB = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient colors={['#FF8826', '#E67518']}>
        <TouchableByPlatform style={styles.touchable}>
          <AntDesignIcon name="plus" color="white" size={24} />
        </TouchableByPlatform>
      </LinearGradient>
    </View>
  );
};

export default FAB;
