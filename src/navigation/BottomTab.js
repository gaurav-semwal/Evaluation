import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dashboard, ExpenseForm} from '../screens';
import Settingsscreen from '../screens/Settingsscreen';
import WalletLedger from '../screens/WalletLedger';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AllExpenses from '../screens/AllExpenses';
import Sale from '../screens/Sale';
import Wallet from '../components/Wallet';
import { Colors } from '../color/Styles';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: Colors.White},
        tabBarActiveTintColor: Colors.Dusk_Blue,
        tabBarInactiveTintColor: '#8a8a87',
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: 'All Expenses',
          headerTitleStyle: {color: Colors.White},
          headerRight: () => <Wallet />,
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Expenses"
        component={AllExpenses}
        options={{
          headerShown: true,
          headerTitle: 'All Expenses',
          headerRight: () => <Wallet />,
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          headerTitleStyle: {color: Colors.White},
          tabBarIcon: ({color, size}) => (
            <Ionicons name="wallet-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Wallet Ledger"
        component={WalletLedger}
        options={{
          headerShown: true,
          headerRight: () => <Wallet />,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="wallet-sharp" size={size} color={color} />
          ),
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
        }}
      />
      <Tab.Screen
        name="All Sales"
        component={Sale}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          headerRight: () => <Wallet />,
          headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="sort-amount-up" size={size} color={color} />
          ),
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settingsscreen}
        options={{
          headerShown: true,
          headerRight: () => <Wallet />,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
          headerStyle: {backgroundColor: Colors.Dusk_Blue},
          headerTitleStyle: {color: Colors.White, alignSelf: 'center'},
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
