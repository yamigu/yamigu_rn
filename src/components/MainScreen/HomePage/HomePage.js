/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import '~/config';
import {
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import palette from '~/lib/styles/palette';
import {
  CustomTextBold,
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import {Button, Row} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MultiSlider from './MultiSlider';
import CustomMarker from './CustomMarker';
import Moment from 'moment';
import 'moment/locale/ko';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import DeviceInfo, {useFirstInstallTime} from 'react-native-device-info';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import '~/config';
// import CustomLabel from './CustomLabel';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

let initUserValue = [
  'token',
  'uid',
  'nickname',
  'avata',
  'birthdate',
  'belong',
  'department',
  'gender',
  'verified',
  'yami',
  'location',
  'height',
];

const HomePage = ({navigation}) => {
  const [asyncValue, setAsyncValue] = useState([]);
  const [matchRequested, setMatchRequested] = useState(false);

  const [yamiNo, setYamiNo] = useState(0);
  const [freeTicket, setFreeTicket] = useState(0);
  const [notiState, setNotiState] = useState(0);

  const _retrieveData = () => {
    console.log('retrieve');
    // axios.defaults.headers.common['Authorization'] = '';
    return new Promise(async (resolve, reject) => {
      try {
        const userValue = await AsyncStorage.getItem('userValue');
        const jUserValue = JSON.parse(userValue);
        // console.log('juse::');
        // console.log(jUserValue);
        if (
          userValue !== null &&
          userValue[global.config.user_info_const.NICKNAME] !== 'nickname' &&
          userValue[global.config.user_info_const.NICKNAME] !== '' &&
          userValue[global.config.user_info_const.NICKNAME] !== null
        ) {
          console.log('uservalue not null');
          if (jUserValue[0] === 'token') {
            console.log('token not set yet.');
            resolve(false);
          } else {
            console.log('token is set' + jUserValue[0]);
            axios.defaults.headers.common['Authorization'] =
              'Token ' + jUserValue[0];
            axios
              .get(global.config.api_host + 'authorization/user/info/')
              .then(result => {
                // console.log(result.status);
                console.log('Successfully get user info, set UserInfo');
                jUserValue[global.config.user_info_const.UID] = result.data.uid;
                jUserValue[global.config.user_info_const.NICKNAME] =
                  result.data.nickname;
                jUserValue[global.config.user_info_const.AVATA] =
                  result.data.avata;

                jUserValue[global.config.user_info_const.BIRTHDATE] =
                  result.data.birthdate;
                jUserValue[global.config.user_info_const.BELONG] =
                  result.data.belong;
                jUserValue[global.config.user_info_const.DEPARTMENT] =
                  result.data.department;
                jUserValue[global.config.user_info_const.GENDER] =
                  result.data.gender;
                jUserValue[global.config.user_info_const.VERIFIED] =
                  result.data.verified;
                console.log(result.data);
                setNotiState(0);
                if (result.data.verified === 0) {
                  setNotiState(1);
                } else if (result.data.avata === null) {
                  setNotiState(2);
                } else if (result.data.friends.length === 0) {
                  setNotiState(3);
                }
                jUserValue[10] = result.data.location;
                jUserValue[11] = result.data.height;

                AsyncStorage.setItem('userValue', JSON.stringify(jUserValue));
                setAsyncValue(jUserValue);
              })
              .then(() => {
                console.log('Get num of available yami');
                axios
                  .get(global.config.api_host + 'authorization/user/yami/')
                  .then(result => {
                    jUserValue[global.config.user_info_const.YAMI] =
                      result.data;
                    AsyncStorage.setItem(
                      'userValue',
                      JSON.stringify(jUserValue),
                    );
                    setYamiNo(result.data);
                    setAsyncValue(jUserValue);
                    console.log('available yami: ' + result.data);
                  });
              })
              .then(() => {
                axios
                  .get(global.config.api_host + 'authorization/user/free/')
                  .then(result => {
                    jUserValue[global.config.user_info_const.FREE] =
                      result.data;
                    AsyncStorage.setItem(
                      'userValue',
                      JSON.stringify(jUserValue),
                    );
                    setAsyncValue(jUserValue);
                    setFreeTicket(result.data);
                    console.log('available free: ' + result.data);
                  });
                resolve(true);
              })
              .catch(e => {
                console.log(e);
                if (e.response.status === 401) {
                  AsyncStorage.setItem(
                    'userValue',
                    JSON.stringify(initUserValue),
                  );
                }
                resolve(false);
              });
          }
        } else {
          AsyncStorage.setItem('userValue', JSON.stringify(initUserValue));
          setAsyncValue(jUserValue);
          resolve(false);
          // console.log('first user, async init');
        }
      } catch (error) {
        console.log(error);
        resolve(false);
      }
    });
  };

  useEffect(() => {
    const today = new Date();
    setNowTime(today);

    const wow = [
      Moment(today)
        .add(1, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(2, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(3, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(4, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(5, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(6, 'days')
        .format('MM/DD (ddd)'),
      Moment(today)
        .add(7, 'days')
        .format('MM/DD (ddd)'),
      '금요일',
      '토요일',
    ];
    setDateList(wow);

    const listener = navigation.addListener(
      'didFocus',
      async () => {
        setMatchRequested(false);
        console.log('get user info');
        const result = await _retrieveData();
        console.log('done');

        console.log('get match request status');
        const result6 = await retrieveMatchRequestStatus();

        if (!result) return;
        console.log('get fcm token');
        const result2 = await retrieveFCMToken();
        console.log('done');

        console.log('check fcm device');
        const result3 = await checkFCMDevice(result2);
        console.log('done');

        if (result3 === true) {
          console.log('register fcm device');
          const result4 = await registerFCMDevice(result2);
          console.log('done');
        }
        console.log('get firebase token');
        const result5 = await retrieveFirebaseToken();
        console.log('done');

        console.log('done');
        navigation.setParams({});
      },
      // run function that updates the data on entering the screen
    );
    const retrieveFCMToken = async () => {
      const fcm_token = await firebase.messaging().getToken();
      const device_id = DeviceInfo.getUniqueId();

      return new Promise((resolve, reject) =>
        resolve({
          type: Platform.OS,
          registration_id: fcm_token,
          device_id: device_id,
        }),
      );
    };
    const checkFCMDevice = data => {
      return new Promise((resolve, reject) => {
        const url = global.config.api_host + 'authorization/fcm/check_device/';
        axios
          .post(url, data)
          .then(check_device => {
            console.log(check_device.status);
            if (check_device.status === 200) {
              resolve(false);
            } else if (check_device.status === 204) {
              resolve(true);
            }
          })
          .catch(error => {
            console.log(error);
            resolve(true);
          });
      });
    };
    const registerFCMDevice = data => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            global.config.api_host + 'authorization/fcm/register_device/',
            data,
          )
          .then(register => {
            console.log(register.data);
            resolve(true);
          });
      });
    };
    const retrieveFirebaseToken = () => {
      return new Promise((resolve, reject) => {
        axios
          .get(global.config.api_host + 'authorization/firebase/token/')
          .then(result => {
            return result.data;
          })
          .catch(error => console.log(error))
          .then(token => {
            firebase.auth().signInWithCustomToken(token);
            resolve(true);
          });
      });
    };
    const retrieveMatchRequestStatus = () => {
      return new Promise((resolve, reject) => {
        axios
          .get(global.config.api_host + 'core/match_request/')
          .then(result => {
            // console.log('homepage useEffect match_request');
            // console.log(result.data);
            if (result.data === 'no match request') {
              setMatchRequested(false);
              // console.log('hehe');
            } else {
              setMatchRequested(true);
              // console.log(result.data);

              // result.data.personnel_select 처리 후 memberSelected에 넣기, memberText설정
              let tmpMemInt = result.data.personnel_selected;
              let tmpMemSelected = [false, false, false, false];
              for (let i = 0; i < 4; i++) {
                tmpMemSelected[i] = Math.floor(tmpMemInt % 2);
                tmpMemInt /= 2;
              }
              setMemberMainSelected(tmpMemSelected[0]);
              setMemberSelected(tmpMemSelected.slice(1, 3));
              // console.log(tmpMemSelected);
              // setText when ongoing
              let tmpMemText = '';
              if (
                tmpMemSelected[0] === 1 ||
                result.data.personnel_selected === 0
              )
                tmpMemText = '인원 상관 없음  ';
              else {
                tmpMemSelected.map((item, index) => {
                  if (tmpMemSelected[index] === 1) {
                    tmpMemText = tmpMemText + memberList[index - 1] + ', ';
                  }
                  console.log(memberList);
                });
                tmpMemText = tmpMemText.substring(0, tmpMemText.length - 2);
                if (tmpMemText.length > 20) {
                  tmpMemText = tmpMemText.substring(0, 20);
                  tmpMemText = tmpMemText + ' ...';
                }
              }
              setOnMemText(tmpMemText);
              // console.log(tmpMemText);

              // result.data.date_select 처리 후 memberSelected에 넣기, dateText설정
              let tmpDateInt = result.data.date_selected;
              let tmpDateSelected = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              // console.log(tmpDateInt);
              for (let i = 0; i < 9; i++) {
                tmpDateSelected[i] = Math.floor(tmpDateInt % 2);
                tmpDateInt /= 2;
              }
              setDateMainSelected(tmpDateSelected[0]);
              setDateSelected(tmpDateSelected.slice(1, 8));
              // console.log(tmpDateSelected);
              //setText when ongoing
              let tmpDateText = '';
              if (tmpDateSelected[0] === 1 || result.data.date_selected === 0)
                tmpDateText = '날짜 상관 없음  ';
              else {
                tmpDateSelected.map((item, index) => {
                  if (tmpDateSelected[index] === 1) {
                    tmpDateText = tmpDateText + wow[index - 1] + ', ';
                  }
                  // console.log(dateList);
                });
                tmpDateText = tmpDateText.substring(0, tmpDateText.length - 2);
                if (tmpDateText.length > 20) {
                  tmpDateText = tmpDateText.substring(0, 20);
                  tmpDateText = tmpDateText + ' ...';
                }
              }
              setOnDateText(tmpDateText);
              // console.log(tmpDateText);

              // result.date.max,min처리
              let tmpAge = [result.data.min_age, result.data.max_age];
              setMultiSliderValue(tmpAge);
            }
            resolve(result.data);
          });
      });
    };
    return () => listener.remove();
  }, []);
  const requestMatching = async () => {
    console.log('***jsuer');
    const userValue = await AsyncStorage.getItem('userValue');
    const jUserValue = JSON.parse(userValue);
    // console.log(jUserValue);

    // 'token',     'uid',        'nickname',   'avata',
    // 'birhdate',  'belong',     'department', 'profile_list',
    // 'feed_list', 'friend_list','yami_number',
    if (jUserValue[0] === 'token') {
      navigation.navigate('Login');
    } else if (jUserValue[2] === 'nickname') {
      navigation.navigate('Signup');
      //navigate to loginscreen
    } else if (jUserValue[4] === 'birthdate') {
      navigation.navigate('IV', {needBtn: true});
    } else {
      if (matchRequested === true) {
        Alert.alert(
          '미팅 주선을 취소하시겠어요?',
          '',
          [
            {
              text: '네',
              onPress: () => {
                // console.log('came true');
                logCallback('match request', setLoginLoading(false));
                setMatchRequested(false);

                setMemberItemNo(0);
                setMemberMainSelected(true);
                let tmselected = [false, false, false];
                setMemberSelected(tmselected);

                setDateItemNo(0);
                setDateMainSelected(true);
                let tdselected = [
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                  false,
                ];
                setDateSelected(tdselected);

                //이미 매칭중인데 누르면 취소니까
                axios
                  .patch(global.config.api_host + 'core/match_request/')
                  .then(result => {
                    setLoginLoading(false);
                    setFreeTicket(result.data.free);
                    setYamiNo(result.data.yami);
                    let tmp = asyncValue.slice();
                    tmp[global.config.user_info_const.YAMI] = result.data.yami;
                    tmp[global.config.user_info_const.FREE] = result.data.free;
                    AsyncStorage.setItem('userValue', JSON.stringify(tmp));
                    setAsyncValue(tmp);
                  })
                  .then(() => {
                    console.log('cancleed');
                  });
              },
            },
            {
              text: '아니오',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      } else {
        if (freeTicket < 1) {
          if (yamiNo < 2) {
            Alert.alert(
              '야미가 부족합니다!',
              '스토어에서 야미를 구입하시겠어요?',
              [
                {text: '취소'},
                {
                  text: '스토어가기',
                  onPress: () => navigation.navigate('Store'),
                },
              ],
              '',
            );
          } else {
            let count = yamiNo - 2;
            setYamiNo(count);

            console.log('야미 감소시키는 post');
            let tmpMemText = '';
            let memInt = 0;
            if (memberMainSelected === true) {
              tmpMemText = '인원 상관 없음  ';
              memInt = 0;
            } else {
              memberSelected.map((item, index) => {
                if (item === true) {
                  memInt += Math.pow(2, index + 1);
                  tmpMemText = tmpMemText + memberList[index] + ', ';
                }
              });
            }
            tmpMemText = tmpMemText.substring(0, tmpMemText.length - 2);
            if (tmpMemText.length > 20) {
              tmpMemText = tmpMemText.substring(0, 20);
              tmpMemText = tmpMemText + ' ...';
            }
            setOnMemText(tmpMemText);

            let dateInt = 0;
            let tmpDateText = '';
            if (dateMainSelected === true) {
              tmpDateText = '날짜 상관 없음  ';
              dateInt = 0;
            } else {
              dateSelected.map((item, index) => {
                if (item === true) {
                  dateInt += Math.pow(2, index + 1);
                  tmpDateText = tmpDateText + dateList[index] + ', ';
                }
              });
            }
            tmpDateText = tmpDateText.substring(0, tmpDateText.length - 2);
            if (tmpDateText.length > 20) {
              tmpDateText = tmpDateText.substring(0, 20);
              tmpDateText = tmpDateText + ' ...';
            }
            setOnDateText(tmpDateText);

            let min_age = multiSliderValue[0];
            let max_age = multiSliderValue[1];
            // console.log(memInt);
            axios
              .post(global.config.api_host + 'core/match_request/', {
                personnel_selected: memInt,
                date_selected: dateInt,
                min_age: min_age,
                max_age: max_age,
              })
              .then(result => {
                setFreeTicket(result.data.free);
                setYamiNo(result.data.yami);
                let tmp = asyncValue.slice();
                tmp[global.config.user_info_const.YAMI] = result.data.yami;
                tmp[global.config.user_info_const.FREE] = result.data.free;
                AsyncStorage.setItem('userValue', JSON.stringify(tmp));
                setAsyncValue(tmp);

                console.log(memInt + ' ' + dateInt);
                console.log(result.data);
              })
              .catch(e => {
                console.log(e);
                if (e.response.status === 401) {
                  AsyncStorage.setItem(
                    'userValue',
                    JSON.stringify(initUserValue),
                  );
                }
              })
              .then(() =>
                setTimeout(() => {
                  let count = freeTicket - 1;
                  setFreeTicket(count);
                  setLoginLoading(false);
                  setMatchRequested(!matchRequested);
                  console.log('here');
                }, 500),
              );
          }
        } else {
          setLoginLoading(true);

          console.log('sending?');
          //아직 매칭 안한거고, 이제 보내야지
          //날짜, 멤버, 나이 계산해서 아래 형식에 맞게 넣어주기

          let tmpMemText = '';
          let memInt = 0;
          if (memberMainSelected === true) {
            tmpMemText = '인원 상관 없음  ';
            memInt = 0;
          } else {
            memberSelected.map((item, index) => {
              if (item === true) {
                memInt += Math.pow(2, index + 1);
                tmpMemText = tmpMemText + memberList[index] + ', ';
              }
            });
          }
          tmpMemText = tmpMemText.substring(0, tmpMemText.length - 2);
          if (tmpMemText.length > 20) {
            tmpMemText = tmpMemText.substring(0, 20);
            tmpMemText = tmpMemText + ' ...';
          }
          setOnMemText(tmpMemText);

          let dateInt = 0;
          let tmpDateText = '';
          if (dateMainSelected === true) {
            tmpDateText = '날짜 상관 없음  ';
            dateInt = 0;
          } else {
            dateSelected.map((item, index) => {
              if (item === true) {
                dateInt += Math.pow(2, index + 1);
                tmpDateText = tmpDateText + dateList[index] + ', ';
              }
            });
          }
          tmpDateText = tmpDateText.substring(0, tmpDateText.length - 2);
          if (tmpDateText.length > 20) {
            tmpDateText = tmpDateText.substring(0, 20);
            tmpDateText = tmpDateText + ' ...';
          }
          setOnDateText(tmpDateText);

          let min_age = multiSliderValue[0];
          let max_age = multiSliderValue[1];
          // console.log(memInt);
          axios
            .post(global.config.api_host + 'core/match_request/', {
              personnel_selected: memInt,
              date_selected: dateInt,
              min_age: min_age,
              max_age: max_age,
            })
            .then(result => {
              console.log(result.data);
              setFreeTicket(result.data.free);
              setYamiNo(result.data.yami);
              console.log('befor');
              let tmp = asyncValue.slice();
              tmp[global.config.user_info_const.YAMI] = result.data.yami;
              tmp[global.config.user_info_const.FREE] = result.data.free;
              AsyncStorage.setItem('userValue', JSON.stringify(tmp));
              setAsyncValue(tmp);
              console.log(memInt + ' ' + dateInt);
              console.log(result.data);
            })
            .catch(e => {
              if (e.response.status === 401) {
                AsyncStorage.setItem(
                  'userValue',
                  JSON.stringify(initUserValue),
                );
              }
            })
            .then(() =>
              setTimeout(() => {
                let count = freeTicket - 1;
                setFreeTicket(count);
                setLoginLoading(false);
                setMatchRequested(!matchRequested);
                console.log('here');
              }, 500),
            );
        }
      }
    }
  };

  let spinValue = new Animated.Value(0);
  // First set up animation

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }),
  ).start();
  // Second interpolate beginning and end values (in this case 0 and 1)
  let spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const [loginLoading, setLoginLoading] = useState(false);

  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);

  const memberList = ['2:2 미팅', '3:3 미팅', '4:4 미팅'];
  const [memberMainSelected, setMemberMainSelected] = useState(true);
  const [memberText, setMemberText] = useState('');
  const [onMemText, setOnMemText] = useState('');
  const [memberItemNo, setMemberItemNo] = useState(0);
  const [memberSelected, setMemberSelected] = useState([false, false, false]);

  const [nowTime, setNowTime] = useState();

  const [dateList, setDateList] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [dateMainSelected, setDateMainSelected] = useState(true);
  const [dateText, setDateText] = useState('');
  const [onDateText, setOnDateText] = useState('');
  const [dateItemNo, setDateItemNo] = useState(0);
  const [dateSelected, setDateSelected] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [sliderOneChanging, setSliderOneChanging] = useState(false);
  const [multiSliderValue, setMultiSliderValue] = useState([20, 30]);
  const [
    nonCollidingMultiSliderValue,
    setNonCollidingMultiSliderValue,
  ] = useState([20, 30]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  let sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

  let multiSliderValuesChange = values => {
    if (values[0] + 3 > values[1]) {
      console.log('too small');
    }
    setMultiSliderValue(values);
  };
  let nonCollidingMultiSliderValuesChange = values => {
    setNonCollidingMultiSliderValue(values);
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Spinner
          visible={loginLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <Modal
          animationType="none"
          transparent={true}
          visible={memberModalVisible}
          onRequestClose={() => {
            let tmpText = '';
            memberSelected.map((item, index) => {
              if (memberSelected[index] === true) {
                tmpText = tmpText + memberList[index] + ', ';
              }
            });
            tmpText = tmpText.substring(0, tmpText.length - 2);
            if (tmpText.length > 20) {
              tmpText = tmpText.substring(0, 20);
              tmpText = tmpText + ' ...';
            }
            setMemberText(tmpText);
            setMemberModalVisible(false);
          }}>
          <SafeAreaProvider>
            <TouchableWithoutFeedback
              onPress={() => {
                setMemberModalVisible(false);
                let tmpText = '';
                memberSelected.map((item, index) => {
                  if (memberSelected[index] === true) {
                    tmpText = tmpText + memberList[index] + ', ';
                  }
                });
                tmpText = tmpText.substring(0, tmpText.length - 2);
                if (tmpText.length > 20) {
                  tmpText = tmpText.substring(0, 20);
                  tmpText = tmpText + ' ...';
                }
                setMemberText(tmpText);
                console.log('aa');
              }}>
              <View
                style={{
                  height: dh - 220,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
            </TouchableWithoutFeedback>

            {/* <View
          style={{
            height: 200,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}> */}
            <View
              style={{
                height: 220,
                width: dw,
                backgroundColor: 'white',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingRight: 12,
                paddingLeft: 12,
              }}>
              <View name="팀소개div" style={styles.grayBox}>
                <View style={{flexDirection: 'row'}}>
                  <CustomTextRegular size={13} color="#505050">
                    인원 선택
                  </CustomTextRegular>
                  <CustomTextRegular
                    style={{paddingLeft: 12}}
                    size={12}
                    color="#B1B1B1">
                    (복수 선택 가능)
                  </CustomTextRegular>
                </View>
                <Button
                  transparent={true}
                  style={styles.completeBtn}
                  onPress={() => {
                    console.log('완료눌림');
                    setMemberModalVisible(false);
                    let tmpText = '';
                    memberSelected.map((item, index) => {
                      if (memberSelected[index] === true) {
                        tmpText = tmpText + memberList[index] + ', ';
                      }
                    });
                    tmpText = tmpText.substring(0, tmpText.length - 2);
                    if (tmpText.length > 20) {
                      tmpText = tmpText.substring(0, 20);
                      tmpText = tmpText + ' ...';
                    }
                    setMemberText(tmpText);
                  }}>
                  <CustomTextMedium
                    style={{paddingTop: 0, paddingBottom: 0}}
                    color={palette.orange}
                    size={13}>
                    완료
                  </CustomTextMedium>
                </Button>
              </View>

              <View name="택list" style={styles.itemList}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}></View>
                <Button
                  onPress={() => {
                    {
                      if (memberMainSelected === false) {
                        setMemberMainSelected(!memberMainSelected);
                        setMemberItemNo(0);
                        setMemberSelected([false, false, false]);
                      } else {
                        console.log('인원상관없음 눌림');
                      }
                    }
                  }}
                  style={
                    memberMainSelected === true
                      ? styles.memberMainBtnSelected
                      : styles.memberMainBtnUnselected
                  }>
                  <CustomTextRegular
                    size={12}
                    color={
                      memberMainSelected === true
                        ? palette.orange
                        : palette.nonselect
                    }>
                    인원 상관 없음
                  </CustomTextRegular>
                </Button>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {memberList.map((item, index) => {
                    return (
                      <Button
                        onPress={() => {
                          console.log('pressed');
                          let tmpNo = memberItemNo;
                          let tmp;
                          if (memberSelected[index] === false) {
                            setMemberItemNo(tmpNo + 1);
                            if (tmpNo + 1 === 1) {
                              setMemberMainSelected(false);
                            }
                          } else {
                            setMemberItemNo(tmpNo - 1);
                            if (tmpNo - 1 === 0) {
                              setMemberMainSelected(true);
                            }
                          }
                          tmp = memberSelected.slice();
                          tmp[index] = !memberSelected[index];
                          setMemberSelected(tmp);
                        }}
                        style={
                          memberSelected[index] === true
                            ? styles.memeberListBtnSelected
                            : styles.memeberListBtnUnselected
                        }>
                        <CustomTextRegular
                          size={12}
                          color={
                            memberSelected[index] === true
                              ? palette.orange
                              : palette.nonselect
                          }>
                          {item}
                        </CustomTextRegular>
                      </Button>
                    );
                  })}
                </View>
                <CustomTextRegular
                  color="#B9B9B9"
                  size={12}
                  style={{marginLeft: 6, marginTop: 10}}>
                  *함께 미팅할 친구들은 직접 구해야해요!
                </CustomTextRegular>
              </View>
            </View>
          </SafeAreaProvider>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={dateModalVisible}
          onRequestClose={() => {
            let tmpText = '';
            dateSelected.map((item, index) => {
              if (memberSelected[index] === true) {
                tmpText = tmpText + dateList[index] + ', ';
              }
            });
            tmpText = tmpText.substring(0, tmpText.length - 2);
            if (tmpText.length > 20) {
              tmpText = tmpText.substring(0, 20);
              tmpText = tmpText + ' ...';
            }
            setDateText(tmpText);
            setDateModalVisible(false);
          }}>
          <SafeAreaProvider>
            <TouchableWithoutFeedback
              onPress={() => {
                setDateModalVisible(false);
                let tmpText = '';
                dateSelected.map((item, index) => {
                  if (dateSelected[index] === true) {
                    tmpText = tmpText + dateList[index] + ', ';
                  }
                });
                tmpText = tmpText.substring(0, tmpText.length - 2);
                if (tmpText.length > 20) {
                  tmpText = tmpText.substring(0, 20);
                  tmpText = tmpText + ' ...';
                }

                setDateText(tmpText);
                console.log('aa');
              }}>
              <View
                style={{
                  height: dh - 330,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                height: 330,
                backgroundColor: 'rgba(0,0,0,0.7)',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  height: 330,
                  width: dw,
                  backgroundColor: 'white',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingRight: 12,
                  paddingLeft: 12,
                }}>
                <View name="팀소개div" style={styles.grayBox}>
                  <View style={{flexDirection: 'row'}}>
                    <CustomTextRegular size={13} color="#505050">
                      날짜 선택
                    </CustomTextRegular>
                    <CustomTextRegular
                      style={{paddingLeft: 12}}
                      size={12}
                      color="#B1B1B1">
                      (복수 선택 가능)
                    </CustomTextRegular>
                  </View>
                  <Button
                    style={styles.completeBtn}
                    onPress={() => {
                      setDateModalVisible(false);
                      let tmpText = '';
                      dateSelected.map((item, index) => {
                        if (dateSelected[index] === true) {
                          tmpText = tmpText + dateList[index] + ', ';
                        }
                      });
                      tmpText = tmpText.substring(0, tmpText.length - 2);
                      if (tmpText.length > 20) {
                        tmpText = tmpText.substring(0, 20);
                        tmpText = tmpText + ' ...';
                      }
                      setDateText(tmpText);
                    }}>
                    <CustomTextMedium
                      style={{paddingTop: 0, paddingBottom: 0}}
                      color={palette.orange}
                      size={13}>
                      완료
                    </CustomTextMedium>
                  </Button>
                </View>

                <View name="인원선택list" style={styles.itemList}>
                  <Button
                    onPress={() => {
                      {
                        if (dateMainSelected === false) {
                          setDateMainSelected(!dateMainSelected);
                          setDateItemNo(0);
                          setDateSelected([
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                          ]);
                        } else null;
                      }
                    }}
                    style={
                      dateMainSelected === true
                        ? styles.dateMainBtnSelected
                        : styles.dateMainBtnUnselected
                    }>
                    <CustomTextRegular
                      style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        backgroundColor: 'white',
                      }}
                      size={12}
                      color={
                        dateMainSelected === true
                          ? palette.orange
                          : palette.nonselect
                      }>
                      날짜 상관 없음
                    </CustomTextRegular>
                  </Button>

                  <View
                    style={{
                      backgroundColor: 'white',
                      // backgroundColor: palette.gold,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    {dateList.map((item, index) => {
                      return (
                        <Button
                          onPress={() => {
                            let tmpNo = dateItemNo;
                            let tmp;
                            console.log(dateItemNo);
                            console.log(tmpNo);
                            if (dateSelected[index] === false) {
                              setDateItemNo(tmpNo + 1);
                              if (tmpNo + 1 === 1) {
                                setDateMainSelected(false);
                              }
                            } else {
                              setDateItemNo(tmpNo - 1);
                              if (tmpNo - 1 === 0) {
                                setDateMainSelected(true);
                              }
                            }
                            tmp = dateSelected.slice();
                            tmp[index] = !dateSelected[index];
                            setDateSelected(tmp);
                          }}
                          style={
                            dateSelected[index] === true
                              ? styles.dateListBtnSelected
                              : styles.dateListBtnUnselected
                          }>
                          <CustomTextRegular
                            size={12}
                            color={
                              dateSelected[index] === true
                                ? palette.orange
                                : palette.nonselect
                            }>
                            {item}
                          </CustomTextRegular>
                        </Button>
                      );
                    })}
                  </View>
                  <CustomTextRegular
                    color="#B9B9B9"
                    size={12}
                    style={{marginLeft: 6, marginTop: 10}}>
                    *같은 날짜를 선택한 이성을 주선해주니 신중하게 선택하세요!
                  </CustomTextRegular>
                </View>
              </View>
            </View>
          </SafeAreaProvider>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={ageModalVisible}
          onRequestClose={() => {
            setAgeModalVisible(false);
          }}>
          <SafeAreaProvider>
            <TouchableWithoutFeedback
              onPress={() => {
                setAgeModalVisible(false);
                console.log('aa');
              }}>
              <View
                style={{
                  height: dh - 165,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                height: 165,
                backgroundColor: 'rgba(0,0,0,0.7)',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  height: 165,
                  width: dw,
                  backgroundColor: 'white',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  paddingRight: 12,
                  paddingLeft: 12,
                }}>
                <View name="나이설정div" style={styles.grayBox}>
                  <View style={{flexDirection: 'row'}}>
                    <CustomTextRegular size={13} color="#505050">
                      선호 나이 선택
                    </CustomTextRegular>
                  </View>
                  <Button
                    style={styles.completeBtn}
                    onPress={() => {
                      setAgeModalVisible(false);
                    }}>
                    <CustomTextMedium
                      style={{paddingTop: 0, paddingBottom: 0}}
                      color={palette.orange}
                      size={13}>
                      완료
                    </CustomTextMedium>
                  </Button>
                </View>

                <View style={styles.container}>
                  <MultiSlider
                    selectedStyle={{
                      backgroundColor: palette.orange,
                    }}
                    unselectedStyle={{
                      backgroundColor: 'silver',
                    }}
                    containerStyle={{
                      height: 40,
                    }}
                    trackStyle={{
                      height: 1,
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={dw * 0.8}
                    onValuesChange={multiSliderValuesChange}
                    min={20}
                    max={30}
                    step={1}
                    // allowOverlap
                    snapped
                    // customLabel={CustomLabel}
                    customMarker={CustomMarker}
                    onValuesChangeStart={sliderOneValuesChangeStart}
                    onValuesChangeFinish={sliderOneValuesChangeFinish}
                  />
                  <View style={styles.text}>
                    <CustomTextMedium
                      size={12}
                      style={{marginTop: 0, paddingTop: 0}}>
                      {' ' + multiSliderValue[0]}
                    </CustomTextMedium>
                    <CustomTextMedium size={12}>
                      {multiSliderValue[1] === 30
                        ? '30+'
                        : multiSliderValue[1] + ' '}
                    </CustomTextMedium>
                  </View>
                </View>

                {/* end of age module  */}
              </View>
            </View>
          </SafeAreaProvider>
        </Modal>
        {notiState === 0 ? null : (
          <Button
            onPress={() => {
              if (notiState === 1) {
                navigation.navigate('BV');
              } else if (notiState === 2) {
                navigation.navigate('MyProfile');
              } else if (notiState === 3) {
                navigation.navigate('AddFriends');
              }
            }}
            style={{
              backgroundColor: '#FFF6EF',
              width: dw,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Foundation
                name="flag"
                size={20}
                style={{marginLeft: 10, marginTop: 2}}></Foundation>
              <CustomTextMedium
                size={14}
                color={palette.black}
                style={{paddingLeft: 10}}>
                {notiState === 1
                  ? ' 채팅하려면 소속인증이 필요해요! '
                  : notiState === 2
                  ? '프로필 사진을 등록하고 친구를 찾아보세요!'
                  : notiState === 3
                  ? '친구를 추가하고 보너스 야미 받아가세요!'
                  : null}
              </CustomTextMedium>
            </View>
            <AntIcon name="right" style={{paddingRight: 15}} size={24} />
          </Button>
        )}
        <View style={styles.topLayout}>
          {/* <CustomTextBold>{asyncValue[1]}</CustomTextBold> */}
          <CustomTextBold size={24} color={palette.black}>
            {matchRequested === true ? '미팅 주선 중' : '미팅 주선'}
          </CustomTextBold>

          {matchRequested === true ? (
            <Animated.Image
              style={{
                transform: [{rotate: spin}],
                marginTop: 20,
                width: 24,
                height: 30,
              }}
              source={require('~/images/rotation_icon.png')}
            />
          ) : (
            <CustomTextRegular size={16} color="#646363">
              미팅하고 싶은 날, 미팅 하면 돼
            </CustomTextRegular>
          )}
        </View>

        <View style={styles.bottomLayout}>
          <View
            style={{
              width: dw * 0.9,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomTextRegular>미팅 설정</CustomTextRegular>
            <Button
              onPress={() => {
                navigation.navigate('HomeGuideScreen');
                console.log('home guide button pressed');
              }}
              style={{
                borderRadius: 15,
                backgroundColor: palette.default_bg,
                width: 65,
                elevation: 0,
                height: 30,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: palette.orange,
                borderWidth: 1,
                paddingTop: 0,
                paddingBottom: 0,
              }}>
              <CustomTextMedium color={palette.orange} size={12}>
                이용 안내
              </CustomTextMedium>
            </Button>
          </View>

          <View style={styles.mainCondition}>
            <CustomTextBold
              size={14}
              color={palette.gray}
              style={{
                paddingLeft: 6,
                paddingTop: 0.5,
              }}>
              인원
            </CustomTextBold>
            <TouchableByPlatform
              style={styles.touch}
              onPress={() => {
                {
                  if (matchRequested === true) {
                    Alert.alert(
                      '이미 주선이 진행중입니다! 변경을 원하시면 현재 조건의 주선을 취소해주세요!',
                    );
                  } else {
                    setMemberModalVisible(true);
                    setMemberText('선택중 ...');
                    console.log('onpress');
                  }
                }
              }}>
              <CustomTextMedium
                size={14}
                color={palette.black}
                style={{paddingtop: 0}}>
                {matchRequested === true
                  ? onMemText
                  : memberMainSelected === true
                  ? '인원 상관 없음'
                  : memberText}
              </CustomTextMedium>

              <AntDesignIcon name="caretdown" size={12} color={palette.black} />
            </TouchableByPlatform>
          </View>

          <View style={styles.mainCondition}>
            <CustomTextBold
              size={14}
              color={palette.gray}
              style={{paddingLeft: 6, paddingTop: 0.5}}>
              날짜
            </CustomTextBold>
            <TouchableByPlatform
              style={styles.touch}
              onPress={() => {
                {
                  if (matchRequested === true) {
                    Alert.alert(
                      '이미 주선이 진행중입니다! 변경을 원하시면 현재 조건의 주선을 취소해주세요!',
                    );
                  } else {
                    setDateModalVisible(true);
                    setDateText('선택중 ...');
                    console.log('onpress');
                  }
                }
              }}>
              <CustomTextMedium size={14} color={palette.black}>
                {matchRequested === true
                  ? onDateText
                  : dateMainSelected === true
                  ? '날짜 상관 없음'
                  : dateText}
              </CustomTextMedium>

              <AntDesignIcon name="caretdown" size={12} color={palette.black} />
            </TouchableByPlatform>
          </View>

          <View style={styles.mainCondition}>
            <CustomTextBold
              size={14}
              color={palette.gray}
              style={{paddingLeft: 6, paddingTop: 0.5}}>
              선호 나이
            </CustomTextBold>
            <TouchableByPlatform
              style={styles.touch}
              onPress={() => {
                {
                  if (matchRequested === true) {
                    Alert.alert(
                      '이미 주선이 진행중입니다! 변경을 원하시면 현재 조건의 주선을 취소해주세요!',
                    );
                  } else {
                    setAgeModalVisible(true);
                    console.log('onpress');
                  }
                }
              }}>
              <CustomTextMedium size={14} color={palette.black}>
                {multiSliderValue[0] + ' ~ '}
                {multiSliderValue[1] === 30 ? '30+' : multiSliderValue[1]}
              </CustomTextMedium>
              <AntDesignIcon name="caretdown" size={12} color={palette.black} />
            </TouchableByPlatform>
          </View>
          <View style={styles.gradientLayoutWrapper}>
            <LinearGradient
              colors={['#FFA022', '#FF6C2B']}
              style={styles.gradientLayout}>
              {matchRequested === false ? (
                <TouchableByPlatform
                  style={styles.mainBtn}
                  onPress={() => requestMatching()}>
                  <CustomTextMedium size={16} color="white">
                    미팅 주선 신청하기
                  </CustomTextMedium>

                  {freeTicket > 0 ? (
                    <CustomTextMedium size={16} color="white">
                      무료
                    </CustomTextMedium>
                  ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('~/images/yami_icon_white.png')}
                        style={{width: 20, height: 24}}
                      />
                      <CustomTextMedium color="white" size={16}>
                        {'   '}2
                      </CustomTextMedium>
                    </View>
                  )}
                </TouchableByPlatform>
              ) : (
                <TouchableByPlatform
                  style={styles.mainBtnCancel}
                  onPress={() => requestMatching()}>
                  <CustomTextMedium size={16} color="white">
                    미팅 주선 취소 하기
                  </CustomTextMedium>
                </TouchableByPlatform>
              )}
            </LinearGradient>
          </View>
          <CustomTextRegular size={12} color="#646363" style={{marginTop: 5}}>
            {freeTicket > 0
              ? '무료 미팅 횟수: ' + freeTicket + '회'
              : '무료 미팅 주선은 매주 월요일에 리셋됩니다.'}
          </CustomTextRegular>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    // flex: 1,
    width: dw,
    // backgroundColor: palette.default_bg,
    // backgroundColor: palette.gold,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topLayout: {
    width: dw,
    height: dh * 0.3,
    // backgroundColor: palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLayout: {
    width: dw,
    // marginBottom: 75,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradientLayoutWrapper: {
    borderRadius: 10,
    width: dw * 0.9,
    height: 56,
    marginTop: 20,
    overflow: 'hidden',
  },
  gradientLayout: {
    borderRadius: 10,
    width: dw * 0.9,
    height: 56,
  },
  mainCondition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9D9',
    width: dw * 0.87,
    marginTop: 21,
    paddingBottom: 10,
    paddingTop: 0,
    // backgroundColor: palette.gold,
  },
  touch: {
    // backgroundColor: palette.blue,
    flexDirection: 'row',
    alignItems: 'center',
    width: dw * 0.6,
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  mainBtn: {
    width: dw * 0.9,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainBtnCancel: {
    width: dw * 0.9,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  grayBox: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    marginTop: 20,
    backgroundColor: '#F3F2F2',
  },
  itemList: {
    margin: 0,
    flexDirection: 'column',
    width: dw * 0.93,
    height: 500,
    backgroundColor: 'white',
  },
  memberMainBtnSelected: {
    elevation: 0,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    marginTop: 12,
    borderWidth: 1,
    height: 35,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  memberMainBtnUnselected: {
    elevation: 0,
    marginTop: 12,
    paddingHorizontal: 16,
    height: 35,
    borderWidth: 1,
    borderColor: palette.nonselect,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dateMainBtnSelected: {
    elevation: 0,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 12,
    borderWidth: 1,
    height: 35,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  dateMainBtnUnselected: {
    elevation: 0,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 0,
    borderWidth: 1,
    height: 35,
    borderColor: palette.nonselect,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  memeberListBtnSelected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    width: 74,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  memeberListBtnUnselected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.nonselect,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    width: 74,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateListBtnSelected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateListBtnUnselected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderColor: palette.nonselect,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    marginTop: 15,
    flex: 1,
    width: dw,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    // backgroundColor: palette.gold,
    width: dw * 0.85,
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  completeBtn: {
    height: 30,
    backgroundColor: '#F3F2F2',
    elevation: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
export default HomePage;
