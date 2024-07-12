  import React, { useEffect, useState } from 'react';
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
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import {
  Category_Api,
  Get_Vendor_Labour_Api,
  Get_Expense_Category_Api,
  Get_Expense_Sub__Category_Api,
  Get_Sale_Api,
  Add_Expense,
  Get_Expense_Detail_Api,
  Customers_Api,
  update_Expense
} from '../api/authApi';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';

export default function EditExpense() {

    const route = useRoute();
    const { itemId } = route.params;
console.log(itemId)

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
    const [paymentType, setPaymentType] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [selectedcustomer, setselectedcustomer] = useState('');
    const [selectedcategory, setselectedcategory] = useState('');
    const [selectedSubCategory, setselectedSubCategory] = useState('');
    const [selectedSale, setselectedSale] = useState('');
    const [selectedExpenseType, setselectedExpenseType] = useState('');
    const [reference, setreference] = useState('')
  
    useEffect(() => {
      requestCameraPermission();
    }, []);
  
    useEffect(() => {
      getCategory();
      getCustomer();
      getExpenseType();
      getVendor();
      getexpensedetails();
    }, []);
  
    const handlecustomer = (itemValue, itemIndex) => {
      console.log(itemValue);
      const selectedType = customer.find(typ => typ.id === itemValue);
      console.log(selectedType)
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
      console.log(itemValue)
      setselectedSale(itemValue);
    };
  
    const handleExpenseType = (itemValue, itemIndex) => {
      console.log(itemValue)
      setselectedExpenseType(itemValue);
    };
  
    const getCustomer = async () => {
      try {
        const response = await Customers_Api();
        console.log(response.data);
        if (response.msg === 'Data loaded successfully.') {
          setCustomer(response.data);
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
  
    const getVendor = async () => {
      try {
        const response = await Get_Vendor_Labour_Api();
        console.log('vendor', response.data);
        if (response.msg === 'Data loaded successfully.') {
          setSale(response.data);
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
  
    const getCategory = async () => {
      try {
        const response = await Category_Api();
        console.log(response.data);
        if (response.msg === 'Data loaded successfully.') {
          setCategory(response.data);
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
        console.log(response.data);
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
          setExpenseType(response.data);
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

    const getexpensedetails = async () => {
      try {
        const response = await Get_Expense_Detail_Api(itemId);
        console.log('expenseeee', response.data);
        if (response.msg === 'Data loaded successfully.') {
          const expenseData = response.data[0]; 
          console.log(expenseData.file)
          setAmount(expenseData.amount);
          setName(expenseData.name);
          setNote(expenseData.note);
          setselectedcategory(expenseData.expense_category);
          setSelectedImage(expenseData.file);
          setselectedcustomer(expenseData.customer_name);
          setselectedSale(expenseData.vendor_id);
          setreference(expenseData.ref_no);
        } else {
        }
      } catch (error) {
        console.log('Error fetching expense details:', error);
      }
    };
  
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    
  
    const Submit = async () => {
      try {
        const response = await update_Expense(
          selectedcustomer,
          amount,
          selectedImage,
          name,
          selectedcategory,
          formatDate(date),
          billed,
          note,
          reference,
          selectedSale,
          itemId
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
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={chooseImage} style={styles.imagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <FontAwesome name="file-picture-o" size={70} color="#37b8af" />
                <Text style={styles.uploadText}>Upload Picture</Text>
              </View>
            )}
          </TouchableOpacity>
  
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
          {/* 
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
          </View> */}
  
          <View style={styles.pickerContainer}>
            <TouchableOpacity
              onPress={showDatePickerHandler}
              style={styles.inputContainer}>
              <TextInput
                value={date.toDateString()}
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
              <Picker.Item label="Select Vender" value="" />
              {sale.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
  
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={billed}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setBilled(itemValue)}>
              <Picker.Item label="Bank Transfer" value="" />
              <Picker.Item label="Cheque" value="billed" />
              <Picker.Item label="Cash" value="not_billed" />
            </Picker>
          </View>
  
          <TextInput
            label="Enter Reference Number"
            mode="outlined"
            style={styles.input}
            value={reference}
            onChangeText={setreference}
            keyboardType='numeric'
          />
  
          <Button title="Submit" onPress={Submit} />
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModalUpdate}>
            <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
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
                      style={{ fontSize: 16, fontWeight: '700', color: '#666' }}>
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
                      style={{ fontSize: 16, fontWeight: '700', color: '#666' }}>
                      Open Camera
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // top:10
    },
    imagePicker: {
      width: '90%',
      height: 150,
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
      borderColor: '#959990',
      borderRadius: 5,
      marginBottom: 10,
      marginHorizontal: 6,
    },
    inputContainer: {
      flexDirection: 'row',
    },
    dateText: {
      fontSize: 18,
      backgroundColor: '#fff',
    },
    icon: {
      marginLeft: '40%',
      marginTop: '3%',
    },
    input: {
      height: 50,
      marginHorizontal: 6,
      marginBottom: 10,
      color: '#000',
      backgroundColor: '#fff'
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
  