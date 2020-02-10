import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {
  CustomTextMedium,
  CustomTextRegular,
} from '~/components/common/CustomText';
import palette from '~/lib/styles/palette';
import {Content, Button, Right, Left, List, ListItem, Body} from 'native-base';
import Octionicon from 'react-native-vector-icons/Octicons';

const deviceWidth = Dimensions.get('window').width;

const ShieldScreen = ({params}) => (
  <Content showsVerticalScrollIndicator={false} style={styles.root}>
    <View style={styles.container}>
      <CustomTextMedium size={18} color={palette.black}>
        혹시 아는 사람 만날까봐 걱정되시나요?
      </CustomTextMedium>
      <CustomTextRegular size={12} color={palette.gray} style={{marginTop: 2}}>
        피하고 싶은 이성이나 소속을 등록하면
      </CustomTextRegular>
      <CustomTextRegular size={12} color={palette.gray}>
        등록된 이성과 소속의 이성들은 회원님과 서로 볼 수 없습니다.
      </CustomTextRegular>
      <View style={styles.buttonView}>
        <Button style={styles.buttonSmall}>
          <CustomTextMedium size={14} color="white">
            번호 직접 등록
          </CustomTextMedium>
        </Button>
        <Button style={styles.buttonSmall}>
          <CustomTextMedium size={14} color="white">
            연락처 전체 등록
          </CustomTextMedium>
        </Button>
      </View>
      <Button style={styles.buttonBig}>
        <CustomTextMedium size={14} color={palette.orange}>
          피하고 싶은 소속 등록
        </CustomTextMedium>
      </Button>
      <CustomTextMedium size={18} color={palette.black}>
        등록된 번호/소속
      </CustomTextMedium>
    </View>
    <List style={styles.list}>
      {contact_data_list.map(contact => (
        <ListItem noIndent style={styles.listItem}>
          <Body>
            <CustomTextRegular size={16} color={palette.black}>
              {contact}
            </CustomTextRegular>
          </Body>
          <Right>
            <Octionicon name="x" style={styles.iconX} />
          </Right>
        </ListItem>
      ))}
    </List>
  </Content>
);
ShieldScreen.navigationOptions = ({navigation}) => ({
  headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
  headerTitle: () => (
    <CustomTextMedium size={16} color={palette.black}>
      아는 사람 피하기
    </CustomTextMedium>
  ),
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'center',
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
  container: {
    padding: 12,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    width: (deviceWidth - 24) * 0.4843,
    borderRadius: 5,
    backgroundColor: palette.orange,
    elevation: 0,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBig: {
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: 12,
    elevation: 0,
    borderColor: palette.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: palette.default_bg,
  },
  iconX: {
    width: 10,
    height: 10,
    color: palette.gray,
  },
});

const contact_data_list = ['내 연락처 모두 등록됨', '연세대', '010-4055-6243'];
export default ShieldScreen;
