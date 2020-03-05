import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import axios from 'axios';
import firebase from 'react-native-firebase';
import {View} from 'react-native';
import {Badge} from 'native-base';
import palette from '~/lib/styles/palette';
import '~/config';
const ChattingIcon = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
      let info = await AsyncStorage.getItem('userValue');
      info = JSON.parse(info);
      setUserInfo(info);
      resolve(info);
    });
  };
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('chatStorage');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  useEffect(() => {
    getUserInfo().then(userVal => {
      console.log('ChattingIcon');
      console.log(userVal);
      if (
        userVal === null ||
        userVal === undefined ||
        userVal[global.config.user_info_const.TOKEN] === 'token' ||
        userVal[global.config.user_info_const.TOKEN] === ''
      )
        return;
      axios.defaults.headers.common['Authorization'] =
        'Token ' + userVal[global.config.user_info_const.TOKEN];
      let storageData;
      getStorage().then(storage => {
        if (storage === null || storage === undefined) {
          console.log(storage);
          return;
        }
        storageData = storage;

        axios
          .get('http://13.124.126.30:8000/authorization/firebase/token/')
          .then(result => {
            return result.data;
          })
          .catch(error => console.log(error))
          .then(token => {
            console.log('signin');
            firebase.auth().signInWithCustomToken(token);
          })
          .then(() => {
            axios.get('http://13.124.126.30:8000/core/chat/').then(result => {
              result.data.chat_list.map(item => {
                firebase
                  .database()
                  .ref('message/' + item.id)
                  .limitToLast(1)
                  .on('child_added', result => {
                    try {
                      if (
                        result.val().idSender !==
                          userVal[global.config.user_info_const.UID] &&
                        result.val().time >
                          storageData['room' + item.id][
                            storageData['room' + item.id].length - 1
                          ].time
                      ) {
                        setHasNew(true);
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  });
                const temp = chatList.slice();
                temp.push(item);
                setChatList(temp);
              });
            });
          });
      });
    });
  }, [navigation]);
  useEffect(() => {}, [hasNew]);
  useEffect(() => {
    return () => {
      chatList.map(item => {
        firebase
          .database()
          .ref('message/' + item)
          .off('child_added');
      });
    };
  }, []);
  return (
    <View
      style={{
        width: 35,
        height: 35,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableByPlatform
        onPress={() => {
          setHasNew(false);
          navigation.navigate('ChattingList');
        }}>
        <Image
          source={require('~/images/chat_bubble_icon.png')}
          style={{
            margin: 10,
            width: 20,
            height: 18,
          }}
        />
      </TouchableByPlatform>
      {hasNew ? (
        <View
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            borderRadius: 4,
            top: 7,
            right: 7,
            zIndex: 2,
            backgroundColor: palette.orange[0],
          }}></View>
      ) : null}
    </View>
  );
};

export default ChattingIcon;
