/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight,
  TouchableNativeFeedbackComponent,
  SafeAreaView,
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
import RoundBorderOrangeText from '~/components/MeetingSettingScreen/RoundBorderOrangeText';
import Slider from '@react-native-community/slider';
import MultiSlider from './MultiSlider';
import CustomMarker from './CustomMarker';
import Moment from 'moment';
import 'moment/locale/ko';
import Spinner from 'react-native-loading-spinner-overlay';
import {UserContextConsumer, UserContextProvider} from '~/Context/UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// import CustomLabel from './CustomLabel';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userInfo');
    const jValue = JSON.parse(value);
    console.log(jValue);
    console.log(jValue[0]);

    if (value !== null) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + jValue[0];
    }
  } catch (error) {
    // Error retrieving data
  }
};

const HomePage = props => {
  const [asyncValue, setAsyncValue] = useState([]);

  useEffect(() => {
    _retrieveData();
    // console.log(asyncValue);

    // axios.get('http://13.124.126.30:8000/core/match_request/').then(result => {
    //   console.log('homepage useEffect match_request');
    //   setMatchRequested(result.data.matched_on);
    // });
  }, []);

  const requestMatching = () => {
    logCallback('Login Start', setLoginLoading(true));

    axios.get('http://13.124.126.30:8000/core/match_request/');
    // .then(result => console.log(result.data));

    setTimeout(() => {
      setLoginLoading(false);
      setMatchRequested(!matchRequested);
    }, 3000);
  };

  const [matchRequested, setMatchRequested] = useState(true);

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

  useEffect(() => {
    const today = new Date();
    setNowTime(today);

    const wow = [
      Moment(today)
        .add(1, 'days')
        .format('MM월 DD일 (ddd)'),
      Moment(today)
        .add(2, 'days')
        .format('MM월 DD일 (ddd)'),
      Moment(today)
        .add(3, 'days')
        .format('MM월 DD일 (ddd)'),
      Moment(today)
        .add(4, 'days')
        .format('MM월 DD일 (ddd)'),
      Moment(today)
        .add(5, 'days')
        .format('MM월 DD일 (ddd)'),
      Moment(today)
        .add(6, 'days')
        .format('MM월 DD일 (ddd)'),
      '금요일만',
      '토요일만',
    ];
    setDateList(wow);
  }, []);

  const [loginLoading, setLoginLoading] = useState(false);

  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);

  const memberList = ['2:2 미팅', '3:3 미팅', '4:4 미팅'];
  const [memberMainSelected, setMemberMainSelected] = useState(true);
  const [memberText, setMemberText] = useState('');
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

  let multiSliderValuesChange = values => setMultiSliderValue(values);
  let nonCollidingMultiSliderValuesChange = values =>
    setNonCollidingMultiSliderValue(values);

  return (
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
                height: dh - 200,
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
              height: 200,
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
<<<<<<< HEAD
                transparent={true}
=======
                style={{
                  height: 30,
                  backgroundColor: '#F3F2F2',
                  elevation: 0,
                }}
>>>>>>> 05b3c7d24149df04e48f05dbd9d07128a21fb9d8
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
                <CustomTextMedium color={palette.orange} size={13}>
                  완료
                </CustomTextMedium>
              </Button>
            </View>

<<<<<<< HEAD
            <View name="인원선택list" style={styles.itemList}>
              <Button
                style={
                  memberMainSelected === true
                    ? styles.memberMainBtnSelected
                    : styles.memberMainBtnUnselected
                }
=======
            <View name="택list" style={styles.itemList}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}></View>
              <Button
>>>>>>> 05b3c7d24149df04e48f05dbd9d07128a21fb9d8
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
<<<<<<< HEAD
                }}>
=======
                }}
                style={
                  memberMainSelected === true
                    ? styles.memberMainBtnSelected
                    : styles.memberMainBtnUnselected
                }>
