import React, {useEffect} from 'react';
import {View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './Navigation';
import SplashScreen from 'react-native-splash-screen';
import {SampleProvider, SampleFunctionProvider} from '~/Context/Sample';
import {UserContextProvider} from '~/Context/UserContext';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <UserContextProvider>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </UserContextProvider>
  );
};

export default App;
