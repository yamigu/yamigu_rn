/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {Content, Button, Right, List, ListItem, Body, Input} from 'native-base';
import Octionicon from 'react-native-vector-icons/Octicons';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
const pf = Platform.OS;

const deviceWidth = Dimensions.get('window').width;

const replaceAll = (str, searchStr, replaceStr) => {
  return str.split(searchStr).join(replaceStr);
};
const ShieldScreen = ({params}) => {
  const [loading, setLoading] = useState(false);

  const [enrolling, setEnrolling] = useState(0);
  const [inputText, setInputText] = useState('');
  const [focused, setFocused] = useState(false);
  const [sheilding, setSheilding] = useState([]);

  const [phonebook, setPhonebook] = useState([]);

  useEffect(() => {
    //axios.get(아는 사람 피하기 목록 가져오기)
    //setSheilding(result.data);
    axios.get('http://13.124.126.30:8000/core/shield/').then(result => {
      setSheilding(result.data.reverse());
    });
  }, []);

  const requestShield = data => {
    //server로 보내기
    if (data === '' || data === null || data === undefined) return;
    else {
      axios
        .post('http://13.124.126.30:8000/core/shield/', data)
        .then(result => {
          const newData = sheilding.slice();
          result.data.map(item => {
            newData.unshift(item);
          });
          setSheilding(newData);
          setEnrolling(0);
          setFocused(false);
          setInputText('');
        });
    }
  };
  const deleteShield = (data, index) => {
    axios
      .patch('http://13.124.126.30:8000/core/shield/', data)
      .then(result => {
        console.log(result.data);
        const newData = sheilding.slice();
        newData.splice(index, 1);
        setSheilding(newData);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  const getting = () => {
    return new Promise((resolve, reject) => {
      Contacts.checkPermission((err, permission) => {
        if (err) throw err;
        console.log(permission);
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === 'denied') {
          Contacts.requestPermission((err, permission) => {
            console.log('requesting?');
          });
        }
        if (permission === 'denied') {
          // console.log(err, permission);
          console.log('were you here?');
          setLoading(false);
          reject(permission);
        }
        resolve(permission);
      });
    }).then(async () => {
      // console.log(result); : permossion
      Contacts.getAll((err, contacts) => {
        if (err) {
          setLoading(false);
          throw err;
        }
        setLoading(false);

        // console.log(contacts.phoneNumbers[2]);
        let tmpPhonebook = [];
        const data = new FormData();
        contacts.map((item, index) => {
          if (
            (item.phoneNumbers[0] === null) |
            (item.phoneNumbers[0] === undefined)
          ) {
            // console.log('null');
          } else {
            // console.log(item.phoneNumbers[0].number);
            data.append(
              'phoneno',
              replaceAll(item.phoneNumbers[0].number, '-', ''),
            );
          }
        });
        console.log(data);

        requestShield(data);
        // axios.post(~~tmpPhonebook)
        // setLoading(false);
        return contacts;
      });
      await setLoading(false);
    });
  };
  const wholePhonebook = () => {
    if (pf === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => {
        getting();
      });
    } else {
      //ios
      setLoading(true);
      getting();
    }

    // setLoading(true);
    // Alert.alert('doing');
    //연락처 가져오기
    //axios.post(보내기)
    //then loading 풀기
    // setLoading(false);
  };

  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <Spinner
        visible={loading}
        textContent={'loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container}>
        <CustomTextMedium size={18} color={palette.black}>
          혹시 아는 사람 만날까봐 걱정되시나요?
        </CustomTextMedium>
        <CustomTextRegular
          size={12}
          color={palette.gray}
          style={{marginTop: 2}}>
          피하고 싶은 이성이나 소속을 등록하면
        </CustomTextRegular>
        <CustomTextRegular size={12} color={palette.gray}>
          등록된 이성과 소속의 이성들은 회원님과 서로 볼 수 없습니다.
        </CustomTextRegular>
        <View style={styles.buttonView}>
          <Button
            style={styles.buttonSmall}
            onPress={() => {
              enrolling === 1 ? setEnrolling(0) : setEnrolling(1);
            }}>
            <CustomTextMedium size={14} color="white">
              번호 직접 등록
            </CustomTextMedium>
          </Button>
          <Button style={styles.buttonSmall} onPress={() => wholePhonebook()}>
            <CustomTextMedium size={14} color="white">
              연락처 전체 등록
            </CustomTextMedium>
          </Button>
        </View>
        <Button
          style={styles.buttonBig}
          onPress={() => {
            enrolling === 2 ? setEnrolling(0) : setEnrolling(2);
          }}>
          <CustomTextMedium size={14} color={palette.orange}>
            피하고 싶은 소속 등록
          </CustomTextMedium>
        </Button>
        {enrolling !== 0 ? (
          <View>
            <TextInput
              onChangeText={value => {
                setInputText(value);
              }}
              value={inputText}
              focused={focused}
              placeholderTextColor={palette.gray}
              placeholder={
                enrolling === 1 ? ' 번호를 입력하세요' : ' 소속을 입력하세요'
              }
              style={{
                height: 50,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
              }}
            />
            <Button
              onPress={() => {
                const data = new FormData();
                if (
                  inputText === null ||
                  inputText === '' ||
                  inputText === undefined
                ) {
                  Alert.alert('한 글자 이상 입력해주세요');
                  console.log('none');
                } else {
                  enrolling === 1
                    ? data.append('phoneno', replaceAll(inputText, '-', ''))
                    : data.append('belong', inputText);
                  console.log('asd');

                  requestShield(data);
                }
              }}
              style={{
                backgroundColor: palette.orange,
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              <CustomTextMedium size={15} color="white">
                등록하기
              </CustomTextMedium>
            </Button>
          </View>
        ) : null}

        <CustomTextMedium size={18} color={palette.black}>
          등록된 번호/소속
        </CustomTextMedium>
      </View>

      <List style={styles.list}>
        {sheilding.map((item, index) => (
          <ListItem key={index} noIndent style={styles.listItem}>
            <Body>
              <CustomTextRegular size={16} color={palette.black}>
                {item.phoneno || item.belong}
              </CustomTextRegular>
            </Body>
            <Right>
              <Button
                transparent
                style={{
                  width: 20,
                  height: 30,
                }}
                onPress={() => {
                  const data = new FormData();
                  item.phoneno !== null && item.phoneno !== ''
                    ? data.append('phoneno', item.phoneno)
                    : data.append('belong', item.belong);
                  deleteShield(data, index);
                }}>
                <Octionicon name="x" size={15} style={styles.iconX} />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

ShieldScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor={palette.black}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      아는 사람 피하기
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
  container: {
    padding: 12,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    width: (deviceWidth - 24) * 0.4843,
    borderRadius: 5,
    backgroundColor: palette.orange,
    elevation: 0,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBig: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 12,
    elevation: 0,
    borderColor: palette.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: palette.default_bg,
  },
  iconX: {
    width: 20,
    height: 20,
    color: palette.gray,
  },
});

const contact_data_list = ['내 연락처 모두 등록됨', '연세대', '010-4055-6243'];
export default ShieldScreen;
