import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../color/Styles';
import {Wallet_Ladger_Api} from '../api/authApi';
import Toast from 'react-native-toast-message';

const Wallet = () => {
  const [walletAmount, setWalletAmount] = useState([]);

  useEffect(() => {
    getWalletAmount();
  }, []);

  const getWalletAmount = async () => {
    try {
      const response = await Wallet_Ladger_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setWalletAmount(response.data.user_wallet.wallet_amt);
        Toast.show({
          text1: 'Data loaded successfully',
          type: 'success',
        });
      } else {
        Toast.show({
          text1: 'Failed to load data!',
          type: 'error',
        });
      }
    } catch (error) {
      console.log('Error:', error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.headerRightContainer}>
      <Ionicons name="wallet" size={24} color="#fff" />
      <Text style={styles.walletAmount}>
        ₹ {walletAmount !== null ? walletAmount : 'Loading...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  walletAmount: {
    color: Colors.White,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Wallet;
