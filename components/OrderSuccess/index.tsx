import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text>Order success</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Products');
        }}>
        <Text>Clickme</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderSuccess;
