import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {
  Get_Expense_Sub__Category_Api,
  Get_Expense_Category_Api,
  Get_GST_Api,
  Customers_Api,
  Update_Edit_Sales,
  Get_Sales_Details_Api,
  Get_Company_Api,
} from '../api/authApi';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';

export default function EditAllSale({navigation}) {
  const route = useRoute();
  const {itemId} = route.params;
  console.log(itemId);

  const [tcs, setTcs] = useState('');
  const [Gst, setgst] = useState([]);
  const [selectedgst, setselectedgst] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedcategory, setselectedcategory] = useState('');
  const [selectedSubCategory, setselectedSubCategory] = useState('');
  const [salesDate, setSalesDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [customer, setCustomer] = useState([]);
  const [selectedcustomer, setselectedcustomer] = useState('');
  const [Gst2, setGst2] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [commision, setcommision] = useState('');
  const [price, setPrice] = useState('');
  const [showSalesDatePicker, setShowSalesDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [Gsttype, setgsttye] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCompany, setselectedCompany] = useState(false);
  const [company, setCompnay] = useState([]);
  const [billed, setBilled] = useState('');




  const dummyTCSData = [
    {label: '0.00', value: '0'},
    {label: '5.00', value: '1'},
    {label: '15.00', value: '2'},
    {label: '20.00', value: '3'},
  ];

  const dummyGSTData = [
    {label: 'Outer GST', value: 'Outer GST'},
    {label: 'Inner GST', value: 'Inner GST'},
  ];

  const dummyGSTtypeData = [
    {label: 'Include', value: 'Include'},
    {label: 'Exclude', value: 'Exclude'},
  ];

  const onChangeSalesDate = (event, selectedDate) => {
    const currentDate = selectedDate || salesDate;
    setShowSalesDatePicker(false);
    setSalesDate(currentDate);
  };

  const onChangeDueDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDueDatePicker(false);
    setDueDate(currentDate);
  };

  const showSalesDatePickerHandler = () => {
    setShowSalesDatePicker(true);
  };

  const showDueDatePickerHandler = () => {
    setShowDueDatePicker(true);
  };

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getCompnay();
    getExpenseCategory();
    getgst();
    getCustomer();
    getinvoice();
  }, []);

  const getinvoice = async () => {
    try {
      const response = await Get_Sales_Details_Api(itemId);
      console.log('gettttttttttt', response.data);
      if (response.msg === 'Data loaded successfully.') {
        const leadData = response.data.order_mst;

        setselectedcustomer(leadData.customer_id);

        // Set sales and due date
        const salesDateValue = new Date(leadData.invoice_date);
        const dueDateValue = new Date(leadData.due_date);
        setSalesDate(salesDateValue);
        setDueDate(dueDateValue);

        // Set TCS and GST type
        setTcs(leadData.service_tax);
        setGst2(leadData.gst_type);

        // Set items (assuming order_det is an array)
        setItems(response.data.order_det);
      } else {
        Toast.show({
          text1: 'Failed to load invoice details!',
          type: 'error',
        });
      }
    } catch (error) {
      console.log('Error fetching invoice details:', error);
      Toast.show({
        text1: 'Error fetching invoice details!',
        type: 'error',
      });
    }
  };
  const handlecustomer = (itemValue, itemIndex) => {
    setselectedcustomer(itemValue);
  };
