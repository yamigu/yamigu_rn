/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Header, Body, Left, Right, Icon} from 'native-base';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
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
        <TouchableByPlatform style={styles.touchable}>
          <Icon
            name="menu"
            style={{
              color: palette.black,
            }}
            // onPress={openMenu}
          />
        </TouchableByPlatform>
      </Left>
      <Body>
        <Image source={require('~/images/yamigu-logo-text.png')} />
      </Body>
      <Right>
        <TouchableByPlatform>
          <Image source={require('~/images/chat-bubble-outline.png')} />
        </TouchableByPlatform>
      </Right>
    </Header>
  );
};
export default MainHeader;
