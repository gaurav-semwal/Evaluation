import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Alert,
  Modal,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {
  Add_Expense,
  Customers_Api,
  Get_Expense_Category_Api,
  Get_Expense_Sub__Category_Api,
  Get_Sale_Api,
  Get_Vendor_Labour_Api,
} from '../api/authApi';
import Toast from 'react-native-toast-message';
import {Colors} from '../color/Styles';

export default function AddExpenseForm() {
  useEffect(() => {}, []);

  const navigation = useNavigation();

  const [billed, setBilled] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [sale, setSale] = useState([]);
  const [expenseType, setExpenseType] = useState([]);
  const [vendor, setVendor] = useState('');
  const [labour, setLabour] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [selectedcustomer, setselectedcustomer] = useState('');
  const [selectedcategory, setselectedcategory] = useState('');
  const [selectedSubCategory, setselectedSubCategory] = useState('');
  const [selectedSale, setselectedSale] = useState('');
  const [selectedExpenseType, setselectedExpenseType] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [reference, setreference] = useState('');

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    getCustomer();
    getExpenseCategory();
    getExpenseType();
  }, []);

  const handlecustomer = (itemValue, itemIndex) => {
    console.log(itemValue);
    const selectedType = customer.find(typ => typ.id === itemValue);
    console.log(selectedType);
    setselectedcustomer(itemValue);
    getSale(selectedType.id);
  };
  const handleExpenseCategory = (itemValue, itemIndex) => {
    console.log(itemValue);
    setselectedcategory(itemValue);
    getExpenseSubCategory(itemValue);
  };
  const handleExpenseSubCategory = (itemValue, itemIndex) => {
    setselectedSubCategory(itemValue);
  };

  const handleSale = (itemValue, itemIndex) => {
    console.log(itemValue);
    setselectedSale(itemValue);
  };

  const handleExpenseType = itemValue => {
    setselectedExpenseType(itemValue);
    setExpenseType(itemValue);
    getExpenseType(itemValue);
  };

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCustomer = async () => {
    try {
      const response = await Customers_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setCustomer(response.data);
        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });
        // navigation.navigate('Bottom');
      } else {
        Toast.show({
          text1: 'Failed to login!',
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

  const getExpenseCategory = async () => {
    try {
      const response = await Get_Expense_Category_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setCategory(response.data);
        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });
        // navigation.navigate('Bottom');
      } else {
        Toast.show({
          text1: 'Failed to login!',
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

  const getExpenseSubCategory = async itemValue => {
    try {
      const response = await Get_Expense_Sub__Category_Api(itemValue);
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setSubCategory(response.data);
        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });
        // navigation.navigate('Bottom');
      } else {
        Toast.show({
          text1: 'Failed to login!',
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

  const getSale = async itemValue => {
    try {
      const response = await Get_Sale_Api(itemValue);
      // console.log('resssssssss',response.data);
      if (response.msg === 'Data loaded successfully.') {
        setSale(response.data);
        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });
      } else {
        Toast.show({
          text1: 'Failed to login!',
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

  const getExpenseType = async itemValue => {
    try {
      const response = await Get_Vendor_Labour_Api(itemValue);
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setExpenseData(response.data);
        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });
      } else {
        Toast.show({
          text1: 'Failed to login!',
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

  const Submit = async () => {
    console.log(
      selectedcustomer, 
      amount,  
      selectedImage,  
      name, 
      selectedcategory,
      paymentType,  
      note, 
      reference,
      expenseType, 
      selectedExpenseType, 
      selectedSale, 
      selectedSubCategory, 
      billed,
    );
    try {
      const response = await Add_Expense(
        selectedcustomer, 
        amount, 
        selectedImage, 
        name, 
        selectedcategory, 
        formatDate(date), 
        paymentType, 
        note, 
        reference, 
        expenseType, 
        selectedExpenseType, 
        selectedSale, 
        selectedSubCategory,
        billed
      );
      console.log(response);

      if (response.msg === 'Save successfully.') {
        Toast.show({
          text1: 'Save successfully.',
          type: 'success',
        });
        navigation.navigate('Expenses');
      } else {
        Toast.show({
          text1: 'Failed to save!',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('API Request Error:', error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleCloseModalUpdate = () => {
    setModalVisible(false);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        handleCloseModalUpdate();
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error Code: ', response.errorCode);
        console.log('Camera Error Message: ', response.errorMessage);
      } else {
        let imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        handleCloseModalUpdate();
      }
    });
  };

  const chooseImage = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesome name="file-picture-o" size={70} color="#37b8af" />
              <Text style={styles.uploadText}>Upload Picture</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={billed}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setBilled(itemValue)}>
            <Picker.Item label="Select Billed / Not Billed" value="" />
            <Picker.Item label="Billed" value="billed" />
            <Picker.Item label="Not Billed" value="not_billed" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          label="Enter Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
        />

        <TextInput
          style={styles.input}
          label="Enter Note"
          value={note}
          onChangeText={setNote}
          mode="outlined"
        />

        <Text style={styles.expensesCategory}>Expenses category</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedcategory}
            style={styles.picker}
            onValueChange={handleExpenseCategory}>
            <Picker.Item label="Select Category" value="" />
            {category.map((src, index) => (
              <Picker.Item key={index} label={src.name} value={src.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSubCategory}
            style={styles.picker}
            onValueChange={handleExpenseSubCategory}>
            <Picker.Item label="Select Sub Category" value="" />
            {subCategory.map((src, index) => (
              <Picker.Item key={index} label={src.name} value={src.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <TouchableOpacity
            onPress={showDatePickerHandler}
            style={styles.inputContainer}>
            <TextInput
              value={formatDate(date)}
              editable={false}
              style={styles.dateText}
            />
            <Fontisto name="date" size={30} color="#000" style={styles.icon} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              accentColor="red"
              // display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          label="Enter Expenses Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          mode="outlined"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedcustomer}
            style={styles.picker}
            onValueChange={handlecustomer}>
            <Picker.Item label="Select Customer" value="" />
            {customer.map((src, index) => (
              <Picker.Item key={index} label={src.name} value={src.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedSale}
            style={styles.picker}
            onValueChange={handleSale}>
            <Picker.Item label="Select Sale" value="" />
            {sale.map((src, index) => (
              <Picker.Item key={index} label={src.invoice} value={src.id} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={expenseType}
            style={styles.picker}
            onValueChange={handleExpenseType}>
            <Picker.Item label="Select Expense Type" value="" />
            <Picker.Item label="Vendor" value="vendor" />
            <Picker.Item label="Labour" value="labour" />
            <Picker.Item label="TA/DA" value="ta/da" />
          </Picker>
        </View>

        {selectedExpenseType === 'vendor' && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={vendor}
              style={styles.picker}
              onValueChange={itemValue => setVendor(itemValue)}>
              <Picker.Item label="Select Vendor" value="" />
              {expenseData.map((vendor, index) => (
                <Picker.Item
                  key={index}
                  label={vendor.name}
                  value={vendor.name}
                />
              ))}
            </Picker>
          </View>
        )}

        {selectedExpenseType === 'labour' && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={labour}
              style={styles.picker}
              onValueChange={itemValue => setLabour(itemValue)}>
              <Picker.Item label="Select Labour" value="" />
              {expenseData.map((labour, index) => (
                <Picker.Item
                  key={index}
                  label={labour.name}
                  value={labour.name}
                />
              ))}
            </Picker>
          </View>
        )}

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={paymentType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setPaymentType(itemValue)}>
            <Picker.Item label="Select Payment Mode" value="" />
            <Picker.Item label="Bank Transfer" value="Bank Transfer" />
            <Picker.Item label="Cheque" value="Cheque" />
            <Picker.Item label="Cash" value="Cash" />
          </Picker>
        </View>

        <TextInput
          label="Enter Reference Number"
          value={reference}
          onChangeText={setreference}
          mode="outlined"
          style={styles.input}
        />

        <Button title="Submit" onPress={Submit} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModalUpdate}>
          <View style={[styles.centeredView, {justifyContent: 'flex-end'}]}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View></View>
                <Text style={styles.modalText}>Choose Photo Type</Text>
                <Pressable onPress={handleCloseModalUpdate}>
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={25}
                    color="#37b8af"
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}>
                <Pressable
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 10,
                  }}
                  onPress={openGallery}>
                  <MaterialIcons
                    name="photo-library"
                    size={27}
                    color="#37b8af"
                  />
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#666'}}>
                    Select Photo
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 10,
                  }}
                  onPress={openCamera}>
                  <MaterialIcons name="add-a-photo" size={27} color="#37b8af" />
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#666'}}>
                    Open Camera
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    backgroundColor: Colors.White,
    padding: 6,
  },
  imagePicker: {
    width: '90%',
    height: 200,
    borderWidth: 1.5,
    borderColor: '#37b8af',
    borderStyle: 'dashed',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.Grey,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 6,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: 18,
    backgroundColor: Colors.White,
  },
  icon: {
    marginLeft: '50%',
    marginTop: '3%',
  },
  input: {
    height: 50,
    marginHorizontal: 6,
    marginBottom: 10,
    color: '#000',
    backgroundColor: Colors.White,
  },
  picker: {
    height: 50,
  },
  expensesCategory: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 10,
    backgroundColor: '#aac6f2',
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 6,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    height: '26%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
});
