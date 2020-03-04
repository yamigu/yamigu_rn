import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Modal} from 'react-native';
import {CustomTextMedium, CustomTextRegular} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {List, ListItem, Left, Right, Body} from 'native-base';
import Anticon from 'react-native-vector-icons/AntDesign';
import TouchableByPlatform from '../common/TouchableByPlatform';
import {TouchableOpacity} from 'react-native-gesture-handler';
import '~/config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LocationModal from '../SignupScreen/LocationModal';
import HeightModal from '~/components/MyProfileScreen/HeightModal';
const InfoView = ({navigation, userInfo}) => {
  const [info, setInfo] = useState([]);
  const nowYear = 20200000;

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [heightModalVisible, setHightModalVisible] = useState(false);

  useEffect(() => {
    if (userInfo[global.config.user_info_const.NICKNAME] !== undefined) {
      setInfo(userInfo);
    }
  }, [userInfo]);
  return (
    <View style={styles.container}>
      <Modal visible={locationModalVisible} transparent>
        <LocationModal
          setLocationModalVisible={setLocationModalVisible}
          fromProfile={true}
        />
      </Modal>
      <Modal visible={heightModalVisible} transparent>
        <HeightModal setHightModalVisible={setHightModalVisible} />
      </Modal>
      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 21}}>
        기본 정보
      </CustomTextMedium>
      <List style={styles.list}>
        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              닉네임
            </CustomTextRegular>
          </Left>
          <Body style={{alignItems: 'flex-end'}}>
            <CustomTextRegular size={16} color={palette.gray}>
              {info[global.config.user_info_const.NICKNAME]}
            </CustomTextRegular>
          </Body>
        </ListItem>
        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              성별
            </CustomTextRegular>
          </Left>
          <Right>
            <CustomTextRegular size={16} color={palette.gray}>
              {info[global.config.user_info_const.GENDER] === 1
                ? '남자'
                : '여자'}
            </CustomTextRegular>
          </Right>
        </ListItem>
        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              나이
            </CustomTextRegular>
          </Left>
          <Right>
            <CustomTextRegular size={16} color={palette.gray}>
              {Math.floor((nowYear - parseInt(info[4]) + 20000) / 10000)}살
            </CustomTextRegular>
          </Right>
        </ListItem>
        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              소속
            </CustomTextRegular>
          </Left>
          <Body style={{alignItems: 'flex-end'}}>
            {info[global.config.user_info_const.VERIFIED] === 0 ? (
              <TouchableOpacity
                style={styles.listItemRight}
                onPress={() => navigation.navigate('BV')}>
                <CustomTextRegular
                  size={16}
                  color={palette.red}
                  // style={{backgroundColor: palette.blue}}
                >
                  인증하기
                </CustomTextRegular>
                <Anticon
                  name="exclamationcircle"
                  style={styles.iconWarning}
                  size={18}
                />
              </TouchableOpacity>
            ) : info[global.config.user_info_const.VERIFIED] === 1 ? (
              <CustomTextRegular size={16} color={palette.gray}>
                인증 진행 중
              </CustomTextRegular>
            ) : info[global.config.user_info_const.VERIFIED] === 2 ? (
              <CustomTextRegular size={16} color={palette.gray}>
                {info[global.config.user_info_const.BELONG]}{' '}
                {info[global.config.user_info_const.DEPARTMENT]}
              </CustomTextRegular>
            ) : null}
          </Body>
        </ListItem>
        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              지역
            </CustomTextRegular>
          </Left>
          <Right>
            <TouchableByPlatform
              onPress={() => {
                setLocationModalVisible(true);
              }}>
              <CustomTextRegular size={16} color={palette.orange}>
                {info[10]}
              </CustomTextRegular>
            </TouchableByPlatform>
          </Right>
        </ListItem>

        <ListItem noIndent style={styles.listItem}>
          <Left>
            <CustomTextRegular size={16} color={palette.black}>
              키
            </CustomTextRegular>
          </Left>
          <Right>
            <TouchableOpacity
              style={styles.listItemRight}
              onPress={() => {
                setHightModalVisible(true);
              }}>
              <CustomTextRegular size={16} color={palette.orange}>
                미입력
              </CustomTextRegular>
            </TouchableOpacity>
          </Right>
        </ListItem>
      </List>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  list: {
    marginTop: 12,
  },
  listItem: {
    borderBottomWidth: 0,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWarning: {
    alignSelf: 'center',
    paddingTop: 4,
    // backgroundColor: palette.gold,
    color: palette.red,
    marginLeft: 3,
  },
});
export default InfoView;
