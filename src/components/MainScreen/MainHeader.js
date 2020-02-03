/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Header, Body, Left, Right, Icon} from 'native-base';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  touchable: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
const MainHeader = props => {
  const openMenu = () => {
    props.openDrawer();
  };
  return (
    <Header style={{height: 90, backgroundColor: 'white'}}>
      <Left>
        <TouchableNativeFeedback style={styles.touchable}>
          <Icon
            name="menu"
            style={{
              color: '#333333',
            }}
            // onPress={openMenu}
          />
        </TouchableNativeFeedback>
      </Left>
      <Body>
        <Image source={require('../../images/yamigu-logo-text.png')} />
      </Body>
      <Right>
        <TouchableNativeFeedback>
          <Image source={require('../../images/chat-bubble-outline.png')} />
        </TouchableNativeFeedback>
      </Right>
    </Header>
  );
};

export default MainHeader;
