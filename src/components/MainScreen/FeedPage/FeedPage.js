import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Alert, Modal} from 'react-native';
import palette from '~/lib/styles/palette';
import ProfileCardList from './ProfileCardList';
import LikeMatchingList from './LikeMatchingList';
import MyFeedManage from './MyFeedManage';
import {Content, Container} from 'native-base';
import axios from 'axios';
import SendChatting from '~/components/common/SendChatting';

const FeedPage = props => {
  const [myFeedManageProp, setMyFeedManageProp] = useState([]);
  const [myFeed, setMyFeed] = useState([]);
  const [likeMatchingProp, setLikeMatchingProp] = useState([]);
  const [profileCardProp, setProfileCardProp] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState('asd');

  const [hasProfile, setHasProfile] = useState(false);

  const [] = useState([]);
  useEffect(() => {
    let innerHasProfile = false;
    props.navigation.addListener(
      'didFocus',
      () => {
        if (!hasProfile) return;

        let tmp = [];
        setProfileCardProp(tmp);
        axios
          .get('http://13.124.126.30:8000/core/feeds/')
          .then(result => {
            let count = 0;
            result.data.map((item, index) => {
              if (item.feed_list.length === 0) {
              } else {
                tmp[count] = item;
                count++;
              }
            });
            setProfileCardProp(tmp);
          })
          .then(() => {
            // console.log('axios done');
          });
      },
      // run function that updates the data on entering the screen
    );
    //axios for myfeedmanage
    axios
      .get('http://13.124.126.30:8000/authorization/user/info/')
      .then(item => {
        setMyFeedManageProp(item.data);
        if (item.data.avata !== null) {
          // console.log('avata::::');
          // console.log(item.data.avata);
          setHasProfile(true);
          innerHasProfile = true;
        }
        let tmpUrl =
          'http://13.124.126.30:8000/core/feed/' + item.data.uid + '/';
        return tmpUrl;
      })
      .then(url => {
        axios.get(url).then(result => {
          // console.log('myfeedmanage 1st axios done');
          // console.log(result.data);
          let tmpFeed = [];
          let count = 0;
          result.data.map(item => {
            tmpFeed[count] = item;
            count++;
          });
          tmpFeed.reverse();
          setMyFeed(tmpFeed);
        });
      })
      .then(() => {
        // console.log('myfeedmanage axios done');
      });

    //axios for likematchning
    axios.get('http://13.124.126.30:8000/core/both_like/').then(result => {
      let tmpBothLike = [];
      result.data.map((item, index) => {
        tmpBothLike[index] = item;
      });
      setLikeMatchingProp(tmpBothLike);
    });
    axios
      .get('http://13.124.126.30:8000/core/feeds/')
      .then(result => {
        let tmp = [];
        let count = 0;

        result.data.map((item, index) => {
          if (item.feed_list.length === 0) {
          } else {
            tmp[count] = item;
            count++;
          }
        });
        //있는애들은 2개만보여주기
        // console.log('innerhas ::: ??? ' + innerHasProfile);
        if (innerHasProfile === false) {
          // console.log(tmp);
          // console.log(innerHasProfile);
          setProfileCardProp(tmp.slice(0, 2));
        } else {
          setProfileCardProp(tmp);
        }
      })
      .then(() => {
        // console.log('axios done');
      });
    //axios for profilecard
  }, [props.navigation, modalVisible]);

  return (
    <View style={styles.root}>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <SendChatting setModalVisible={setModalVisible} />
      </Modal>

      <Container style={styles.container}>
        <Content
          onMomentumScrollBegin={() => {
            console.log(hasProfile);
            hasProfile === false
              ? Alert.alert(
                  '프로필 등록하면 모든 유저 피드 다볼수있다?',
                  '',
                  [
                    {
                      text: '지금 할래요',
                      onPress: () => {
                        props.navigation.navigate('MyProfile');
                        console.log('profile~~');
                      },
                    },
                    {
                      text: '안하고 안본다 더러워서 쳇',
                      onPress: () => console.log('NOPE'),
                    },
                  ],
                  {cancelable: false},
                )
              : null;
          }}
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          {hasProfile === true ? (
            <MyFeedManage
              navigation={props.navigation}
              myFeedManageProp={myFeedManageProp}
              myFeed={myFeed}
              setMyFeed={setMyFeed}
            />
          ) : null}
          <LikeMatchingList
            navigation={props.navigation}
            likeMatchingProp={likeMatchingProp}
          />
          <ProfileCardList
            navigation={props.navigation}
            profileCardProp={profileCardProp}
            hasProfile={hasProfile}
            setModalUrl={setModalVisible}
            setModalVisible={setModalVisible}
          />
        </Content>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: palette.default_bg,
  },
  innerView: {
    flexDirection: 'column',
  },
  dividerLine: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    height: 0.5,
    marginTop: 12,
  },
});
export default FeedPage;
