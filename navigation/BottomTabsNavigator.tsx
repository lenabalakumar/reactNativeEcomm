import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../components/Home';
import Recipes from '../components/Recipes';
import StoreStackNavigator from './StoreStackNavigator';
import Profile from '../components/Profile';

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: 'white', paddingBottom: 24}}
      inactiveColor="#aaa"
      activeColor="#000"
      shifting={false}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name="home" size={20} color={focused ? '#000' : '#aaa'} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="business"
              size={20}
              color={focused ? '#000' : '#aaa'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="fast-food"
              size={20}
              color={focused ? '#000' : '#aaa'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="ios-person"
              size={20}
              color={focused ? '#000' : '#aaa'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
