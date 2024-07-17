import {Image, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Login_Api} from '../api/authApi';
import Toast from 'react-native-toast-message';
import { Colors } from '../color/Styles';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkForToken(); 
  }, []);

  const checkForToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    
    if (token) {
      navigation.navigate('Bottom');
    }
  };

  const handleLoginPress = async () => {
    try {
      if (!username || !password) {
        Toast.show({
          text1: 'Please enter both username and password',
          type: 'error',
        });
        return;
      }

      console.log('Username:', username);
      console.log('Password:', password);

      const response = await Login_Api(username, password);
      console.log(response);
      if (response.msg === 'User logged in successfully.') {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem('email', response.data.email);
        await AsyncStorage.setItem('Username', response.data.username);
        await AsyncStorage.setItem('mobile', response.data.mobile);
        await AsyncStorage.setItem('address', response.data.address);

        Toast.show({
          text1: 'Login Successfull',
          type: 'success',
        });

        navigation.navigate('Bottom');
      } else {
        Toast.show({
          text1: 'Failed to login',
          type: 'error',
        });
      }
    } catch (error) {
      console.log('Login Error:', error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require('../assets/Images/logo.jpeg')}
        />
        <View style={styles.textinputview}>
          <View>
            <View style={{position: 'absolute', top: 30, left: 12, zIndex: 1}}>
              <MaterialCommunityIcons
                name="cellphone"
                size={25}
                color="#385dab"
              />
            </View>
            <TextInput
              label="Enter Your Username"
              value={username}
              onChangeText={text => setUsername(text)}
              style={[styles.textinput, {paddingLeft: 20}]}
              mode="outlined"
            />
          </View>
          <View>
            <View style={{position: 'absolute', top: 30, left: 12, zIndex: 1}}>
              <MaterialCommunityIcons name="lock" size={25} color="#385dab" />
            </View>
            <TextInput
              label="Enter Your Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={[styles.textinput, {paddingLeft: 20}]}
              mode="outlined"
              secureTextEntry={true}
            />
          </View>
        </View>
        <Button title="Login" onPress={handleLoginPress} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  logo: {
    height: '30%',
    aspectRatio: 2.5,
    width: '100%',
    marginVertical: '6%',
  },
  textinput: {
    marginBottom: 10,
    margin: 10,
  },
});
