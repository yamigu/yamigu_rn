import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Item, Input} from 'native-base';

const deviceWidth = Dimensions.get('window').width;
const NicknamePage = ({params}) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.root}>
      <CustomTextMedium size={20} color={palette.black}>
        닉네임을 작성해주세요
      </CustomTextMedium>
      <CustomTextRegular size={16} color={palette.gray}>
        *최대 6글자까지 가능해요!
      </CustomTextRegular>
      <Item style={styles.item}>
        <Input
          style={styles.input}
          placeholder={focus ? '' : '한글, 영문, 숫자만 입력 가능'}
          onChangeText={value => setText({value})}
          value={text}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          selectionColor={palette.orange[0]}
          placeholderTextColor={palette.nonselect}
          caretHidden={true}
        />
        <View style={styles.inputRightView}>
          <CustomTextRegular size={9} color={palette.blue}>
            사용 가능합니다.
          </CustomTextRegular>
        </View>
      </Item>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: palette.blue,
    marginTop: 16,
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'bottom',
    lineHeight: 14,
    fontFamily: 'NotoSansCJKkr-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: -10,
    color: palette.black,
  },
  inputRightView: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
});
export default NicknamePage;
