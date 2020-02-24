/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
} from 'native-base';
import {
  CustomTextBold,
  CustomTextMedium,
  CustomTextRegular,
} from './CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from './TouchableByPlatform';
const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const ProfileCard = ({
  size,
  fontSizes,
  nickname,
  avata,
  age,
  belong,
  department,
  bothLike,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log(avata);
  }, []);
  return (
    <List style={{height: size}}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.7)',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <View style={styles.modalBtnContainer}>
              <Button
                style={styles.modalButtonMultiple}
                onPress={() => {
                  Alert.alert('상대를 차단 하시겠슴미까?');
                }}>
                <CustomTextRegular size={17} color={palette.red}>
                  차단
                </CustomTextRegular>
              </Button>
              <View
                style={{
                  height: 1,
                  width: dw - 20,
                  backgroundColor: palette.black,
                }}
              />
              <Button
                style={styles.modalButtonMultiple}
                onPress={() => {
                  Alert.alert('상대를 신고 하시겠슴미까?');
                }}>
                <CustomTextRegular size={17} color={palette.black}>
                  신고
                </CustomTextRegular>
              </Button>
            </View>

            <Button
              style={styles.modalButtonCancle}
              onPress={() => setModalVisible(!modalVisible)}>
              <CustomTextBold size={17} color={palette.black}>
                취소
              </CustomTextBold>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ListItem avatar style={{marginLeft: 0}}>
        <Left style={{paddingTop: 0, paddingBottom: 0}}>
          <Thumbnail
            style={{
              alignSelf: 'center',
              height: size,
              width: size,
              borderRadius: size / 2,
            }}
            source={
              avata
                ? {uri: avata.uri}
                : require('~/images/user-default-profile.png')
            }
          />
        </Left>
        <Body
          style={{
            justifyContent: 'center',
            height: '100%',
            borderBottomWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}>
          <View style={styles.textView}>
            <View style={styles.firstLine}>
              <CustomTextBold
                style={{marginRight: 8}}
                size={fontSizes[0]}
                color={palette.black}>
                {nickname}
              </CustomTextBold>
              <CustomTextMedium size={fontSizes[1]} color={palette.black}>
                {age + (age === '' ? '' : '살')}
              </CustomTextMedium>
            </View>
            <View style={styles.secondLine}>
              <CustomTextRegular size={fontSizes[2]} color={palette.sub}>
                {belong} {department}
              </CustomTextRegular>
            </View>
          </View>
        </Body>

        <Right
          style={{
            borderBottomWidth: 0,
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 10,
          }}>
          {bothLike === true ? (
            <Image source={require('~/images/bothlike-icon.png')} />
          ) : null}
        </Right>
      </ListItem>
    </List>
  );
};
const styles = StyleSheet.create({
  textView: {
    justifyContent: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  secondLine: {},
  bothLike: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 52,
  },
  modalButtonMultiple: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 0,
    height: 52,
  },
  modalBtnContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
export default ProfileCard;
