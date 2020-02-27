import React, {useState, useEffect, useCallback} from 'react';
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
import {CustomTextMedium} from '~/components/common/CustomText';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from '~/components/common/ListItem';
import Moment from 'moment';

const deviceWidth = Dimensions.get('window').width;
const buttonWidth = deviceWidth * 0.9;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const pf = Platform.OS;
let global_messageList = [];
let lock = false;
const ChattingScreen = props => {
  const [receivedList, setReceivedList] = useState([]);
  const [sentList, setSentList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [tmpMessageList, setTmpMessageList] = useState([]);

  const [myId, setMyId] = useState('');

  const getUid = () => {
    return new Promise(async (resolve, reject) => {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      resolve(jUserValue);
    });
  };
  useEffect(() => {
    global_messageList.length = 0; // 배열 초기화
    getUid().then(result => {
      setMyId(result[1]);
      // console.log(myId);
      firebase
        .database()
        .ref('message/57')
        .on('child_added', result => {
          global_messageList.push(result.val());
          setMessageList(global_messageList.slice());
        });
    });
    // .then(result => {
    //   setMessageList(result);
    //   console.log(result);
    // });
    // console.log(tmpList);
  }, []);

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
    // console.log('im  in');
    // console.log(pf);
    _scrollToBottomY.current.scrollToEnd();
  };

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
            {messageList.map((item, index) => {
              let fortime = Moment(item.time).format('MM DD hh:mm');
              console.log(fortime);
              if (item.idSender == myId)
                return <SentItem text={item.message} time={fortime} />;
              else
                return (
                  <ReceivedItem
                    nickname={item.userName}
                    text={item.message}
                    time={fortime}
                  />
                );
            })}
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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
