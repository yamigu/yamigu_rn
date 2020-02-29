import React, {useState, useEffect, useCallback, useRef} from 'react';
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
let global_storage_data = [];

let lock = false;
const ChattingScreen = ({navigation}) => {
  const [messageList, setMessageList] = useState([]);
  const [myId, setMyId] = useState('');
  const [approved, setApprovoed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [roomId, setRoomId] = useState(-1);
  const [asyncData, setAsyncData] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const _scrollToBottomY = useRef();

  let keyboardPadding = 0;
  if (pf === 'ios') keyboardPadding = 100;
  else keyboardPadding = -400;

  const getUid = () => {
    return new Promise(async (resolve, reject) => {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      setUserInfo(jUserValue);
      resolve(jUserValue);
    });
  };

  const gotoBot = () => {
    setTimeout(() => {
      _scrollToBottomY.current.scrollToEnd({animated: false});
    }, 150);
  };
  const sendMessage = () => {
    if (inputMessage === '') return;
    console.log(inputMessage);
    firebase
      .database()
      .ref('message/' + roomId)
      .push({
        idSender: myId,
        message: inputMessage,
        time: Moment.now(),
      });
    setInputMessage('');
    gotoBot();
  };
  const disconnectFirebase = () => {
    firebase
      .database()
      .ref('message/' + roomId)
      //.ref('message/474')
      .off('child_added');
  };
  useEffect(() => {
    const room = navigation.getParam('roomId', -1);
    setRoomId(room);
    navigation.setParams({
      partner: navigation.getParam('partner', ''),
      approved: navigation.getParam('approved', false),
    });

    setApprovoed(navigation.getParam('approved', false));
    setPartnerInfo(navigation.getParam('partner', ''));
    global_messageList.length = 0; // 배열 초기화
    getUid().then(async result => {
      const room = navigation.getParam('roomId', -1);
      let storage = await AsyncStorage.getItem('chatStorage');
      storage = JSON.parse(storage);
      if (storage !== null) {
        setAsyncData(storage);
        if (storage['room' + room] !== undefined) {
          global_messageList = storage['room' + room].slice();
          setMessageList(storage['room' + room]);
          global_storage_data = storage['room' + room];
        }
      }

      setMyId(result[1]);
      firebase
        .database()
        .ref('message/' + room)
        //.ref('message/474')
        .on('child_added', result => {
          if (
            global_storage_data.length === 0 ||
            result.val().time >
              global_storage_data[global_storage_data.length - 1].time
          ) {
            console.log('new chat');
            global_messageList.push(result.val());
            setMessageList(global_messageList.slice());
            const temp = {...asyncData};
            temp['room' + room] = global_messageList.slice();
            setAsyncData(temp);
            AsyncStorage.setItem('chatStorage', JSON.stringify(temp));
          }
        });
    });

    return () => {
      disconnectFirebase();
    };
  }, []);
  //behavior : position ###
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          bounces="false"
          ref={_scrollToBottomY}
          onContentSizeChange={gotoBot}>
          <List style={{flex: 1}}>
            {messageList.map((item, index) => {
              let fortime =
                Moment(parseInt(item.time)).diff(Moment.now(), 'day') > 0
                  ? Moment(parseInt(item.time)).format('M월 DD일 a h:mm')
                  : Moment(parseInt(item.time)).format('a h:mm');
              if (item.idSender === myId)
                return <SentItem text={item.message} time={fortime} />;
              else
                return (
                  <ReceivedItem
                    nickname={partnerInfo.nickname}
                    text={item.message}
                    time={fortime}
                    avata={partnerInfo.avata}
                  />
                );
            })}
          </List>
        </ScrollView>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardPadding}>
        {!approved ? (
          <Button
            onPress={() => {
              setApprovoed(true);
            }}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              justifyContent: 'center',
              margin: 10,
              paddingTop: 0,
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
        ) : (
          <View style={styles.bottomChatInput}>
            <View
              style={{
                padding: 0,
                backgroundColor: 'white',
                height: 36,
                width: deviceWidth * 0.85,
              }}>
              <Input
                placeholder=" 메세지를 입력하세요."
                color="#eeeeee"
                style={styles.messageInput}
                onFocus={gotoBot}
                onTouchEnd={gotoBot}
                value={inputMessage}
                onChangeText={setInputMessage}
              />
            </View>
            <TouchableByPlatform onPress={sendMessage}>
              <Icon
                name="ios-paper-plane"
                style={{
                  color:
                    inputMessage === '' ? palette.nonselect : palette.orange,
                }}
                size={deviceWidth * 0.05}
              />
            </TouchableByPlatform>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
ChattingScreen.navigationOptions = ({navigation}) => {
  const approved = navigation.getParam('approved', false);
  return {
    headerLeft: () => (
      <HeaderBackButton
        label=" "
        tintColor={palette.black}
        onPress={() => {
          if (approved) navigation.goBack();
          else {
            Alert.alert(
              '대화 신청을 거절하시겠습니까?',
              '',
              [
                {text: '아니요', onPress: () => navigation.goBack()},
                {text: '거절하기', onPress: () => navigation.goBack()},
              ],
              '',
            );
          }
        }}
      />
    ),
    headerTitle: () => {
      return (
        <CustomTextMedium>
          {navigation.getParam('partner', '').nickname}
        </CustomTextMedium>
      );
    },
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
    backgroundColor: '#00000000',
    width: '100%',
    height: 40,
  },
  bottomChatInput: {
    paddingHorizontal: deviceWidth * 0.037,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
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
