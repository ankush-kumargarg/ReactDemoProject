import React from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    console.log('sessionSplash', await AsyncStorage.getItem('session'));
    if (data !== null) {
      try {
        if ((await AsyncStorage.getItem('session')) === 'true') {
          this.props.navigation.navigate('Home');
        } else {
          this.props.navigation.navigate('Login', {name: 'Ankush'});
        }
      } catch (e) {
        console.log('error', e.message);
        this.props.navigation.navigate('Login', {name: 'Ankush'});
      }
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>Splash</Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
};

export default SplashScreen;
