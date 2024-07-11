import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ExpenseForm, Login} from '../screens';
import BottomTab from './BottomTab';
import Profilescreen from '../screens/Profilescreen';
import Settingsscreen from '../screens/Settingsscreen';
import AllExpenses from '../screens/AllExpenses';
import AddExpenseForm from '../screens/AddExpenseForm';
import Sale from '../screens/Sale';
import AddSale from '../screens/AddSale';
import { Colors } from '../color/Styles';
import EditAllSale from '../screens/EditAddSale';
import EditExpense from '../screens/EditExpense';
const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
        <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bottom"
            component={BottomTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add Expenses"
            component={AddExpenseForm}
            options={({ navigation }) => ({
              headerStyle: {backgroundColor: Colors.Dusk_Blue},
              headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={26} color="#fff" />
              </TouchableOpacity>
              ),
              headerShown: true,
            })}
          />
           <Stack.Screen
            name="Add Sales"
            component={AddSale}
            options={({ navigation }) => ({
              headerStyle: {backgroundColor: Colors.Dusk_Blue},
              headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
              ),
              headerShown: true,
            })}
          />


<Stack.Screen
            name="My Profile"
            component={Profilescreen}
            options={({ navigation }) => ({
              headerStyle: {backgroundColor: Colors.Dusk_Blue},
              headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
              ),
              headerShown: true,
            })}

          />
          <Stack.Screen
            name="Edit Expense"
            component={EditExpense}
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: '#385dab' },
              headerTitleStyle: { color: '#fff', alignSelf: 'center' },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
              ),
              headerShown: true,
            })}
          />

<Stack.Screen
            name="Edit Sales"
            component={EditAllSale}
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: '#385dab' },
              headerTitleStyle: { color: '#fff', alignSelf: 'center' },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={26} color="#fff" />
                </TouchableOpacity>
              ),
              headerShown: true,
            })}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default Stacknavigation;
