import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Item, Input} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const NicknamePage = ({
  setNickname,
  nicknameAvailable,
  setNicknameAvailable,
}) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const check_validation = value => {
    return new Promise(async (resolve, reject) => {
      const avail = await axios
        .post('http://13.124.126.30:8000/authorization/validation/nickname/', {
          nickname: value,
        })
        .then(() => true)
        .catch(() => false);
      resolve(avail);
    });
  };
  return (
    <KeyboardAwareScrollView style={styles.root}>
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
          onChangeText={async value => {
            setText(value);
            setNickname(value);
            const avail = await check_validation(value);
            setNicknameAvailable(avail);
          }}
          focus={focus}
          value={text}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          selectionColor={palette.orange[0]}
          placeholderTextColor={palette.nonselect}
        />
        <View style={styles.inputRightView}>
          {text !== '' ? (
            nicknameAvailable ? (
              <CustomTextRegular size={9} color={palette.blue}>
                사용 가능합니다.
              </CustomTextRegular>
            ) : (
              <CustomTextRegular size={9} color={palette.red}>
                사용 불가능합니다.
              </CustomTextRegular>
            )
          ) : null}
        </View>
      </Item>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
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
    fontFamily: 'NotoSansCJKkr-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    color: palette.black,
  },
  inputRightView: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
});
export default NicknamePage;
