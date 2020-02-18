import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {CustomTextMedium} from '../common/CustomText';
import palette from '~/lib/styles/palette';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from 'react-native-best-viewpager';
import TouchableByPlatform from '../common/TouchableByPlatform';

const MyFeedView = ({navigation}) => {
  const _renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={styles.dot}
        selectedDotStyle={styles.selectedDot}
        style={styles.indicator}
      />
    );
  }; // for viewpage indicator

  return (
    <View style={styles.container}>
      <CustomTextMedium
        size={18}
        color={palette.black}
        style={{marginLeft: 30, marginBottom: 20}}>
        내 피드
      </CustomTextMedium>
      <IndicatorViewPager
        style={styles.viewPager}
        indicator={_renderDotIndicator()}>
        <Image
          style={styles.viewPage}
          key="1"
          source={require('~/images/test-user-profile-girl.png')}>
          {/* <View
              style={{
                height: dh,
                width: dw,
                backgroundColor: 'rgba(0,0,0,0.6)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomTextRegular color="white" size={20} style={styles.feedT}>
                {feedText}
              </CustomTextRegular>
            </View> */}
        </Image>
        <Image
          style={styles.viewPage}
          key="2"
          source={require('~/images/test-user-profile-7.png')}
        />
        <Image
          style={styles.viewPage}
          key="3"
          source={require('~/images/test-user-profile-8.png')}
        />
      </IndicatorViewPager>
    </View>
  );
};

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

const styles = StyleSheet.create({
  viewPage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  viewPager: {
    width: dw,
    height: dw / 1.618,
  },
  selectedDot: {
    backgroundColor: palette.orange[0],
  },
  indicator: {
    width: dw,
    position: 'absolute',
    top: dw / 1.618 - 20,
  },
});

export default MyFeedView;
