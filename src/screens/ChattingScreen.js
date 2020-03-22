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
import MoreModal from '~/components/ChattingScreen/MoreModal';
import SentItem from '~/components/ChattingScreen/SentItem';
import ManagerItem from '~/components/ChattingScreen/ManagerItem';

import {HeaderBackButton} from 'react-navigation-stack';
import {SafeAreaView} from 'react-navigation';
import {createRef} from 'react';
import 'react-native-gesture-handler';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from '~/components/common/ListItem';
import Moment from 'moment';
import axios from 'axios';
import '~/config';
import Spinner from 'react-native-loading-spinner-overlay';

const deviceWidth = Dimensions.get('window').width;
const buttonWidth = deviceWidth * 0.9;
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const pf = Platform.OS;
let global_messageList = [];

let lock = false;
const ChattingScreen = ({navigation}) => {
  const [messageList, setMessageList] = useState([]);
  const [myId, setMyId] = useState('');
  const [approved, setApprovoed] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [roomId, setRoomId] = useState(-1);
  const [asyncData, setAsyncData] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const _scrollToBottomY = useRef();

  let keyboardPadding = 0;

  const isIphoneX = () => {
    const dim = Dimensions.get('window');

    return (
      // This has to be iOS
      Platform.OS === 'ios' &&
      // Check either, iPhone X or XR
      (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
    );
  };

  const isIPhoneXSize = dim => {
    return dim.height == 812 || dim.width == 812;
  };

  const isIPhoneXrSize = dim => {
    return dim.height == 896 || dim.width == 896;
  };

  if (pf === 'ios') {
    keyboardPadding = 50;
    if (isIphoneX()) {
      keyboardPadding = 90;
    } else {
      keyboardPadding = 65;
    }
  } else keyboardPadding = -400;

  const turnOnModal = () => {
    setModalVisible(true);
  };
  const getUid = () => {
    return new Promise(async (resolve, reject) => {
      const userValue = await AsyncStorage.getItem('userValue');
      const jUserValue = JSON.parse(userValue);
      // if (userValue[3]=== )
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
    // console.log(inputMessage);
    const key = firebase
      .database()
      .ref('message/' + roomId)
      .push().key;
    firebase
      .database()
      .ref('message/' + roomId)
      .child(key)
      .update({
        key: key,
        idSender: userInfo[global.config.user_info_const.UID],
        message: inputMessage,
        time: Moment.now(),
      });
    firebase
      .database()
      .ref('user/' + partnerInfo.uid + '/chat/' + roomId)
      .update({is_unread: true});
    axios.post(global.config.api_host + 'core/send_push/', {
      data: {
        title: userInfo[global.config.user_info_const.NICKNAME],
        content: inputMessage,
        clickAction: {
          roomId: roomId,
        },
      },
      uid: partnerInfo.uid,
    });
    setInputMessage('');
    gotoBot();
  };
  const requestApprove = () => {
    axios
      .patch(global.config.api_host + 'core/chat/', {
        room_id: roomId,
        action: 'APPROVE',
      })
      .then(() => {
        setApprovoed(true);
        navigation.setParams({
          approved: true,
        });
      });
  };
  const requestDecline = room => {
    console.log(room);
    axios
      .patch(global.config.api_host + 'core/chat/', {
        room_id: room,
        action: 'DECLINE',
      })
      .then(() => {
        navigation.goBack();
      });
  };
  const requestCancel = () => {
    setModalVisible(false);
    axios
      .patch(global.config.api_host + 'core/chat/', {
        room_id: roomId,
        action: 'CANCEL',
      })
      .then(() => {
        const key = firebase
          .database()
          .ref('message/' + roomId)
          .push().key;
        firebase
          .database()
          .ref('message/' + roomId)
          .child(key)
          .update({
            key: key,
            idSender: userInfo[global.config.user_info_const.UID],
            message: '',
            time: Moment.now(),
          });
        navigation.goBack();
      });
  };
  const requestCancelCheck = () => {
    axios
      .patch(global.config.api_host + 'core/chat/', {
        room_id: roomId,
        action: 'CANCEL_CHECK',
      })
      .then(() => {
        navigation.goBack();
      });
  };
  const disconnectFirebase = () => {
    console.log(
      firebase
        .database()
        .ref('message/' + roomId)
        .off('child_added', () => {
          console.log('what the fuck');
        }),
    );
  };
  const getStorage = async room => {
    let storage = await AsyncStorage.getItem('chatStorage');
    // console.log(storage);
    return new Promise((resolve, reject) => {
      storage = JSON.parse(storage);
      if (storage !== null) {
        if (storage['room' + room] !== undefined) {
          global_messageList = storage['room' + room].slice();
          const unique = global_messageList.filter((item, i) => {
            return (
              global_messageList.findIndex((item2, j) => {
                return item.key === item2.key;
              }) === i
            );
          });
          global_messageList = unique;
          setMessageList(unique);
          Object.keys(storage).map(item => {
            console.log(item);
          });
        }
        resolve(storage);
      }
    });
  };

  const retrieveInfo = async room => {
    const result = await axios.get(
      global.config.api_host + 'core/chat/detail/' + room + '/',
    );
    const approved_data = result.data.approved_on;
    const canceled_data = result.data.canceled_on;

    if (approved_data !== null) {
      setApprovoed(true);
      navigation.setParams({
        approved: true,
      });
    }
    if (canceled_data !== null) {
      setCancelled(true);
    }
  };
  useEffect(() => {
    console.log('useEffect of ChattingScreen');
    let focus = true;
    navigation.setParams({notiData: null, turnOnModal: turnOnModal});
    const room = navigation.getParam('roomId', -1);
    setPartnerInfo(navigation.getParam('partner', ''));
    setRoomId(room);
    retrieveInfo(room);
    navigation.setParams({
      requestDecline: () => requestDecline(room),
    });
    // setApprovoed(navigation.getParam('approved', false));
    // setCancelled(navigation.getParam('cancelled', false));
    global_messageList.length = 0; // 배열 초기화
    let listener;
    let lastMessage;
    firebase
      .database()
      .ref('message/' + room)
      .limitToLast(1)
      .once('child_added', result => {
        lastMessage = result.val();
      });
    navigation.addListener('didFocus', () => {
      getUid().then(async result => {
        const userVal = result;
        console.log(userVal[global.config.user_info_const.AVATA]);
        listener = firebase
          .database()
          .ref('message/' + room)
          .on('child_added', result => {
            if (!focus) return;

            global_messageList.push(result.val());
            if (
              lastMessage !== undefined &&
              lastMessage.time > result.val().time
            )
              return;
            if (result.val().message === '') {
              retrieveInfo(room);
            }
            const unique = global_messageList.filter((item, i) => {
              return (
                global_messageList.findIndex((item2, j) => {
                  return item.key === item2.key;
                }) === i
              );
            });

            setMessageList(unique);
            firebase
              .database()
              .ref(
                'user/' +
                  userVal[global.config.user_info_const.UID] +
                  '/chat/' +
                  room,
              )
              .update({is_unread: false});
            setLoading(false);
          });
      });

      //   const storage_result = await getStorage(room);
      //   global_storage_data = storage_result;
      //   setMyId(result[1]);
      //   listener = firebase
      //     .database()
      //     .ref('message/' + room)
      //     //.ref('message/474')
      //     .on('child_added', result => {
      //       let check_new = false;
      //       try {
      //         check_new =
      //           global_messageList.findIndex((item, index) => {
      //             return item.key === result.val().key;
      //           }) < 0 ||
      //           global_messageList.length === 0 ||
      //           result.val().time >
      //             global_messageList[global_messageList.length - 1].time;
      //       } catch {
      //         check_new = true;
      //       }
      //       if (check_new) {
      //         console.log('new chat');
      //         global_messageList.push(result.val());
      //         setMessageList(global_messageList.slice());
      //         const temp = {...global_storage_data};
      //         temp['room' + room] = global_messageList.slice();
      //         global_storage_data = {...temp};
      //       }
      //     });
    });

    return () => {
      focus = false;
      console.log('disconnect');
      disconnectFirebase();
    };
  }, []);
  //behavior : position ###
  return (
    <SafeAreaView style={styles.root}>
      <Modal
        style={{backgroundColor: palette.gold}}
        visible={modalVisible}
        transparent={true}>
        <MoreModal
          setVisible={setModalVisible}
          requestCancel={cancelled ? requestCancelCheck : requestCancel}
          cancelled={cancelled}
        />
      </Modal>
      <Spinner
        visible={loading}
        textStyle={{color: 'white'}}
        textContent={'대화 내역 불러오는중...'}
      />

      <KeyboardAvoidingView style={styles.container}>
        <ScrollView ref={_scrollToBottomY} onContentSizeChange={gotoBot}>
          {userInfo === null ? null : (
            <List style={{flex: 1}}>
              {messageList.map((item, index) => {
                let fortime =
                  Moment(parseInt(item.time)).diff(Moment.now(), 'day') > 0
                    ? Moment(parseInt(item.time)).format('M월 DD일 a h:mm')
                    : Moment(parseInt(item.time)).format('a h:mm');
                if (item.message === '') {
                  return null;
                } else if (
                  item.idSender === userInfo[global.config.user_info_const.UID]
                ) {
                  return (
                    <SentItem
                      key={index}
                      text={item.message}
                      time={fortime}
                      style={index === 0 ? {marginTop: 16} : null}
                    />
                  );
                } else if (item.idSender === '1158459711') {
                  return (
                    <View key={index}>
                      <ManagerItem text={item.message} time={fortime} />
                      <View style={styles.cancelledBoxWrapper}>
                        <View style={styles.cancelledBox}>
                          <CustomTextRegular size={12} color={palette.black}>
                            야미구님이 나갔습니다.
                          </CustomTextRegular>
                        </View>
                      </View>
                    </View>
                  );
                } else
                  return (
                    <ReceivedItem
                      key={index}
                      text={item.message}
                      time={fortime}
                      navigation={navigation}
                      partnerInfo={partnerInfo}
                      hasProfile={
                        userInfo[global.config.user_info_const.AVATA] === null
                          ? false
                          : true
                      }
                      style={index === 0 ? {marginTop: 16} : null}
                    />
                  );
              })}
            </List>
          )}
          {cancelled ? (
            <View style={styles.cancelledBoxWrapper}>
              <View style={styles.cancelledBox}>
                <CustomTextRegular size={12} color={palette.black}>
                  {partnerInfo.nickname}님이 채팅방을 나갔습니다.
                </CustomTextRegular>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardPadding}>
        {!approved ? (
          <Button
            onPress={() => {
              requestApprove();
            }}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              justifyContent: 'center',
              margin: 10,
              paddingTop: 0,
              paddingBottom: 0,
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
        ) : cancelled ? (
          <Button
            onPress={() => {
              requestCancelCheck();
            }}
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              justifyContent: 'center',
              margin: 10,
              paddingTop: 0,
              paddingBottom: 0,
              height: 40,
              width: buttonWidth,
              backgroundColor: palette.orange[0],
            }}>
            <Text
              style={{
                alignSelf: 'center',
              }}>
              대화방 나가기
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
                {
                  text: '거절하기',
                  onPress: () => navigation.getParam('requestDecline')(),
                },
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
    headerRight: () => (
      <TouchableByPlatform
        onPress={() => {
          navigation.getParam('turnOnModal')();
        }}>
        <Icon
          name="more"
          color={palette.black}
          style={{
            margin: 10,
          }}
        />
      </TouchableByPlatform>
    ),
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTitleAlign: 'center',
    drawerLockMode: 'locked-closed',
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
    paddingTop: 0,
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
  cancelledBoxWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelledBox: {
    backgroundColor: '#FFFBF8',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default ChattingScreen;
