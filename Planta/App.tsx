/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Login from './src/component/news/user/screen/Login';



import AppNavigation from './src/component/navigation/AppNavigation';
import { UserProvider } from './src/component/news/user/UserContext';

function App(): React.JSX.Element {


  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <AppNavigation />
      </UserProvider>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor :'#fff',
    width: '100%',
    height: '100%',
  }
});

export default App;
