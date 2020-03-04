import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import ProfileImageAddView from '../common/ProfileImageAddView';
import Anticon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
const dw = Dimensions.get('window').width;

const ImageView = ({scroll, offsetY}) => {
  const [hasProfile, setHasProfile] = useState(false);
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('userValue');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  useEffect(() => {
    getStorage().then(result => {
      if (result[3] === 'avata' || result[3] === null) {
        setHasProfile(false);
      } else {
        setHasProfile(true);
        // console.log(hasProfile);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomTextMedium size={18} color={palette.black}>
          프로필 사진
        </CustomTextMedium>
        {hasProfile === true ? null : (
          <Anticon
            name="exclamationcircle"
            style={{paddingTop: 4, marginLeft: 5}}
            color={palette.red}
            size={dw * 0.813 * 0.06}
          />
        )}
      </View>
      <ProfileImageAddView scroll={scroll} offsetY={offsetY} />
      <View style={styles.descView}>
        <CustomTextRegular size={12} color={palette.gray}>
          메인 사진은 반드시 본인 사진이어야 합니다
        </CustomTextRegular>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 33,
    paddingVertical: 12,
  },
  descView: {
    marginTop: 5,
    alignItems: 'center',
  },
});
export default ImageView;
