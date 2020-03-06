import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  Modal,
  Alert,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  CustomTextMedium,
  CustomTextLight,
  CustomTextBold,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import {Button, Row} from 'native-base';
import LikeNumModal from './LikeNumModal';
import axios from 'axios';
const dh = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 12,
  },
  wrapper: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: palette.gold,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  touchable: {
    width: 66,
    height: 66,
  },
  innerBackground: {
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goldLike: {
    width: 40,
    height: 36,
    marginTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
const LikeMatching = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [likeNumModalVisible, setLikeNumModalVisible] = useState(false);
  const [likeNum, setLikeNum] = useState(0);

  useEffect(() => {
    axios.get('http://13.124.126.30:8000/core/like_count/').then(result => {
      setLikeNum(result.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
            // console.log('aa');
          }}>
          <View
            style={{
              height: dh,
              backgroundColor: 'rgba(0,0,0,0.7)',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <Button
              style={styles.modalButton}
              onPress={() => {
                Alert.alert('피드를 삭제하시겠슴미까?');
                setModalVisible(false);
              }}>
              <CustomTextRegular size={17} color={palette.red}>
                삭제하기
              </CustomTextRegular>
            </Button>
            <Button
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <CustomTextBold size={17} color={palette.black}>
                취소
              </CustomTextBold>
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={likeNumModalVisible} transparent="true">
        <LikeNumModal
          setLikeNumModalVisible={setLikeNumModalVisible}
          likeNum={likeNum}
        />
      </Modal>

      <View style={styles.wrapper}>
        <TouchableByPlatform
          styles={styles.touchable}
          onPress={() => {
            setLikeNumModalVisible(true);
            // console.log('inin');
          }}>
          <ImageBackground
            source={require('~/images/gold-inner-circle.png')}
            style={styles.innerBackground}>
            <ImageBackground
              source={require('~/images/gold-like.png')}
              style={styles.goldLike}>
              <CustomTextLight size={16} color="white">
                {likeNum}
              </CustomTextLight>
            </ImageBackground>
          </ImageBackground>
        </TouchableByPlatform>
      </View>
      <CustomTextMedium color={palette.black} size={16}>
        좋아요
      </CustomTextMedium>
    </View>
  );
};

export default LikeMatching;
