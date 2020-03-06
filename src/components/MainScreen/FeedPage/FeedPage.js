import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
import {Spinner} from 'native-base';
import palette from '~/lib/styles/palette';
import ProfileCardList from './ProfileCardList';
import LikeMatchingList from './LikeMatchingList';
import MyFeedManage from './MyFeedManage';
import {Content, Container} from 'native-base';
import axios from 'axios';

const FeedPage = props => {
  const [myFeedManageProp, setMyFeedManageProp] = useState([]);
  const [myFeed, setMyFeed] = useState([]);
  const [likeMatchingProp, setLikeMatchingProp] = useState([]);
  const [profileCardProp, setProfileCardProp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [tmpState, setTmpState] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const _scroll = useRef();

  const retrieveFeeds = () => {
    return new Promise((resolve, reject) => {
      //setProfileCardProp(feeds);
      axios
        .get('http://13.124.126.30:8000/core/feeds/')
        .then(result => {
          //   console.log(result.data);
          let data = [];
          let count = 0;
          result.data.map((item, index) => {
            if (item.feed_list.length === 0) {
            } else {
              if (hasProfile === false && count > 1) return;
              data[count] = item;
              count++;
              setProfileCardProp(data);
            }
          });

          resolve(true);
        })
        .catch(error => {
          console.log(error);
          resolve(null);
        });
    });
  };
  const retrieveBothLikes = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://13.124.126.30:8000/core/both_like/')
        .then(result => {
          let bothLike = [];
          result.data.map((item, index) => {
            bothLike[index] = item;
          });
          resolve(bothLike);
        })
        .catch(error => {
          resolve(null);
        });
    });
  };

  const retrieveLikeNum = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://13.124.126.30:8000/core/like_count/')
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          resolve(null);
        });
    });
  };
  const refre = async () => {
    setRefreshing(true);
    const emptyData = [];
    setProfileCardProp(emptyData);
    await retrieveFeeds();
    // if (feeds !== null) {
    //   if (hasProfile === false) {
    //     setProfileCardProp(feeds.slice(0, 2));
    //   } else {
    //     setProfileCardProp(feeds);
    //   }
    // }
    const bothLikes = await retrieveBothLikes();

    if (bothLikes !== null) {
      setLikeMatchingProp(bothLikes);
    }

    const likeNum = await retrieveLikeNum();
    if (likeNum !== null) {
      setLikeNum(likeNum);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    console.log('feedpage useeffect');

    // console.log('useEffected');
    let innerHasProfile = false;
    const listener = props.navigation.addListener('didFocus', () => {
      props.navigation.setParams({});
      axios
        .get('http://13.124.126.30:8000/authorization/user/info/')
        .then(item => {
          setMyFeedManageProp(item.data);
          if (item.data.avata !== null) {
            // console.log('avata::::');
            // console.log(item.data.avata);
            setHasProfile(true);
            innerHasProfile = true;
            console.log('hasprofile::::');
            console.log(innerHasProfile);
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
      if (!innerHasProfile) return;

      refre();
    });
    axios
      .get('http://13.124.126.30:8000/authorization/user/info/')
      .then(item => {
        setMyFeedManageProp(item.data);
        if (item.data.avata !== null) {
          // console.log('avata::::');
          // console.log(item.data.avata);
          setHasProfile(true);
          innerHasProfile = true;
          console.log('hasprofile::::');
          console.log(innerHasProfile);
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
    return () => listener.remove();
  }, []);

  return (
    <View style={styles.root}>
      {/* <Spinner visible={refreshing} textContent={'refreshing...'} /> */}
      <Container style={styles.container}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refre}
              // title="Loading..."
              tintColor={palette.gray}
            />
          }
          ref={_scroll}
          onMomentumScrollBegin={() => {
            // console.log(hasProfile);
            hasProfile === false
              ? Alert.alert(
                  '사진 한장만 등록하세요!',
                  '무제한 피드 + 보너스 야미 본인이 나온 프로필 사진이 필요해요',
                  [
                    {
                      text: '다음에',
                      onPress: () => console.log('NOPE'),
                    },
                    {
                      text: '사진등록',
                      onPress: () => {
                        props.navigation.navigate('MyProfile');
                        console.log('profile~~');
                      },
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
            likeNum={likeNum}
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
    position: 'absolute',
    zIndex: 2,
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
