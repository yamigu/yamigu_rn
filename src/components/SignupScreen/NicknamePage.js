import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Input, Form, Item} from 'native-base';

const NicknamePage = ({params}) => (
  <View style={styles.root}>
    <CustomTextMedium size={20} color={palette.black}>
      닉네임을 작성해주세요
    </CustomTextMedium>
    <CustomTextRegular size={16} color={palette.gray}>
      *최대 6글자까지 가능해요!
    </CustomTextRegular>
    <Form>
      <Item>
        <Input placeholder="한글, 영문, 숫자만 입력 가능"></Input>
      </Item>
    </Form>
  </View>
);

const styles = StyleSheet.create({
  root: {},
});
export default NicknamePage;
