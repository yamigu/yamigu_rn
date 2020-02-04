import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation style={{flex: 1}} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
