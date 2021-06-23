import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SearchScreen from './src/screens/Search/SearchScreen';
import DetailScreen from './src/screens/Details/DetailScreen';

// import {Provider as ProfileProvider} from './src/context/ProfileContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <ProfileProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen} />
        <Stack.Screen options={{headerTitle: 'Memerships'}} name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </ProfileProvider>
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
