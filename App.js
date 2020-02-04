import React from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <View style={{flex: 1}} forceInset={{top: 'always'}}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default App;
