import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 

const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <View style={styles.datetime}>
          <Text>Date: 2024-07-05</Text>
          <Text>Time: 10:00 AM</Text>
        </View>
        <View style={styles.details}>
          <Text>Name: Water Bill</Text>
          <Text>Category: Travel</Text>
          <Text>Sub Category: Cab</Text>
          <Text>Vendor Name: Vendor 1</Text>
          <Text>Expenses Type: Vendor</Text>
          <Text>Note: anything</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        {/* Icons */}
        <View style={styles.icons}>
          <FontAwesome name="eye" size={26} color="#000000" />
          <FontAwesome name="edit" size={26} color="#000000" />
        </View>
        <View style={styles.financial}>
          <Text>Cash</Text>
          <Text>Build: Billed</Text>
          <Text>Rupees: 1500</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding:20,
    margin:10,
    marginHorizontal: 6,
  backgroundColor: '#d0ddf2'
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  datetime: {
    marginBottom: 10,
  },
  details: {
    marginBottom: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '40%',
  },
  financial: {},
});

export default Card;
