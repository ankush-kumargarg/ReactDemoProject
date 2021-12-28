import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

//import basic react native components
import { BottomSheet } from 'react-native-btr';

//import to show social icons
import { SocialIcon } from 'react-native-elements';

export default class Notification extends React.Component {

  constructor(props){
    super(props);
    this.state={
      visible:false
    };
  }

 toggleBottomNavigationView = ()=> {
    //Toggling the visibility state of the bottom sheet
    if(this.state.visible){
      this.setState({visible:false})
    }else{
      this.setState({visible:true})
    }
 
  }

  render(){
    return (
    
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center'
          }}>
          Example of Bottom Sheet in React Native
        </Text>
        <Button
          onPress={this.toggleBottomNavigationView}
          //on Press of the button bottom sheet will be visible
          title="Show Bottom Sheet"
        />
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
            <View style={{
                flex: 1,
                width:"100%",
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 13,
                  fontSize: 20,
                  backgroundColor:'white',
                  width:'100%',
                  color:'black',
                  borderTopLeftRadius:10,
                  borderTopRightRadius:10
                }}>
                Select Option 
              </Text>
            </View>
            <View style={{
                flex: 1,
                width:"100%",
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 13,
                  fontSize: 20,
                  backgroundColor:'white',
                  width:'100%',
                  color:'black',
                 
                }}>
                Camera
              </Text>
            </View>
            <View style={{
                flex: 1,
                width:"100%",
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 13,
                  fontSize: 20,
                  backgroundColor:'white',
                  width:'100%',
                  color:'black',
                  
                }}>
                Import from Gallery
              </Text>
            </View>
            
          </View>
        </BottomSheet>
      </View>
  );
  }
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    marginLeft:10,
    marginRight:10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
});