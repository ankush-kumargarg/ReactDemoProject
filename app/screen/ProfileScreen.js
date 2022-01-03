import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Permission,
  PermissionsAndroid,
  Platform,
  TouchableHighlight,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {BottomSheet} from 'react-native-btr';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      permission: false,
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      name: null,
      email: null,
      photo: null,
      visible: false,
    };
    this.getDetail();
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.CAMERA'] &&
          result['android.permission.READ_EXTERNAL_STORAGE'] &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          this.setState({
            permission: true,
          });
        } else if (
          result['android.permission.CAMERA'] ||
          result['android.permission.READ_EXTERNAL_STORAGE'] ||
          result['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            'never_ask_again'
        ) {
          this.refs.toast.show(
            'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
          );
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
          title: 'Choose file from Custom Option',
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

    ImagePicker.launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.assets[0].uri,
        });
      }
    });
  };

  imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = {uri: res.uri};
        console.log('response', JSON.stringify(res.uri));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.assets[0].uri,
        });
      }
    });
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri: 'https://i.picsum.photos/id/591/536/354.jpg?hmac=JJufazbV6l8gm7aJ-01jHtioxHo0JJ63J7CsUUl-r80',
          }}
          style={styles.images}
        />
      );
    }
  }

  renderFileUri() {
    return (
      <TouchableOpacity
        onPress={this.toggleBottomNavigationView}
        style={[
          styles.profileImgContainer,
          {borderColor: 'green', borderWidth: 1},
        ]}>
        <Image source={{uri: this.state.fileUri}} style={styles.profileImg} />
      </TouchableOpacity>
    );
  }

  toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    if (this.state.visible) {
      this.setState({visible: false});
    } else {
      this.setState({visible: true});
    }
  };

  async getDetail() {
    try {
      const name = await AsyncStorage.getItem('name');
      console.log('name', name);
      this.setState({name: name});
      const email = await AsyncStorage.getItem('email');
      console.log('email', email);
      this.setState({email: email});
      const photo = await AsyncStorage.getItem('photo');
      console.log('photo', photo);
      this.setState({photo: photo});
    } catch (e) {
      console.log('error', e.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>{this.renderFileUri()}</View>
        <View style={styles.container}>
          <BottomSheet
            visible={this.state.visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={this.toggleBottomNavigationView}
            //Toggling the visibility state
            onBackdropPress={this.toggleBottomNavigationView}
            //Toggling the visibility state
          >
            {/*Bottom Sheet inner View*/}
            <View style={styles.bottomNavigationView}>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 13,
                    fontSize: 20,
                    backgroundColor: 'white',
                    width: '100%',
                    color: 'black',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}>
                  Select Option
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.state.permission == true
                      ? this.cameraLaunch()
                      : this.requestCameraPermission();
                    this.toggleBottomNavigationView();
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 13,
                      fontSize: 20,
                      backgroundColor: 'white',
                      width: '100%',
                      color: 'black',
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.imageGalleryLaunch();
                    this.toggleBottomNavigationView();
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 13,
                      fontSize: 20,
                      backgroundColor: 'white',
                      width: '100%',
                      color: 'black',
                    }}>
                    Import from Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheet>
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
    backgroundColor: '#fff',
  },
  textStyle: {
    marginTop: 20,
    color: '#000000',
    fontSize: 20,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
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
  bottomNavigationView: {
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
