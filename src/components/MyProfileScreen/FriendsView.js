import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Button} from 'native-base';

const FriendsView = ({params}) => (
  <View style={styles.container}>
    <CustomTextMedium size={18} color={palette.black} style={{marginLeft: 21}}>
      내 친구들
    </CustomTextMedium>
    <CustomTextRegular
      size={14}
      color={palette.black}
      style={{alignSelf: 'center', paddingVertical: 12}}>
      친구를 등록하고 내 친구도 자랑하세요!
    </CustomTextRegular>
    <Button style={styles.button}>
      <CustomTextMedium size={14} color="white">
        친구 등록하기
      </CustomTextMedium>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: palette.orange,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default FriendsView;
