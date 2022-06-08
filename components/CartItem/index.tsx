import React from 'react';
import {View, Text, Pressable, Dimensions, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../../app/hooks';
import {
  removeItem,
  decrementQuantity,
  incrementQuantity,
} from '../../features/Cart/cartSlice';
import {Product} from '../../types/types';

const Cartitem = (item: Product) => {
  const dispatch = useAppDispatch();

  const deleteItemFromCart = (item: Product) => {
    dispatch(removeItem(item));
  };

  const decrementItemInCart = (item: Product) => {
    dispatch(decrementQuantity(item));
  };

  const incrementItemInCart = (item: Product) => {
    dispatch(incrementQuantity(item));
  };

  return (
    <View
      key={item.productID}
      style={{
        flexDirection: 'row',
        width: Dimensions.get('screen').width - 20,
        height: 100,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
      }}>
      <View
        style={{
          width: '30%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: item.productImageURL,
          }}
          style={{aspectRatio: 1, width: 80, resizeMode: 'cover'}}
        />
      </View>

      <View
        style={{
          width: '55%',
          paddingHorizontal: 4,
        }}>
        <Text style={{fontSize: 20, paddingVertical: 4}}>
          {item.productName}
        </Text>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text>{item.productWeight}</Text>
          <Text>Rs. {item.productPrice}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            paddingVertical: 4,
          }}>
          <Pressable onPress={() => decrementItemInCart(item)}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 24, color: 'white'}}>-</Text>
            </View>
          </Pressable>
          <View
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{item.productQuantity}</Text>
          </View>
          <Pressable onPress={() => incrementItemInCart(item)}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 24, color: 'white'}}>+</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '15%',
        }}>
        <Pressable onPress={() => deleteItemFromCart(item)}>
          <Ionicons name="trash-outline" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default Cartitem;
