import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, Alert, Modal} from 'react-native';
import palette from '~/lib/styles/palette';
import ProfileCardList from './ProfileCardList';
import LikeMatchingList from './LikeMatchingList';
import MyFeedManage from './MyFeedManage';
import {Content, Container} from 'native-base';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const FeedPage = props => {
  const [myFeedManageProp, setMyFeedManageProp] = useState([]);
  const [myFeed, setMyFeed] = useState([]);
  const [likeMatchingProp, setLikeMatchingProp] = useState([]);
  const [profileCardProp, setProfileCardProp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [tmpState, setTmpState] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const _scroll = useRef();

  useEffect(() => {
    console.log('feedpage useeffect');

    // console.log('useEffected');
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
        console.log('new feed done');
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
        setRefreshing(false);
        console.log('effect done');
      });
    //axios for profilecard
  }, [props.navigation]);
  return (
    <View style={styles.root}>
      <Spinner visible={refreshing} textContent={'refreshing...'} />
      <Container style={styles.container}>
        <Content
          ref={_scroll}
          onMomentumScrollBegin={() => {
            // console.log(hasProfile);
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
          onMomentumScrollEnd={() => {}}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.y === 0) {
              console.log('now');
              setTmpState(!tmpState);
              // setRefreshing(true);
            }
          }}
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          {hasProfile === true ? (
            <MyFeedManage
              navigation={props.navigation}
              myFeedManageProp={myFeedManageProp}
              myFeed={myFeed}
              setMyFeed={setMyFeed}
              scroll={_scroll}
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
