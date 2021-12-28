import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screen/LoginScreen';
import HomeScreen from './app/screen/HomeScree';
import NotificationScreen from './app/screen/NotificationScreen';
import ProfileScreen from './app/screen/ProfileScreen';
import SplashScreen from './app/screen/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { GoogleSignin,GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function MyDrawer(){
  return(
    <Drawer.Navigator>
       <Stack.Screen name="HomeScreen" component={HomeScreen}/>
       <Stack.Screen name="Profile" component={ProfileScreen}/>
       <Stack.Screen name="Notification" component={NotificationScreen}/>
       <Stack.Screen name="SignOut" component={SignOut}/>
    </Drawer.Navigator>
  );
}


function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
       <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
       <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
       <Stack.Screen name="Home" component={MyDrawer} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const SignOutFun = async (navigation) => {
  try {
    await GoogleSignin.signOut();
    try {
      await AsyncStorage.setItem('idToken', "")
      await AsyncStorage.setItem('email', "")
      await AsyncStorage.setItem('familyName', "")
      await AsyncStorage.setItem('givenName',"")
      await AsyncStorage.setItem('id', "")
      await AsyncStorage.setItem('name', "")
      await AsyncStorage.setItem('photo', "")
      await AsyncStorage.setItem('session',"false")

    } catch (e) {
      console.log("Error",e.message);
    }
  } catch (error) {
    console.error(error);
  }
};

class SignOut extends Component{
  render(){
    return(<SignOutFun/>)
  }
}

class App extends Component {
  render() {
    return(
      <MyStack/>
    )
  }
}

export default App;