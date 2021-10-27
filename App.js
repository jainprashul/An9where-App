import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import  Header  from './components/Header';
import Favorites from './screens/Favorites';
import AnimeDetail from './screens/AnimeDetail';
import Home from './screens/Home';
import Episode from './screens/Episode';
import Genre from './screens/Genre';
import Search from './components/Search';
import { SafeAreaProvider } from 'react-native-safe-area-context';


 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: '#3399FF',
          }}>
          <Stack.Screen name="Home"
            options={{
              headerTitle: () => <Header title="An9where" />,
            }} component={Home} />
          <Stack.Screen name="Favorites" component={Favorites} />
          <Stack.Screen name="AnimeDetail" component={AnimeDetail} />
          <Stack.Screen name="Genre" component={Genre} />
          <Stack.Screen name="Episode" component={Episode} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Search" component={Search} options={{
            headerShown: false,
          }} />
          {/* <Stack.Screen name="NotFound" component={() => <Text>Not Found</Text>} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  header: {
    
  },
});
