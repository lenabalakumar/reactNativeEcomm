import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Store from '../components/Store';
import Cart from '../components/Cart';
import Home from '../components/Home';
import OrderSuccess from '../components/OrderSuccess';
import {useAppSelector} from '../app/hooks';
import ErrorPage from '../components/ErrorPage';

export type StoreStackParamList = {
  Products: undefined;
  Cart: undefined;
  OrderSuccess: undefined;
  ErrorPage: undefined;
};

const StoreStack = createNativeStackNavigator<StoreStackParamList>();

const StoreStackNavigator = () => {
  const cart = useAppSelector(state => state.cartReducer);
  return (
    <StoreStack.Navigator>
      <StoreStack.Screen
        name="Products"
        component={Store}
        options={({navigation}) => ({
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="md-cart" size={20} />
                <View
                  style={{
                    // position: 'absolute',
                    // left: 5,
                    // bottom: 10,
                    width: 20,
                    height: 20,
                    backgroundColor: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'white'}}>{cart.products.length}</Text>
                </View>
              </View>
            </Pressable>
          ),
        })}
      />
      <StoreStack.Screen name="Cart" component={Cart} />

      <StoreStack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{
          headerLeft: () => <></>,
        }}
      />
      <StoreStack.Screen name="ErrorPage" component={ErrorPage} />
    </StoreStack.Navigator>
  );
};

export default StoreStackNavigator;
