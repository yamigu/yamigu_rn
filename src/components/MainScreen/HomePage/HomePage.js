/* eslint-disable no-lone-blocks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
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

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const HomePage = props => {
  const [memberModalVisible, setMemberModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [ageModalVisible, setAgeModalVisible] = useState(false);

  const memberList = ['2:2 미팅', '3:3 미팅', '4:4 미팅'];
  const [memberMainSelected, setMemberMainSelected] = useState(true);
  const [memberText, setMemberText] = useState('');
  const [memberItemNo, setMemberItemNo] = useState(0);
  const [memberSelected, setMemberSelected] = useState([false, false, false]);

  const dateList = [
    '12월 17일 (수)',
    '12월 17일 (수)',
    '12월 17일 (수)',
    '1월 17일 (수)',
    '1월 17일 (수)',
    '1월 17일 (수)',
    '1월 17일 (수)',
    '1월 3일 (수)',
  ];
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

  const ageList = ['2:2 미팅', '3:3 미팅', '4:4 미팅'];
  const [ageMainSelected, setAgeMainSelected] = useState(true);
  const [ageText, setAgeText] = useState('');
  const [ageItemNo, setAgeItemNo] = useState(0);
  const [ageSelected, setAgeSelected] = useState([false, false, false]);
  const [ageLeftValue, setAgeLeftValue] = useState(20);
  const [ageRightValue, setAgeRightValue] = useState(30);

  return (
    <View style={styles.root}>
      <Modal
        animationType="none"
        transparent={true}
        visible={memberModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setMemberModalVisible(false);
            let tmpText = '';
            memberSelected.map((item, index) => {
              if (memberSelected[index] === true) {
                tmpText = tmpText + memberList[index] + ' ';
              }
              if (tmpText.length > 20) {
                tmpText.substring(0, 20);
                tmpText = tmpText + ' ...';
              }
            });
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
        <View
          style={{
            height: 200,
            backgroundColor: 'rgba(0,0,0,0.7)',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
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
              <TouchableByPlatform
                onPress={() => {
                  setMemberModalVisible(false);
                  let tmpText = '';
                  memberSelected.map((item, index) => {
                    if (memberSelected[index] === true) {
                      tmpText = tmpText + memberList[index] + ' ';
                    }
                  });
                  if (tmpText.length > 20) {
                    tmpText.substring(0, 20);
                    tmpText = tmpText + ' ...';
                  }
                  setMemberText(tmpText);
                }}>
                <CustomTextMedium color={palette.orange} size={13}>
                  완료
                </CustomTextMedium>
              </TouchableByPlatform>
            </View>

            <View name="인원선택list" style={styles.itemList}>
              <TouchableByPlatform
                onPress={() => {
                  {
                    if (memberMainSelected === false) {
                      setMemberMainSelected(!memberMainSelected);
                      setMemberItemNo(0);
                      setMemberSelected([false, false, false]);
                    } else null;
                  }
                }}>
                <Button
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
                        : palette.black
                    }>
                    인원 상관 없음
                  </CustomTextRegular>
                </Button>
              </TouchableByPlatform>

              <View
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {memberList.map((item, index) => {
                  return (
                    <TouchableByPlatform
                      onPress={() => {
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
                      }}>
                      <Button
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
                              : palette.black
                          }>
                          {item}
                        </CustomTextRegular>
                      </Button>
                    </TouchableByPlatform>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setDateModalVisible(false);
            let tmpText = '';
            dateSelected.map((item, index) => {
              if (dateSelected[index] === true) {
                tmpText = tmpText + dateList[index] + ' ';
              }
            });
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
              <TouchableByPlatform
                onPress={() => {
                  setDateModalVisible(false);
                  let tmpText = '';
                  dateSelected.map((item, index) => {
                    if (dateSelected[index] === true) {
                      tmpText = tmpText + dateList[index] + ' ';
                    }
                  });
                  if (tmpText.length > 20) {
                    tmpText = tmpText.substring(0, 20);
                    tmpText = tmpText + ' ...';
                  }
                  setDateText(tmpText);
                }}>
                <CustomTextMedium color={palette.orange} size={13}>
                  완료
                </CustomTextMedium>
              </TouchableByPlatform>
            </View>

            <View name="인원선택list" style={styles.itemList}>
              <TouchableByPlatform
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
                }}>
                <Button
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
              </TouchableByPlatform>

              <View
                style={{
                  backgroundColor: 'white',
                  height: 35,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {dateList.map((item, index) => {
                  return (
                    <TouchableByPlatform
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
                      }}>
                      <Button
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
                    </TouchableByPlatform>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={ageModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setAgeModalVisible(false);
            let tmpText = '';
            setAgeText(tmpText);
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
              <TouchableByPlatform
                onPress={() => {
                  setAgeModalVisible(false);
                  let tmpText = '';
                  setAgeText(tmpText);
                }}>
                <CustomTextMedium color={palette.orange} size={13}>
                  완료
                </CustomTextMedium>
              </TouchableByPlatform>
            </View>

            <View name="나이선택list" style={styles.itemList}>
              <TouchableByPlatform
                onPress={() => {
                  {
                    setAgeSelected([false, false, false]);
                  }
                }}>
                <CustomTextRegular>TBD </CustomTextRegular>
              </TouchableByPlatform>

              <View style={{flex: 1, backgroundColor: 'white'}}>
                <Slider
                  style={{width: 200, height: 40}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                />
              </View>

              {/* end of age module  */}
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.topLayout}>
        <CustomTextBold size={24} color={palette.black}>
          미팅 주선
        </CustomTextBold>
        <CustomTextRegular size={24} color="#646363">
          매력적인 이성과의 미팅
        </CustomTextRegular>
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
              setMemberModalVisible(true);
              setMemberText('선택중 ...');
              console.log('onpress');
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
              setDateModalVisible(true);
              setDateText('선택중 ...');
              console.log('onpress');
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
              setAgeModalVisible(true);
              console.log('onpress');
            }}>
            <CustomTextMedium size={14} color={palette.black}>
              20 ~ 26
            </CustomTextMedium>
            <AntDesignIcon name="caretdown" size={12} color={palette.black} />
          </TouchableByPlatform>
        </View>

        <LinearGradient
          colors={['#FFA022', '#FF6C2B']}
          style={styles.gradientLayout}>
          <TouchableByPlatform style={styles.mainBtn}>
            <CustomTextMedium size={16} color="white">
              미팅 주선 신청하기
            </CustomTextMedium>
            <CustomTextMedium size={16} color="white">
              무료 1회
            </CustomTextMedium>
          </TouchableByPlatform>
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
    height: 40,
    backgroundColor: 'white',
  },
  memberMainBtnSelected: {
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
  memberMainBtnUnselected: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: palette.black,
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateMainBtnSelected: {
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
  },
  dateListBtnSelected: {
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
});
export default HomePage;