const handleCompany = (itemValue, itemIndex) => {
    console.log(itemValue);
    setselectedCompany(itemValue);
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

  const handleExpenseCategory = (itemValue, itemIndex) => {
    console.log(itemValue);
    const selectedType = category.find(typ => typ.id === itemValue);
    console.log('idddddddd', selectedType.id);
    setselectedcategory(itemValue);
    getExpenseSubCategory(selectedType.id);
  };
  const handleExpenseSubCategory = (itemValue, itemIndex) => {
    setselectedSubCategory(itemValue);
  };

  const handlegst = (itemValue, itemIndex) => {
    setselectedgst(itemValue);
  };

  const getExpenseCategory = async () => {
    try {
      const response = await Get_Expense_Category_Api();
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

  const getgst = async () => {
    try {
      const response = await Get_GST_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setgst(response.data);
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
  const getCompnay = async () => {
    try {
      const response = await Get_Company_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setCompnay(response.data);
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

  const getExpenseSubCategory = async itemValue => {
    try {
      const response = await Get_Expense_Sub__Category_Api(itemValue);
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setSubCategory(response.data);
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

  const updateInvoice = async () => {
    console.log(selectedCompany, selectedcustomer, salesDate, dueDate, tcs, Gst2, items, itemId);

    try {
      const response = await Update_Edit_Sales(
        selectedCompany,
        selectedcustomer,
        items,
        formatDate(dueDate),
        tcs,
        formatDate(salesDate),
        Gst2,
        itemId,
      );

      console.log(response);

      if (response.msg === 'Save Successfully.') {
        Toast.show({
          text1: 'Save successfully',
          type: 'success',
        });
        navigation.navigate('Invoice');
      } else {
        Toast.show({
          text1: 'Failed to add lead!',
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    }
  };

  const addItem = () => {
    if (
      !selectedcategory ||
      !selectedSubCategory ||
      !name ||
      !quantity ||
      !price ||
      !selectedgst ||
      !Gsttype ||
      !commision
    ) {
      Toast.show({
        text1: 'Please fill all fields',
        type: 'error',
      });
      return;
    }

    const selectedCategoryObject = category.find(
      cat => cat.id === selectedcategory,
    );
    const selectedSubCategoryObject = subCategory.find(
      subCat => subCat.name === selectedSubCategory,
    );
    const selectedGstObject = Gst.find(gst => gst.gst === selectedgst);

    const newItem = {
      prod_category: selectedCategoryObject ? selectedCategoryObject.name : '',
      prod_subcategory: selectedSubCategoryObject
        ? selectedSubCategoryObject.name
        : '',
      description: name,
      qty: quantity,
      price: price,
      gst: selectedGstObject ? selectedGstObject.gst : '',
      gst_type: Gsttype,
      commision: commision, // Include commission here
    };

    setItems([...items, newItem]);

    setselectedcategory('');
    setselectedSubCategory('');
    setName('');
    setQuantity('');
    setPrice('');
    setselectedgst('');
    setgsttye('');
    setcommision('');
  };

  const deleteItem = indexToDelete => {
    const updatedItems = items.filter((item, index) => index !== indexToDelete);
    setItems(updatedItems);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCompany}
              style={styles.picker}
              onValueChange={handleCompany}>
              <Picker.Item label="Select Company" value="" />
              {company.map((src, index) => (
                <Picker.Item key={index} label={src.name} value={src.id} />
              ))}
            </Picker>
          </View>
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

        <View style={styles.dateContainer}>
          <TouchableOpacity
            onPress={showSalesDatePickerHandler}
            style={styles.datePicker}>
            <TextInput
              label="Select Sales Date"
              value={formatDate(salesDate)}
              editable={false}
              style={styles.dateText}
            />
            <Fontisto name="date" size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          {showSalesDatePicker && (
            <DateTimePicker
              value={salesDate}
              mode="date"
              display="default"
              onChange={onChangeSalesDate}
            />
          )}

          <TouchableOpacity
            onPress={showDueDatePickerHandler}
            style={styles.datePicker}>
            <TextInput
              label="Select Due Date"
              value={formatDate(dueDate)}
              editable={false}
              style={styles.dateText}
            />
            <Fontisto name="date" size={20} color="#000" style={styles.icon} />
          </TouchableOpacity>
          {showDueDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onChangeDueDate}
            />
          )}
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tcs}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setTcs(itemValue)}>
            <Picker.Item label="Select TCS" value="" />
            {dummyTCSData.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.label} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={Gst2}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setGst2(itemValue)}>
            <Picker.Item label="Select GST Type" value="" />
            {dummyGSTData.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <View style={styles.itemContainer}>
          <Text style={{fontSize: 16, fontWeight: '500'}}> Items </Text>
          <TouchableOpacity
            style={{
              width: 50,
              height: 24,
              backgroundColor: '#385dab',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={addItem}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedcategory}
            style={styles.picker}
            onValueChange={handleExpenseCategory}>
            <Picker.Item label="Select Category" value="" />
            {category.map((src, index) => (
              <Picker.Item key={index} label={src.name} value={src.id} />
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
        <TextInput
          style={styles.input}
          label="Enter Description"
          value={name}
          onChangeText={setName}
          mode="outlined"
        />
        <TextInput
          style={styles.input}
          label="Enter Quantity"
          value={quantity}
          onChangeText={setQuantity}
          mode="outlined"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          label="Enter Price"
          value={price}
          onChangeText={setPrice}
          mode="outlined"
          keyboardType="numeric"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedgst}
            style={styles.picker}
            onValueChange={handlegst}>
            <Picker.Item label="Select GST" value="" />
            {Gst.map((src, index) => (
              <Picker.Item key={index} label={src.gst} value={src.gst} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={Gsttype}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setgsttye(itemValue)}>
            <Picker.Item label="Select GST Type" value="" />
            {dummyGSTtypeData.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <TextInput
          label="Enter Customer Per Qty"
          mode="outlined"
          style={styles.input}
          keyboardType="numeric"
          value={commision}
          onChangeText={setcommision}
        />

        {items.length > 0 &&
          items.map((item, index) => (
            <View key={index} style={styles.itemContainer1}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={{fontWeight: '600'}}>Category:</Text>
                  <Text
                    style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                    {' '}
                    {item.prod_category}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteItem(index)}>
                  <Fontisto
                    name="trash"
                    size={20}
                    color="#000"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{fontWeight: '600'}}>Sub Category: </Text>
                <Text style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                  {' '}
                  {item.prod_subcategory}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={{fontWeight: '600'}}>Price:</Text>
                  <Text
                    style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                    {' '}
                    {item.price}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={{fontWeight: '600'}}>Quantity:</Text>
                  <Text
                    style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                    {' '}
                    {item.qty}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{fontWeight: '600'}}>GST:</Text>
                <Text style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                  {' '}
                  {item.gst}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{fontWeight: '600'}}>Commision:</Text>
                <Text style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                  {' '}
                  {item.commision}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{fontWeight: '600'}}>Description:</Text>
                <Text style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                  {' '}
                  {item.description}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <Text style={{fontWeight: '600'}}>GST Type:</Text>
                <Text style={{fontWeight: '700', color: 'black', fontSize: 15}}>
                  {' '}
                  {item.gst_type}
                </Text>
              </View>
            </View>
          ))}

        <Button title="Submit" onPress={updateInvoice} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#959990',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#959990',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    backgroundColor: '#fff',
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    height: 50,
    marginBottom: 10,
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
    flex: 1,
  },
  itemContainer1: {
    backgroundColor: '#e8effa',
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8effa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {},
  addButtonContainer: {
    width: 30,
    height: 40,
    bottom: 10,
  },
});
