/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Container, Content, Icon, Text, List, Button, Input} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ReceivedItem from '~/components/ChattingScreen/ReceivedItem';
import SentItem from '~/components/ChattingScreen/SentItem';
import {HeaderBackButton} from 'react-navigation-stack';
import {SafeAreaView} from 'react-navigation';
import {createRef} from 'react';
import 'react-native-gesture-handler';
import {
  CustomTextMedium,
  CustomTextBold,
  CustomTextRegular,
} from '~/components/common/CustomText';

const deviceWidth = Dimensions.get('window').width;
const buttonWidth = deviceWidth * 0.9;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const pf = Platform.OS;

const ChattingScreen = props => {
  let keyboardPadding = 0;
  if (pf === 'ios') keyboardPadding = 100;
  else keyboardPadding = -400;

  const [toggle, setToggle] = useState(0);
  const changeView = () => {
    setToggle(0);
  };
  const changeView2 = () => {
    setToggle(1);
  };
  const _scrollToBottomY = createRef();

  const gotoBot = () => {
    console.log('im  in');
    console.log(pf);
    _scrollToBottomY.current.scrollToEnd();
  };
  const [modalVisible, setModalVisible] = useState(false);

  //behavior : position ###
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={keyboardPadding}>
        <ScrollView
          bounces="false"
          ref={_scrollToBottomY}
          onContentSizeChange={() => {
            _scrollToBottomY.current.scrollToEnd();
          }}>
          <List style={{flex: 1}}>
            <ReceivedItem />
            <ReceivedItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
          </List>
          {toggle === 0 ? (
            <View style={styles.bottomButton}>
              <Button
                onPress={changeView2}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  height: 40,
                  width: buttonWidth,
                  backgroundColor: palette.orange[0],
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                  }}>
                  대화 시작하기
                </Text>
              </Button>
            </View>
          ) : (
            <View style={styles.bottomChatInput}>
              {/* <TouchableByPlatform>
                <Anticon
                  title="chattingPicture"
                  name="pluscircle"
                  style={{color: palette.gray}}
                  size={deviceWidth * 0.07}
                />
              </TouchableByPlatform> */}
              <View
                style={{
                  marginVertical: 10,
                  padding: 0,
                  backgroundColor: 'white',
                  height: 36,
                  width: deviceWidth * 0.8,
                }}>
                <Input
                  placeholder=" 메세지를 입력하세요."
                  color="#eeeeee"
                  style={styles.messageInput}
                  onFocus={() => {
                    gotoBot();
                  }}
                />
              </View>
              <TouchableByPlatform onPress={changeView}>
                <Icon
                  name="paper-plane"
                  style={{color: palette.orange}}
                  size={deviceWidth * 0.05}
                />
              </TouchableByPlatform>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
ChattingScreen.navigationOptions = ({navigation}) => {
  return {
    headerLeft: () => (
      <HeaderBackButton
        label=" "
        tintColor={palette.black}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
    headerTitle: () => <CustomTextMedium>제이름은요</CustomTextMedium>,
    headerRight: () => null,
    // <TouchableByPlatform>
    //   <Icon
    //     name="more"
    //     color={palette.black}
    //     style={{
    //       margin: 10,
    //     }}
    //   />
    // </TouchableByPlatform>
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleAlign: 'center',
  };
};
const styles = StyleSheet.create({
  root: {
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
    flex: 1,
  },
  container: {
    backgroundColor: palette.default_bg,
    flex: 1,
  },
  bottomButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: palette.default_bg,
    margin: 20,
    height: 40,
  },
  bottomChatInput: {
    paddingHorizontal: deviceWidth * 0.037,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    marginTop: 10,
  },
  rightButtonViewSecond: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  messageInput: {
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
});
export default ChattingScreen;
