import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Button from '../components/Button';

const Profilescreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [mail, setMail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const username = await AsyncStorage.getItem('Username');
        const mobile = await AsyncStorage.getItem('mobile');
        const userAddress = await AsyncStorage.getItem('address');

        if (email && username && mobile && userAddress) {
          setMail(email);
          setFullname(username);
          setMobilenumber(mobile);
          setAddress(userAddress);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 

  const Submit = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <View style={{ padding: 10 }}>
          <View>
            <Text style={styles.label}>Full Name</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="person" size={25} color="#385dab" />
            </View>
            <TextInput
              label="Full Name"
              value={fullname}
              onChangeText={text => setFullname(text)}
              style={[styles.textinput, { paddingLeft: 33 }]}
              mode="outlined"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Email</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="email" size={25} color="#385dab" />
            </View>
            <TextInput
              label="Email"
              value={mail}
              onChangeText={text => setMail(text)}
              style={[styles.textinput, { paddingLeft: 35 }]}
              mode="outlined"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="phone" size={25} color="#385dab" />
            </View>
            <TextInput
              label="Mobile Number"
              value={mobilenumber}
              onChangeText={text => setMobilenumber(text)}
              style={[styles.textinput, { paddingLeft: 35 }]}
              mode="outlined"
              maxLength={10}
              keyboardType='numeric'
            />
          </View>

          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.label}>Address</Text>
            <View style={{ position: 'absolute', top: 37, left: 6, zIndex: 1 }}>
              <MaterialIcons name="person" size={25} color="#385dab" />
            </View>
            <TextInput
              label="Address"
              value={address}
              onChangeText={text => setAddress(text)}
              style={[styles.textinput, { paddingLeft: 35 }]}
              mode="outlined"
            />
          </View>

          <Button title="Submit" onPress={Submit} />
        </View>
      </View>
    </View>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottom: {
    margin: 10,
    backgroundColor: '#e6e8eb',
    height: '96%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textinput: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 10,
    marginBottom: 5,
    color: '#000',
    fontSize: 16,
  },
});
