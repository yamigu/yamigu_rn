/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  findNodeHandle,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {Container, Content, Icon, Text, List, Button, Input} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import ReceivedItem from '~/components/ChattingScreen/ReceivedItem';
import SentItem from '~/components/ChattingScreen/SentItem';
import {HeaderBackButton} from 'react-navigation-stack';
import {SafeAreaView} from 'react-navigation';
import {createRef} from 'react';
import {} from 'react-native-gesture-handler';

const deviceWidth = Dimensions.get('window').width;
const buttonWidth = deviceWidth * 0.9;

const ChattingScreen = props => {
  const [toggle, setToggle] = useState(0);
  const changeView = () => {
    setToggle(0);
  };
  const changeView2 = () => {
    setToggle(1);
  };
  const _scrollToBottomY = createRef();

  const gotoBot = () => {
    console.log('im  in');
    _scrollToBottomY.current.scrollToEnd();
  };
  //behavior : position ###
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={85}>
        <ScrollView
          bounces="false"
          overScrollMode="never"
          ref={_scrollToBottomY}
          onContentSizeChange={() => {
            _scrollToBottomY.current.scrollToEnd();
          }}>
          <List style={{flex: 1}}>
            <ReceivedItem />
            <ReceivedItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
            <SentItem />
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
              <TouchableByPlatform>
                <Anticon
                  name="pluscircle"
                  style={{color: palette.gray}}
                  size={deviceWidth * 0.07}
                />
              </TouchableByPlatform>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 32,
                  width: deviceWidth * 0.72,
                }}>
                <Input
                  placeholder=" 메세지를 입력하세요."
                  color="#eeeeee"
                  style={styles.messageInput}
                  onFocus={() => {
                    gotoBot;
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
ChattingScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <HeaderBackButton
      label=" "
      tintColor=palette.black
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerTitle: () => <Text style={{alignSelf: 'center'}}>제이름은요</Text>,
  headerRight: () => (
    <TouchableByPlatform>
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
});
const styles = StyleSheet.create({
  root: {
    backgroundColor: palette.default_bg,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  container: {
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
    height: 48,
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
  messageInput: {borderRadius: 10, backgroundColor: '#EEEEEE', fontSize: 14},
});
export default ChattingScreen;
