import React, { Component } from 'react';
import { Text , StatusBar, View, StyleSheet,style,TextInput,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage' 
import { GoogleSignin,GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';
import {useRoute} from '@react-navigation/native';

GoogleSignin.configure({
    webClientId: '29711772311-mj4scrsm585gii6861kcel445ksd99m4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true,
  });


  
class LoginScreen extends Component {
    constructor(props){
        super(props);
        console.log("props",props);
        console.log("props",props.route.params.name);
        this.state={
          isLogging:false,
          name:null,
        }
    }

    getRouterParams=()=>{
      const route = useRoute();
      const params= route.params.name;
      this.setState({
       name:params
     })
   }

    signIn = async () => {
      console.log("session", await AsyncStorage.getItem('session'));
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log("userInfo=",userInfo);
          this.setState({ userInfo });
          try {
            await AsyncStorage.setItem('idToken', userInfo.idToken)
            await AsyncStorage.setItem('email', userInfo.user.email)
            await AsyncStorage.setItem('familyName', userInfo.user.familyName)
            await AsyncStorage.setItem('givenName', userInfo.user.givenName)
            await AsyncStorage.setItem('id', userInfo.user.id)
            await AsyncStorage.setItem('name', userInfo.user.name)
            await AsyncStorage.setItem('photo', userInfo.user.photo)
            await AsyncStorage.setItem('session',"true")
           this.setState({
             isLogging:true
           })
          } catch (e) {
            console.log("Error",e.message);
          }
          console.log("session", await AsyncStorage.getItem('session'));
          } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("SIGN_IN_CANCELLED=",error.message);
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log("IN_PROGRESS=",error.message);
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log("PLAY_SERVICES_NOT_AVAILABLE=",error.message);
          } else {
            console.log("DeveloperError=",error.message);
          }
        }
      };

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.welcome_text_container}>
          <Text style={styles.welcome_text}>Welcome</Text>
        </View>
        <View style={styles.bottom_container}>
            <View style={styles.inner_container}> 
              <Text style={styles.login_text}>Login{this.props.route.params.name}</Text>
              <TextInput style={styles.input_field_style} placeholder='Username'/>
              <TextInput style={styles.input_field_style} placeholder='Password'/>
              <Text onPress={()=>this.props.navigation.navigate('Home')} style={styles.button_style}>Login</Text>
              <GoogleSigninButton style={styles.google_button_style}
              size={GoogleSigninButton.Size.Wide}
              onPress={() =>{this.state.isLogging==true ? this.props.navigation.navigate('Home') : this.signIn()}}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#e28743"
    },
    welcome_text_container: {
      height:"30%",
      justifyContent:'flex-end',
      marginBottom:30,
      marginLeft:30
    },
    welcome_text: {
        flex:1,
        alignItems: 'center',
        color:"white",
        fontSize:40,
        position:'absolute',
    },
    bottom_container:{
      height:"70%",
      backgroundColor:"white",
      borderTopLeftRadius:60,
      borderTopRightRadius:60,
    },
    login_text:{
        fontSize:30,
        color:"black",  
    },
    inner_container:{
        marginLeft:30,
        marginTop:30,
        marginRight:30,
    },
    input_field_style:{
        marginTop:15,
        borderWidth:1,
        paddingLeft:10,
        borderRadius:20
    },
    button_style:{
        marginTop:20,
        paddingTop:10,
        paddingBottom:10,
        width:"100%",
        borderRadius:20,
        backgroundColor:"#e28743",
        color:"white",
        textAlign:'center',
    },
    google_button_style:{
        marginTop:20,
        width:"100%",
    }
  });

export default LoginScreen;