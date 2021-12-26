import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screen/LoginScreen';
import HomeScreen from './app/screen/HomeScree';
import NotificationScreen from './app/screen/NotificationScreen';
import ProfileScreen from './app/screen/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function MyDrawer(){
  return(
    <Drawer.Navigator>
       <Stack.Screen name="HomeScreen" component={HomeScreen}/>
       <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Drawer.Navigator>
  );
}


function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
       <Stack.Screen name="Home" component={MyDrawer} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

class App extends Component {
  render() {
    return(
      <MyStack/>
    )
  }
}

export default App;