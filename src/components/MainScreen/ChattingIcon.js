import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import axios from 'axios';
import firebase from 'react-native-firebase';
import {View} from 'react-native';
import {Badge} from 'native-base';
import palette from '~/lib/styles/palette';

const ChattingIcon = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const getStorage = () => {
    return new Promise(async (resolve, reject) => {
      let storage = await AsyncStorage.getItem('chatStorage');
      storage = JSON.parse(storage);
      resolve(storage);
    });
  };

  useEffect(() => {
    getStorage().then(storage => {
      if (storage === null || storage === undefined) {
        console.log(storage);
        return;
      }
      axios
        .get('http://13.124.126.30:8000/authorization/firebase/token/')
        .then(result => {
          return result.data;
        })
        .catch(error => console.log(error))
        .then(token => {
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
                      result.val().time >
                      storage['room' + item.id][
                        storage['room' + item.id].length - 1
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
  }, [navigation]);
  useEffect(() => {
    console.log(hasNew);
  }, [hasNew]);
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
            width: 10,
            height: 10,
            borderRadius: 5,
            top: 7,
            right: 7,
            zIndex: 2,
          }}>
          <Badge
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: palette.orange[0],
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ChattingIcon;
