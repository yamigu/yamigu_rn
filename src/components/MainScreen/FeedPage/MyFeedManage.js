import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import ProfileCard from '~/components/common/ProfileCard';
import palette from '~/lib/styles/palette';
import {Thumbnail} from 'native-base';
import {
  CustomTextRegular,
  CustomTextMedium,
} from '~/components/common/CustomText';
import TouchableByPlatform from '~/components/common/TouchableByPlatform';
import IonIcon from 'react-native-vector-icons/Ionicons';

const dw = Dimensions.get('window').width;

const MyFeedManage = ({params}) => {
  const [toggle, setToggle] = useState(0);

  const showMy = () => {
    console.log(toggle);
    setToggle(!toggle);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View style={styles.myfeed}>
        <Thumbnail
          style={{
            alignSelf: 'center',
            height: 50,
            width: 50,
            borderRadius: 50 / 2,
          }}
          source={require('~/images/user-default-profile.png')}
        />
        <CustomTextRegular
          size={16}
          color={palette.black}
          style={{marginLeft: 10}}>
          무슨 생각을 하고 계신가요?
        </CustomTextRegular>
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.actionDiv}>
        <TouchableByPlatform style={styles.touchable}>
          <View style={styles.button}>
            <IonIcon name="ios-heart-empty" color="#898989" size={18} />
            <CustomTextMedium size={14} color="#898989">
              사진
            </CustomTextMedium>
          </View>
        </TouchableByPlatform>

        <View style={styles.verticalDivider} />

        <TouchableByPlatform onPress={showMy} style={styles.touchable}>
          <View style={styles.button}>
            <Image
              source={require('~/images/chat-bubble2-outline.png')}
              style={{height: 16, width: 16}}
            />
            <CustomTextMedium size={14} color="#898989">
              내 피드
            </CustomTextMedium>
          </View>
        </TouchableByPlatform>
      </View>
      {toggle === true ? (
        <Image
          source={require('~/images/test-user-profile-girl.png')}
          style={{height: dw / 1.618, width: dw}}
        />
      ) : (
        <View style={{height: 0}} />
      )}
      <View style={styles.lastDivider} />
    </View>
  );
};
const styles = StyleSheet.create({
  myfeed: {
    width: dw,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    paddingVertical: 10,
  },
  horizontalDivider: {
    backgroundColor: '#D9D9D9',
    color: '#D9D9D9',
    width: dw * 0.9,
    height: 1,
    marginTop: 2,
    marginLeft: 12,
    marginRight: 12,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDDDDD',
  },
  actionDiv: {
    backgroundColor: 'white',
    width: dw * 0.9,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    alignItems: 'center',
  },
  touchable: {},
  button: {
    height: 40,
    width: dw * 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastDivider: {
    backgroundColor: palette.default_bg,
    color: '#D9D9D9',
    width: dw,
    height: 10,
  },
});

export default MyFeedManage;
