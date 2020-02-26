/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon, Content} from 'native-base';
import ChattingList from '~/components/ChattingListScreen/ChattingList';
import ReceivedList from '~/components/ChattingListScreen/ReceivedList';
import {HeaderBackButton} from 'react-navigation-stack';
import firebase from 'react-native-firebase';
import axios from 'axios';

const ChattingListScreen = ({navigation}) => {
  const [ref, setRef] = useState(null);
  useEffect(() => {
    axios
      .get('http://13.124.126.30:8000/authorization/firebase/token/')
      .then(result => {
        const token = result.data;
        console.log(token);
        return token;
      })
      .catch(error => console.log(error))
      .then(token => {
        firebase.auth().signInWithCustomToken(token);

        setRef(firebase.database().ref());
        firebase
          .database()
          .ref('message')
          .on('child_added', snapshot => {
            console.log(snapshot.val());
          });
      });
  }, []);
  return (
    <Content showsVerticalScrollIndicator={false} style={styles.root}>
      <ReceivedList navigation={navigation} />
      <ChattingList style={{marginTop: 12}} navigation={navigation} />
    </Content>
  );
};

ChattingListScreen.navigationOptions = ({navigation}) => ({
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
    <Image
      style={{width: 25, height: 22}}
      source={require('~/images/chat_bubble_orange_icon.png')}
    />
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
});
export default ChattingListScreen;
