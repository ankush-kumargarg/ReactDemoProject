import React, { Component } from 'react';
import { Text , StatusBar, View, StyleSheet,style,TextInput,Button} from 'react-native';
import { GoogleSignin,GoogleSigninButton, statusCodes,} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '29711772311-mj4scrsm585gii6861kcel445ksd99m4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true,
    // if you want to access Google API on behalf of the user FROM YOUR SERVER
     // [Android] related to `serverAuthCode`, read the docs link below *.
  });

class LoginScreen extends Component {
    constructor(props){
        super(props);
    }

    signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log("userInfo=",userInfo);
          this.setState({ userInfo });
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
              <Text style={styles.login_text}>Login</Text>
              <TextInput style={styles.input_field_style} placeholder='Username'/>
              <TextInput style={styles.input_field_style} placeholder='Password'/>
              <Text onPress={()=>this.props.navigation.navigate('Home')} style={styles.button_style}>Login</Text>
              <GoogleSigninButton style={styles.google_button_style}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"blue"
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
        marginTop:30,
        borderWidth:1,
        paddingLeft:10,
        borderRadius:20
    },
    button_style:{
        marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        width:"100%",
        borderRadius:20,
        backgroundColor:"blue",
        color:"white",
        textAlign:'center',
    },
    google_button_style:{
        marginTop:20,
        width:"100%",
    }
  });

export default LoginScreen;