import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Item, Input} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import '~/config';
const os = Platform.OS;
var getTextLength = function(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)).length == 6) {
      len++;
    }
    len++;
  }
  return len;
};
const NicknamePage = ({
  setNickname,
  nicknameAvailable,
  setNicknameAvailable,
}) => {
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);
  const check_validation = value => {
    return new Promise(async (resolve, reject) => {
      let avail;
      if (
        value === '' ||
        getTextLength(value) > 12 ||
        getTextLength(value) < 2
      ) {
        avail = false;
      } else {
        avail = await axios
          .post(global.config.api_host + 'authorization/validation/nickname/', {
            nickname: value,
          })
          .then(() => true)
          .catch(() => false);
      }
      resolve(avail);
    });
  };
  return (
    <KeyboardAwareScrollView bounces={false} style={styles.root}>
      <CustomTextMedium size={24} color={palette.black}>
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
    height: '100%',
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
    fontFamily: os === 'android' ? 'Roboto' : 'Apple SD Gothic Neo',

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
