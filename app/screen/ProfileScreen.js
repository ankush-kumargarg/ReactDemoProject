import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image,Permission, PermissionsAndroid, Platform, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage' 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      permission:false,
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: '',
      name:null,
      email:null,
      photo:null
    };
    this.getDetail();
  }

 requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA, 
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
          ).then((result) => {
            if ( result['android.permission.CAMERA']
            && result['android.permission.READ_EXTERNAL_STORAGE']
            && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
              this.setState({
                permission: true
              });
            } else if (result['android.permission.CAMERA']
            || result['android.permission.READ_EXTERNAL_STORAGE']
            || result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again') {
              this.refs.toast.show('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
            }
          });
      }

     /*if(Platform.OS==='android'){
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Cool Photo App Camera Permission",
                message:
                  "App needs access to your camera " +
                  "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
             this.setState({
                 permission:true
             });
            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }
     }*/
  };

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };

 

  // Launch Camera

  cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
       console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    });
  }

  imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (res) => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri
        });
      }
    })
  }  

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={{uri:'https://i.picsum.photos/id/591/536/354.jpg?hmac=JJufazbV6l8gm7aJ-01jHtioxHo0JJ63J7CsUUl-r80'}}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return 
      <TouchableHighlight
      style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]} >
      <Image source={{ uri: this.state.fileUri }} style={styles.profileImg} />
    </TouchableHighlight>
    } else {
      return <TouchableHighlight
      style={[styles.profileImgContainer, { borderColor: 'green', borderWidth:1 }]} >
      <Image source={{ uri:this.state.photo }} style={styles.profileImg} />
    </TouchableHighlight>
    }
  }
 async getDetail (){
    try{
      const name=await AsyncStorage.getItem('name');
      console.log("name",name);
      this.setState({name: name});
      const email=await AsyncStorage.getItem('email');
      console.log("email",email);
      this.setState({email: email});
      const photo=await AsyncStorage.getItem('photo');
      console.log("photo",photo);
      this.setState({photo: photo});
      }catch(e){
      console.log("error",e.message);
    
     } 
  }
  

  render() {
    
    return (
      <View style={styles.container}>
        <View>
           {this.renderFileUri()}
           <Text style={styles.textStyle}>Name: {this.state.name}</Text>
           <Text style={styles.textStyle}>Email: {this.state.email}</Text>
         </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.state.permission ? this.cameraLaunch : this.requestCameraPermission} style={styles.button}  >
              <Text style={styles.buttonText}>Launch Camera Directly</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.imageGalleryLaunch} style={styles.button}  >
              <Text style={styles.buttonText}>Launch Image Gallery Directly</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  textStyle:{
   marginTop:20,
   color:'#000000',
   fontSize:20,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

});