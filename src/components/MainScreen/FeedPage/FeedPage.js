import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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

  const [] = useState([]);
  useEffect(() => {
    //axios for myfeedmanage
    axios
      .get('http://13.124.126.30:8000/authorization/user/info/')
      .then(item => {
        setMyFeedManageProp(item.data);
        let tmpUrl =
          'http://13.124.126.30:8000/core/feed/' + item.data.uid + '/';
        return tmpUrl;
      })
      .then(url => {
        axios.get(url).then(result => {
          // console.log('myfeedmanage 1st axios done');
          console.log(result.data);
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
      .then(() => console.log('myfeedmanage axios done'));

    //axios for likematchning
    axios.get('http://13.124.126.30:8000/core/both_like/').then(result => {
      let tmpBothLike = [];
      result.data.map((item, index) => {
        tmpBothLike[index] = item;
      });
      setLikeMatchingProp(tmpBothLike);
    });

    //axios for profilecard
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
        setProfileCardProp(tmp);
      })
      .then(() => console.log('axios done'));
  }, []);

  return (
    <View style={styles.root}>
      <Container style={styles.container}>
        <Content
          contentContainerStyle={styles.innerView}
          showsVerticalScrollIndicator={false}>
          <MyFeedManage
            navigation={props.navigation}
            myFeedManageProp={myFeedManageProp}
            myFeed={myFeed}
            setMyFeed={setMyFeed}
          />
          <LikeMatchingList
            navigation={props.navigation}
            likeMatchingProp={likeMatchingProp}
          />
          <ProfileCardList
            navigation={props.navigation}
            profileCardProp={profileCardProp}
          />
          <View style={styles.lastScroll} />
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
  lastScroll: {
    height: 20,
    flex: 1,
  },
});
export default FeedPage;
