import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <Navigation style={{flex: 1}} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default App;
