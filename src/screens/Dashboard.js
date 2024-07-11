import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Linking,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Seting_Api, Dashboard_Api} from '../api/authApi';
import {Colors} from '../color/Styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageWidth = screenWidth * 0.8;
const imageHeight = screenHeight * (4 / 22);

const Dashboard = ({navigation}) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    getimage();
    getdashboard();
  }, []);

  const getdashboard = async () => {
    try {
      const response = await Dashboard_Api();
      console.log(response.data);

      if (response.msg === 'Data loaded successfully.') {
        setDashboardData(response.data);
        setSalesData(response.data.sales);
        setExpense(response.data.expenses);
      } else if (response.msg === 'Unauthorized request.') {
        navigation.navigate('Login');
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getimage = async () => {
    try {
      const response = await Seting_Api();
      console.log(response);
      if (response.msg === 'Data loaded successfully.') {
        setLogoUrl(response.data.logo);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  // const getdashboard = async () => {
  //   try {
  //     const response = await Dashboard_Api();
  //     console.log(response.data);
  //     if (response.msg === 'Data loaded successfully.') {
  //       setDashboardData(response.data);
  //       setSalesData(response.data.sales);
  //       setexpense(response.data.expenses);
  //     } else {
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };

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
          <Text style={styles.invoiceText}>Builed Status : </Text>
          <Text style={styles.invoiceText1}>{item.is_billed}</Text>
        </View>
      </View>
      <View style={styles.contentbottom}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.invoiceText}>Due Date : </Text>
          <Text style={styles.invoiceText1}>{item.due_date}</Text>
        </View>
        {/* <View style={{ backgroundColor: '#fff', borderRadius: 50, alignItems: 'center', padding: 3 }}>
          <MaterialCommunityIcons name="playlist-edit" size={26} color="black" />
        </View> */}
      </View>

      {/* <View style={styles.button}>
        <Pressable style={styles.button1} onPress={() => Linking.openURL(item.admin_copy)}>
          <MaterialCommunityIcons name="eye" size={26} color="black" style={{ marginRight: 5 }} />
          <Text style={styles.buttontext}>Admin Invoice</Text>
        </Pressable>
        <Pressable style={styles.button1} onPress={() => Linking.openURL(item.customer_copy)}>
          <MaterialCommunityIcons name="eye" size={26} color="black" style={{ marginRight: 5 }} />
          <Text style={styles.buttontext}>Customer Invoice</Text>
        </Pressable>
      </View> */}
    </View>
  );

  // const renderItemexpense = ({item}) => (
  //   <View style={styles.card}>
  //     <View style={styles.leftContent}>
  //       <View style={styles.datetime}>
  //         <Text>2024-07-05 18:28:00</Text>
  //         <Text style={styles.cash}>Cash</Text>
  //       </View>
  //       <View style={styles.details}>
  //         <View style={styles.icon}>
  //           <View style={{flexDirection: 'row'}}>
  //             <Text style={styles.detailText}>Name:</Text>
  //             <Text style={styles.text1}> Water Bill</Text>
  //           </View>
  //           {/* <View
  //             style={{
  //               backgroundColor: '#fff',
  //               borderRadius: 50,
  //               alignItems: 'center',
  //               padding: 3,
  //             }}>
  //             <MaterialCommunityIcons
  //               name="playlist-edit"
  //               size={26}
  //               color="black"
  //             />
  //           </View> */}
  //         </View>

  //         <View style={{flexDirection: 'row'}}>
  //           <Text style={styles.detailText}>Category:</Text>
  //           <Text style={styles.text1}> Travel</Text>
  //         </View>

  //         <View style={{flexDirection: 'row'}}>
  //           <Text style={styles.detailText}>Vendor Name:</Text>
  //           <Text style={styles.text1}> Vendor 1</Text>
  //         </View>

  //         <View style={styles.icon}>
  //           <View style={{flexDirection: 'row'}}>
  //             <Text style={styles.detailText}>Note:</Text>
  //             <Text style={styles.text1}> anything</Text>
  //           </View>
  //           <View style={styles.rps}>
  //             <Text style={styles.text}>1500</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );

  const renderItemexpense = ({item}) => (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <View style={styles.datetime}>
          <Text>{item.expense_date}</Text>
          <Text style={styles.cash}>{item.payment_mode}</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.icon}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText}>Name :</Text>
              <Text style={styles.text1}> {item.name}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailText}>Category :</Text>
            <Text style={styles.text1}> {item.expense_category}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailText}>Sub Category :</Text>
            <Text style={styles.text1}> {item.expense_subcategory}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailText}>Vendor Name :</Text>
            <Text style={styles.text1}> {item.vendor_name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Build : </Text>
                  <Text style={styles.text1}>{item.build}</Text>
                </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.detailText}>Expenses Type :</Text>
            <Text style={styles.text1}> {item.expense_type}</Text>
          </View>

          <View style={styles.icon}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText}>Note :</Text>
              <Text style={styles.text1}> {item.note}</Text>
            </View>
            <View style={styles.rps}>
              <Text style={styles.text}>₹ {item.amount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const naviagteinvoice = async () => {
    navigation.navigate('All Sales');
  };

  const naviagteexpence = async () => {
    navigation.navigate('Add Expenses');
  };

  return (
    <ScrollView style={styles.container}>
      {logoUrl && (
        <Image
          source={{uri: logoUrl}}
          resizeMode="contain"
          style={[styles.logo, {width: imageWidth, height: imageHeight}]}
        />
      )}
      <View style={styles.summary}>
        <Pressable style={styles.summaryBox} onPress={naviagteinvoice}>
          <Text style={styles.innertext}>Add Sale</Text>
        </Pressable>
        <Pressable style={styles.summaryBox} onPress={naviagteexpence}>
          <Text style={styles.innertext}>Add Expense</Text>
        </Pressable>
      </View>
      {dashboardData && dashboardData.total_customer && (
        <View style={styles.summaryDetails}>
          <View style={styles.summaryBox}>
            <Text style={styles.number}>
              {dashboardData.total_customer.total_customer}
            </Text>
            <Text style={styles.innertext1}>Total Customer</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.number}>
              {dashboardData.total_vendor.total_vendor}
            </Text>
            <Text style={styles.innertext1}>Total Vendor</Text>
          </View>
        </View>
      )}
      {dashboardData && dashboardData.total_sale && (
        <View style={styles.summaryDetails}>
          <View style={styles.summaryBox}>
            <Text style={styles.number}>
              {dashboardData.total_sale.total_sale}
            </Text>
            <Text style={styles.innertext1}>Total Sale</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.number}>
              {dashboardData.total_expense.total_expense}
            </Text>
            <Text style={styles.innertext1}>Total Expense</Text>
          </View>
        </View>
      )}
      <View style={styles.title}>
        <Text style={styles.sectionTitle}>Sale</Text>
      </View>

      <FlatList
        data={salesData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.title}>
        <Text style={styles.sectionTitle}>Expense</Text>
      </View>

      <FlatList
        data={expense}
        renderItem={renderItemexpense}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  // logo: {
  // height:100,
  // width:'80%'
  // },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 13,
  },
  number: {
    fontSize: 19,
    fontWeight: '600',
    color: 'black',
  },
  innertext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  innertext1: {
    fontSize: 14,
    fontWeight: '700',
  },
  summaryBox: {
    backgroundColor: '#e8effa',
    height: 85,
    width: '47%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 13,
  },
  detailBox: {
    alignItems: 'center',
  },
  rps: {
    backgroundColor: '#385dab',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    backgroundColor: '#e1e2e3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  invoiceItem: {
    backgroundColor: '#ebeff5',
    padding: 10,
    borderRadius: 6,
    margin: 10,
    marginHorizontal: 3,
    shadowColor: Colors.Black,
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
    color: 'black',
  },
  status: {
    color: 'orange',
    fontWeight: 'bold',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    borderColor: '#625bc5',
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Black,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 3,
    backgroundColor: '#d1dbeb',
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContent: {
    flex: 1,
  },
  datetime: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width:'200%',
    alignItems: 'center',
  },
  cash: {
    color: Colors.Dusk_Blue,
    fontSize: 17,
    fontWeight: '800',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '200%',
    alignItems: 'center',
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    marginBottom: 10,
  },
  text1: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.Black,
  },
  rps: {
    backgroundColor: Colors.Dusk_Blue,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default Dashboard;
