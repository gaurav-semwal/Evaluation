import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../color/Styles';
import {Wallet_Ladger_Api} from '../api/authApi';
import {useFocusEffect} from '@react-navigation/native';

const WalletLedgerScreen = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [walletHistory, setWalletHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getWalletLedger(fromDate, toDate);
    }, []),
  );

  // useEffect(() => {
  //   getWalletLedger(fromDate, toDate);
  // }, []);

  const getWalletLedger = async (fromDt, toDt) => {
    try {
      const formattedFromDate = formatDate(fromDt);
      const formattedToDate = formatDate(toDt);
      const response = await Wallet_Ladger_Api(
        formattedFromDate,
        formattedToDate,
      );
      console.log('G A U R A V', response.data);
      if (response.msg === 'Data loaded successfully.') {
        const user = response.data.user_wallet;
        const history = response.data.expenses.map((item, index) => ({
          key: index.toString(),
          date: item.created_at,
          name: item.name || user.name,
          mobile: user.mobile,
          email: user.email,
          address: `${user.address}, ${user.city} ${user.state}`,
          credit: item.credit_amount || 'N/A',
          debit: item.debit_amount || item.amount || 'N/A',
          role: user.role,
        }));
        setWalletHistory(history);
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

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const formatDate = date => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    getWalletLedger(fromDate, toDate);
  };

  const renderItem = ({item}) => (
    <View style={styles.userInfoContainer}>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Date : {item.date}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <Text style={styles.label}>Name : {item.name}</Text>
      <Text style={styles.label}>Mobile No. : {item.mobile}</Text>
      <Text style={styles.label}>Email ID : {item.email}</Text>
      <Text style={styles.label}>Address : {item.address}</Text>
      <Text style={[styles.label, styles.creditText]}>Credit Amount : {item.credit}</Text>
      <Text style={[styles.label, styles.debitText]}>
        Debit Amount : ₹ {item.debit}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setShowFromDatePicker(true)}
          style={{width: '40%', justifyContent: 'space-between'}}>
          <TextInput
            label="From Date"
            value={formatDate(fromDate)}
            mode="outlined"
            editable={false}
          />
          <Fontisto name="date" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowToDatePicker(true)}
          style={{width: '40%', justifyContent: 'space-between'}}>
          <TextInput
            label="To Date"
            value={formatDate(toDate)}
            mode="outlined"
            editable={false}
          />
          <Fontisto name="date" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
        <Icon
          name="magnify"
          size={26}
          // style={styles.searchIcon}
          color={Colors.White}
        />
         </TouchableOpacity>
      </View>

      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={onFromDateChange}
        />
      )}
      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={onToDateChange}
        />
      )}

      <FlatList
        data={walletHistory}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  inputContainer: {
    marginHorizontal: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '4%',
  },
  userInfoContainer: {
    padding: 12,
    backgroundColor: '#d0ddf2',
    marginHorizontal: 4,
    borderRadius: 5,
    elevation: 17,
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '700',
    marginTop: 10,
    textShadowColor: Colors.Dusk_Black,
  },
  debitText:{
    color: 'red',
    fontWeight: 'bold',
    // marginTop: 10,
  },
  creditText:{
    color: 'green',
    fontWeight: 'bold',
    marginTop: 20,
  },
  role: {
    fontWeight: 'bold',
    marginTop: 1,
    marginLeft: 'auto',
    color: Colors.Dusk_Blue,
    fontSize: 18,
  },
  searchIcon: {
    marginRight: '4%',
    backgroundColor: Colors.Dusk_Blue,
    borderRadius: 50,
    padding: 6,
    // paddingRight: 10
  },
  flatListContent: {
    paddingBottom: 20,
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: '30%',
    marginRight: 8,
  },
});

export default WalletLedgerScreen;
