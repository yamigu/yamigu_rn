/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Image, Dimensions} from 'react-native';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Icon} from 'native-base';

const deviceWidth = Dimensions.get('window').width;

const ChattingListScreen = ({params}) => (
  <View>
    <Text>ChattingListScreen</Text>
    <Text>TDB by Charlie</Text>
  </View>
);

ChattingListScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <View>
      <TouchableByPlatform onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          style={{
            color: palette.black,
            margin: 10,
          }}
        />
      </TouchableByPlatform>
    </View>
  ),
  headerTitle: () => (
    <Image source={require('~/images/chat-bubble-orange.png')} />
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});

export default ChattingListScreen;
