import React, {useState, createRef} from 'react';
import {Text, View, StyleSheet, findNodeHandle} from 'react-native';
import {CustomTextRegular, CustomTextMedium} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {Button, Form, Item, Label, Input, Content} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BelongPage = ({params}) => {
  const [toggle, setToggle] = useState(0);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const clickButton = pos => {
    if (pos === toggle) {
      setToggle(0);
    } else {
      setToggle(pos);
    }
  };
  const scrollView = createRef();
  const handleFormFocus = reactNode => {
    scrollView.current.scrollToPosition(0, 0);
  };
  return (
    <KeyboardAwareScrollView ref={scrollView} style={styles.root}>
      <CustomTextMedium size={20} color={palette.black}>
        소속을 입력해주세요
      </CustomTextMedium>
      <CustomTextRegular size={16} color={palette.gray}>
        *소속이 있는 회원만 가입이 가능합니다.
      </CustomTextRegular>
      <View style={styles.buttonView}>
        <Button
          style={[
            toggle === 1 ? styles.buttonActive : styles.button,
            styles.buttonLeft,
          ]}
          onPress={() => clickButton(1)}>
          <CustomTextRegular
            size={14}
            color={toggle === 1 ? palette.orange[0] : palette.nonselect}>
            대학(원)생
          </CustomTextRegular>
        </Button>
        <Button
          style={[
            toggle === 2 ? styles.buttonActive : styles.button,
            styles.buttonRight,
          ]}
          onPress={() => clickButton(2)}>
          <CustomTextRegular
            size={14}
            color={toggle === 2 ? palette.orange[0] : palette.nonselect}>
            직장인
          </CustomTextRegular>
        </Button>
      </View>
      {toggle !== 0 ? (
        <Form style={styles.form}>
          <Item stackedLabel style={styles.formItem}>
            <Label style={styles.label}>
              {toggle === 1 ? '학교 입력' : '직장 입력'}
            </Label>
            <Input
              style={styles.input}
              placeholder={
                focus1
                  ? ''
                  : toggle === 1
                  ? 'ex) 연세대, 고려대, 서울대, 이화여대, OO대'
                  : 'ex) 삼성전자, 스타트업, 프리랜서'
              }
              onChangeText={value => setText1(value)}
              value={text1}
              selectionColor={palette.orange[0]}
              placeholderTextColor={palette.nonselect}
              caretHidden={true}
              onFocus={event => {
                setFocus1(true);
                handleFormFocus(findNodeHandle(event.target));
              }}
              onBlur={() => setFocus1(false)}
            />
          </Item>
          <Item stackedLabel style={styles.formItem}>
            <Label style={styles.label}>
              {toggle === 1 ? '전공 입력 (선택)' : '직업 입력 (선택)'}
            </Label>
            <Input
              style={styles.input}
              placeholder={
                focus2
                  ? ''
                  : toggle === 1
                  ? 'ex) 전기전자공학부, 경영학과, 의학과'
                  : 'ex) 디자이너, 의사, 개발자, 선생님'
              }
              onChangeText={value => setText2(value)}
              value={text2}
              selectionColor={palette.orange[0]}
              placeholderTextColor={palette.nonselect}
              caretHidden={true}
              onFocus={event => {
                setFocus2(true);
                handleFormFocus(findNodeHandle(event.target));
              }}
              onBlur={() => setFocus2(false)}
            />
          </Item>
        </Form>
      ) : null}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
  },
  buttonView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.default_bg,
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  buttonActive: {
    width: '50%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.default_bg,
    elevation: 0,
    borderWidth: 1,
    borderColor: palette.orange[0],
  },
  buttonLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0.5,
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0.5,
  },
  form: {
    flex: 1,
    marginTop: 12,
    paddingLeft: 0,
  },
  formItem: {
    marginLeft: 0,
    borderWidth: 1,
    borderColor: palette.nonselect,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    textAlignVertical: 'bottom',
    lineHeight: 14,
    fontFamily: 'NotoSansCJKkr-Medium',
    paddingBottom: 0,
    color: palette.gray,
  },
  input: {
    fontSize: 14,
    textAlignVertical: 'bottom',
    fontFamily: 'NotoSansCJKkr-Regular',
    paddingBottom: 0,
    color: palette.black,
  },
});
export default BelongPage;