>>>>>>> 05b3c7d24149df04e48f05dbd9d07128a21fb9d8
                <CustomTextRegular
                  size={12}
                  color={
                    memberMainSelected === true ? palette.orange : palette.black
                  }>
                  인원 상관 없음
                </CustomTextRegular>
              </Button>

              <View
                style={{
                  height: 35,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {memberList.map((item, index) => {
                  return (
                    <Button
<<<<<<< HEAD
                      style={
                        memberSelected[index] === true
                          ? styles.memeberListBtnSelected
                          : styles.memeberListBtnUnselected
                      }
=======
>>>>>>> 05b3c7d24149df04e48f05dbd9d07128a21fb9d8
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
<<<<<<< HEAD
                      }}>
=======
                      }}
                      style={
                        memberSelected[index] === true
                          ? styles.memeberListBtnSelected
                          : styles.memeberListBtnUnselected
                      }>
>>>>>>> 05b3c7d24149df04e48f05dbd9d07128a21fb9d8
                      <CustomTextRegular
                        size={12}
                        color={
                          memberSelected[index] === true
                            ? palette.orange
                            : palette.black
                        }>
                        {item}
                      </CustomTextRegular>
                    </Button>
                  );
                })}
              </View>
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
                height: dh - 300,
                backgroundColor: 'rgba(0,0,0,0.7)',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: 300,
              backgroundColor: 'rgba(0,0,0,0.7)',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 300,
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
                  style={{
                    height: 30,
                    backgroundColor: '#F3F2F2',
                    elevation: 0,
                  }}
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
                  <CustomTextMedium color={palette.orange} size={13}>
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
                    size={12}
                    color={
                      dateMainSelected === true ? palette.orange : palette.black
                    }>
                    날짜 상관 없음
                  </CustomTextRegular>
                </Button>

                <View
                  style={{
                    backgroundColor: 'white',
                    height: 200,
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
                              : palette.black
                          }>
                          {item}
                        </CustomTextRegular>
                      </Button>
                    );
                  })}
                </View>
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
                height: dh - 146,
                backgroundColor: 'rgba(0,0,0,0.7)',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: 146,
              backgroundColor: 'rgba(0,0,0,0.7)',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                height: 146,
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
                  style={{
                    height: 30,
                    backgroundColor: '#F3F2F2',
                    elevation: 0,
                  }}
                  onPress={() => {
                    setAgeModalVisible(false);
                  }}>
                  <CustomTextMedium color={palette.orange} size={13}>
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
                  sliderLength={dw * 0.86}
                  onValuesChange={multiSliderValuesChange}
                  min={20}
                  max={30}
                  step={1}
                  allowOverlap
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

      <View style={styles.topLayout}>
        <CustomTextBold>{}</CustomTextBold>
        <CustomTextBold size={24} color={palette.black}>
          미팅 주선
        </CustomTextBold>

        {matchRequested === false ? (
          <Animated.Image
            style={{
              transform: [{rotate: spin}],
              marginTop: 20,
              width: 50,
              height: 60,
            }}
            source={require('~/images/rotating.png')}
          />
        ) : (
          <CustomTextRegular size={20} color="#646363">
            매력적인 이성과의 미팅
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
            style={{paddingLeft: 6}}>
            인원
          </CustomTextBold>
          <TouchableByPlatform
            style={styles.touch}
            onPress={() => {
              {
                if (matchRequested === false) {
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
            <CustomTextMedium size={14} color={palette.black}>
              {memberMainSelected === true ? '인원 상관 없음' : memberText}
            </CustomTextMedium>

            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <View style={styles.mainCondition}>
          <CustomTextBold
            size={14}
            color={palette.gray}
            style={{paddingLeft: 6}}>
            날짜
          </CustomTextBold>
          <TouchableByPlatform
            style={styles.touch}
            onPress={() => {
              {
                if (matchRequested === false) {
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
              {dateMainSelected === true ? '날짜 상관 없음' : dateText}
            </CustomTextMedium>

            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <View style={styles.mainCondition}>
          <CustomTextBold
            size={14}
            color={palette.gray}
            style={{paddingLeft: 6}}>
            선호 나이
          </CustomTextBold>
          <TouchableByPlatform
            style={styles.touch}
            onPress={() => {
              {
                if (matchRequested === false) {
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

        <LinearGradient
          colors={['#FFA022', '#FF6C2B']}
          style={styles.gradientLayout}>
          {matchRequested === true ? (
            <TouchableByPlatform
              style={styles.mainBtn}
              onPress={requestMatching}>
              {/* onPress={() => gotoChat()}> */}
              <CustomTextMedium size={16} color="white">
                미팅 주선 신청하기
              </CustomTextMedium>
              <CustomTextMedium size={16} color="white">
                무료 1회
              </CustomTextMedium>
            </TouchableByPlatform>
          ) : (
            <TouchableByPlatform
              style={styles.mainBtnCancel}
              onPress={requestMatching}>
              <CustomTextMedium size={16} color="white">
                미팅 주선 취소 하기
              </CustomTextMedium>
            </TouchableByPlatform>
          )}
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: dw,
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topLayout: {
    flex: 1,
    width: dw,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLayout: {
    flex: 1,
    width: dw,
    marginBottom: 75,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradientLayout: {
    borderRadius: 10,
    width: dw * 0.9,
    height: 56,
    marginTop: 20,
  },
  mainCondition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9D9',
    width: dw * 0.87,
    marginTop: 21,
    paddingBottom: 10,
  },
  touch: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: dw * 0.56,
    justifyContent: 'space-between',
    paddingRight: 10,
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
    paddingVertical: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  memberMainBtnUnselected: {
    elevation: 0,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  dateMainBtnSelected: {
    elevation: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateMainBtnUnselected: {
    elevation: 0,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 0,
  },
  memeberListBtnUnselected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    width: 74,
    flexDirection: 'column',
    justifyContent: 'center',
    elevation: 0,
  },
  dateListBtnSelected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.orange,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    width: 92,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateListBtnUnselected: {
    elevation: 0,
    marginRight: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 35,
    width: 92,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: dw * 0.86,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    width: dw * 0.86,
    marginTop: 0,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
export default HomePage;
