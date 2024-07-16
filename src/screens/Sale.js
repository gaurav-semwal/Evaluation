import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Customers_Api, Get_Sales_Api} from '../api/authApi';
import {Colors} from '../color/Styles';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

const Sale = ({navigation}) => {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [salesData, setSalesData] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      getCustomer();
    }, []),
  );

  const onPressPlusButton = () => {
    navigation.navigate('Add Sales');
  };

  const getCustomer = async () => {
    try {
      const response = await Customers_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setCustomer(response.data);
      } else {
        Toast.show({
          text1: response.msg,
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

  const getInvoice = async customerId => {
    try {
      const response = await Get_Sales_Api(customerId);
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setSalesData(response.data);
      } else {
        Toast.show({
          text1: response.msg,
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

  
  useFocusEffect(
    React.useCallback(() => {
      getCustomer();
      if (selectedCustomer) {
        getInvoice(selectedCustomer); 
      }
    }, [selectedCustomer])
  );

  const handleCustomer = itemValue => {
    setSelectedCustomer(itemValue);
    getInvoice(itemValue);
  };
  const navigateedit = item => {
    navigation.navigate('Edit Sales', {itemId: item.id});
  };

  const renderItem = ({item}) => (
    <View style={styles.invoiceItem}>
      <View style={styles.contentbottom}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceText}>Invoice : </Text>
          <Text style={styles.invoiceText1}>{item.invoice}</Text>
        </View>
        <Text style={styles.status}>{item.payment_status}</Text>
      </View>
      <View style={styles.contentbottom}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceText}>GST Type : </Text>
          <Text style={styles.invoiceText1}>{item.gst_type}</Text>
        </View>
      </View>
      <View style={styles.contentbottom}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceText}>Billed Status : </Text>
          <Text style={styles.invoiceText1}>{item.is_billed}</Text>
        </View>
      </View>

      <View style={styles.contentbottom}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceText}>Due Date: </Text>
          <Text style={styles.invoiceText1}>{item.due_date}</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.White,
            borderRadius: 50,
            alignItems: 'center',
            padding: 3,
          }}
          onPress={() => navigateedit(item)}>
          <MaterialCommunityIcons
            name="playlist-edit"
            size={26}
            color="black"
          />
        </Pressable>
      </View>

      <View style={styles.button}>
        <Pressable
          style={styles.button1}
          onPress={() => Linking.openURL(item.admin_copy)}>
          <MaterialCommunityIcons
            name="eye"
            size={24}
            color="black"
            style={{marginRight: 5}}
          />
          <Text style={styles.buttontext}>Admin Invoice</Text>
        </Pressable>
        <Pressable
          style={styles.button1}
          onPress={() => Linking.openURL(item.customer_copy)}>
          <MaterialCommunityIcons
            name="eye"
            size={24}
            color="black"
            style={{marginRight: 5}}
          />
          <Text style={styles.buttontext}>Customer Invoice</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCustomer}
          style={styles.picker}
          onValueChange={handleCustomer}>
          <Picker.Item label="Select Customer" value="" />
          {customer.map((src, index) => (
            <Picker.Item key={index} label={src.name} value={src.id} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={salesData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={35} color="#dbdad3" />
        </Pressable>
      </View>
    </View>
  );
};

export default Sale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#959990',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 6,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  plusButtonContainer: {
    position: 'absolute',
    backgroundColor: '#385dab',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    alignSelf: 'flex-end',
    bottom: 20,
    right: 20,
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invoiceItem: {
    backgroundColor: '#ebeff5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  invoiceText: {
    fontSize: 13,
    fontWeight: '600',
  },
  invoiceText1: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.Black,
  },
  status: {
    color: 'orange',
    fontWeight: 'bold',
    marginTop: 4,
  },
  contentbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rps: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  buttontext: {
    fontSize: 16,
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: Colors.Dusk_Blue,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
});
