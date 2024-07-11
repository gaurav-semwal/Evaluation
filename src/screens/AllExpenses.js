import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardAdd from '../components/CardData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../color/Styles';
import {Get_Expense_Api} from '../api/authApi';
import {useFocusEffect} from '@react-navigation/native';

const AllExpenses = ({navigation}) => {
  const [expensedata, setexpensedata] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getexpense();
    }, []),
  );

  const getexpense = async () => {
    try {
      const response = await Get_Expense_Api();
      console.log(response.data);
      if (response.msg === 'Data loaded successfully.') {
        setexpensedata(response.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const onPressPlusButton = () => {
    navigation.navigate('Add Expenses');
  };

  const navigatescreen = item => {
    navigation.navigate('Edit Expense', {itemId: item.id});
  };

  const data = [
    {
      id: '1',
      date: '2024-07-05',
      time: '10:00 AM',
      name: 'Water Bill',
      category: 'Travel',
      subCategory: 'Cab',
      vendor: 'Vendor 1',
      expensesType: 'Vendor',
      note: 'anything',
      buildStatus: 'Billed',
      amount: '1500',
    },
  ];
  const Card = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.leftContent}>
          <View style={styles.datetime}>
            <Text style={styles.detailText}>{item.expense_date}</Text>

            <Text style={styles.cash}>{item.payment_mode}</Text>
          </View>
          <View style={styles.details}>
            <View style={styles.icon}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Name :</Text>
                <Text style={styles.text1}> {item.name}</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  alignItems: 'center',
                  padding: 3,
                }}
                onPress={() => navigatescreen(item)}>
                <MaterialCommunityIcons
                  name="playlist-edit"
                  size={26}
                  color="black"
                />
              </Pressable>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText}>Category :</Text>
              <Text style={styles.text1}> {item.expense_category}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detailText}>Sub Category :</Text>
              <Text style={styles.text1}> {item.expense_subcategory}</Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Vendor Name :</Text>
                <Text style={styles.text1}> {item.vendor_name}</Text>
              </View>

              <View style={styles.icon}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.detailText}>Build : </Text>
                  <Text style={styles.text1}>{item.build}</Text>
                </View>
              </View>
            </View>

            <View style={styles.icon}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.detailText}>Expense Type :</Text>
                <Text style={styles.text1}> {item.expense_type}</Text>
              </View>
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
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={expensedata}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <Card item={item} />}
        />
      </View>

      <View style={styles.plusButtonContainer}>
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={35} color="#dbdad3" />
        </Pressable>
      </View>
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    margin: 10,
    marginHorizontal: 6,
    backgroundColor: '#d1dbeb',
    shadowColor: '#000',
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
    marginBottom: 8,
    fontWeight: '700',
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
    color: Colors.White,
    fontSize: 15,
    fontWeight: '700',
  },
  // text1: {
  //   color: Colors.Black,
  //   fontSize: 15,
  //   fontWeight: '700',
  // },
});
