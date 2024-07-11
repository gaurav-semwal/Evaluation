import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Card from './Card';
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

const CardAdd = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
});

export default CardAdd;
