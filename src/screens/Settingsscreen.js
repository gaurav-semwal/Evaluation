import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Modal, Pressable} from 'react-native';
import Button from '../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../color/Styles';
// import { profileapi ,changepasswordapi} from '../Service/Apis';
// import { Colors } from '../Comman/Styles';
// import Header from '../Component/Header';

const Settingsscreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [passwordmodal, setpasswordmodal] = useState(false);
  const [password, setpassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('Username');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedMobile = await AsyncStorage.getItem('mobile');
        const storedProfileImage = await AsyncStorage.getItem('profileImage'); // Assuming profile image URL is stored

        if (storedUsername && storedEmail && storedMobile) {
          setUsername(storedUsername);
          setEmail(storedEmail);
          setMobile(storedMobile);
          setProfileImage(storedProfileImage); // Update profile image state
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handlepassword = () => {
    setpasswordmodal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalpassword = () => {
    setpasswordmodal(false);
  };

  const Profile = () => {
    navigation.navigate('My Profile');
  };

  const navigatescreen = () => {
    navigation.navigate('Login');
  };

  const handleConfirmLogout = () => {
    // Handle logout logic here
    setShowModal(false);
    navigatescreen(); // Navigate to login screen
  };

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    const initials = nameArray.map(n => n[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileContainer} onPress={Profile}>
        <View style={styles.imagecontent}>
          {profileImage ? (
            <Image
              style={styles.profileImage}
              source={{uri: profileImage}}
            />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials(username)}</Text>
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.infoText}>{username}</Text>
            <Text style={styles.infoText}>{mobile}</Text>
            <Text style={styles.infoText}>{email}</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.bottomcontainer}>
        <Pressable style={styles.bottom} onPress={Profile}>
          <View style={styles.textrow}>
            <Ionicons name="person" size={24} color="#385dab" />
            <Text style={styles.text}>My Profile</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#385dab" />
        </Pressable>

        <View style={styles.horizontalLine}></View>

        <Pressable style={styles.bottom} onPress={() => handlepassword()}>
          <View style={styles.textrow}>
            <Ionicons name="lock-closed" size={24} color="#385dab" />
            <Text style={styles.text}>Change Password</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#385dab" />
        </Pressable>

        <View style={styles.horizontalLine}></View>

        <Pressable onPress={() => handleLogout()} style={styles.bottom}>
          <View style={styles.textrow}>
            <AntDesign name="logout" size={24} color="#385dab" />
            <Text style={styles.text}>Logout</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#385dab" />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => handleCloseModal()}>
        <View
          style={[
            styles.centeredView,
            {justifyContent: 'center', padding: 10},
          ]}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout app?
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{width: '50%'}}>
                <Button title="No" onPress={() => handleCloseModal()} />
              </View>
              <View style={{width: '50%'}}>
                <Button title="Yes" onPress={() => handleConfirmLogout()} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordmodal}
        onRequestClose={() => handleCloseModalpassword()}>
        <View style={[styles.centeredView, {justifyContent: 'flex-end'}]}>
          <View style={styles.modalView1}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View></View>
              <Text style={styles.modalText}>Change Password</Text>
              <Pressable onPress={() => handleCloseModalpassword()}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={30}
                  color="#385dab"
                />
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: 'column',
                width: '90%',
                justifyContent: 'space-between',
              }}>
              <View>
                <View
                  style={{position: 'absolute', top: 20, left: 6, zIndex: 1}}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={25}
                    color="#385dab"
                  />
                </View>
                <TextInput
                  label="Enter Your Password"
                  value={password}
                  mode="outlined"
                  onChangeText={setpassword}
                  style={styles.textinput}
                />
              </View>
              <Pressable
                onPress={() => handleConfirmLogout()}
                style={{marginTop: 15}}>
                <Button title="Submit" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settingsscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  profileContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.White,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagecontent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.Dusk_Blue,
  },
  initialsContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: Colors.Dusk_Blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: Colors.White,
    fontSize: 50,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 15,
  },
  infoText: {
    fontSize: 14,
    color: Colors.Dusk_Blue,
    marginBottom: 8,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  textrow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.Dusk_Blue,
    marginLeft: 10,
  },
  textinput:{
    paddingLeft: 20,
    backgroundColor: '#fff'
  },
  bottomcontainer: {
    margin: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    height: '25%',
  },
  modalView1: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    height: '34%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '700',
  },
});
