import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {Left, Right, Body, ListItem, Thumbnail} from 'native-base';
import AntIcon from 'react-native-vector-icons/AntDesign';

const ReceivedItem = ({params}) => (
  <ListItem>
    <Left style={styles.left}>
      <Thumbnail
        style={{
          alignSelf: 'center',
          height: 50,
          width: 50,
          borderRadius: 5,
        }}
        source={require('~/images/heart.png')}
      />
    </Left>
    <Body>
      <Text>nickname</Text>
      <Text>chatting content</Text>
    </Body>
    <Right>
      <Text>senttime</Text>
    </Right>
  </ListItem>
);

const styles = StyleSheet.create({
  left: {
    paddingLeft: 10,
    paddingTop: 14,
  },
});
export default ReceivedItem;
