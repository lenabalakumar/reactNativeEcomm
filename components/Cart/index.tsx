import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import axios from 'axios';

import Cartitem from '../CartItem';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation} from '@react-navigation/native';
import {CartInterface} from '../../types/types';
import {clearCart} from '../../features/Cart/cartSlice';

import {StoreStackParamList} from '../../navigation/StoreStackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type ErrorScreenProp = NativeStackNavigationProp<
  StoreStackParamList,
  'ErrorPage'
>;

const Cart = () => {
  const navigation = useNavigation<ErrorScreenProp>();

  const cart = useAppSelector(state => state.cartReducer);
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();

  const showRazorpay = async (cart: CartInterface) => {
    try {
      const cartTotal = cart.total;
      const {data} = await axios.post(
        'http://localhost:4321/razorpay',
        {cartTotal},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      const razorpayOptions = {
        description: 'Payment for products',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_gXXhqYoxEirqSz',
        amount: 100000,
        name: 'Eataware',
        order_id: data.id,
        prefill: {
          email: user.userEmail,
          contact: user.userPhone,
          name: user.userName,
        },
        theme: {color: '#53a20e'},
      };

      RazorpayCheckout.open(razorpayOptions)
        .then((data: any) => {
          // console.warn(`Success: ${data.razorpay_payment_id}`);
          // console.warn(`Success: ${data.razorpay_order_id}`);
          // console.warn(`Success: ${data.razorpay_signature}`);

          axios
            .post(
              'http://localhost:4321/captureOrder',
              {data, user, cart},
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              },
            )
            .then(res => {
              console.log(`response status code ${res.status}`);
              if (res.status == 200) {
                navigation.navigate('OrderSuccess');
              } else {
              }
            })
            .catch((e: any) => {
              navigation.navigate('ErrorPage');
            })
            .then(() => {
              dispatch(clearCart());
            });
        })
        .catch((e: any) => console.log(e));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        navigation.navigate('ErrorPage');

        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }

    console.log(cart);
  };

  return (
    <SafeAreaView style={{display: 'flex', alignItems: 'center'}}>
      {cart.products.length < 1 && (
        <View style={styles.emptyCartContainer}>
          <Text style={{fontSize: 16}}>Your shopping cart is empty.</Text>
        </View>
      )}
      <View>
        <ScrollView>
          {cart.products.map(cartItem => {
            return (
              <Cartitem
                key={cartItem.productID}
                productID={cartItem.productID}
                productImageURL={cartItem.productImageURL}
                productBrand={cartItem.productBrand}
                productName={cartItem.productName}
                productOrigin={cartItem.productOrigin}
                productPrice={cartItem.productPrice}
                productQuantity={cartItem.productQuantity}
                productWeight={cartItem.productWeight}
              />
            );
          })}
        </ScrollView>
        {cart.products.length > 0 && (
          <Pressable onPress={() => showRazorpay(cart)}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalTextStyle}>
                Total: {cart.total.toFixed(2)}
              </Text>
              <Ionicons name="caret-forward-outline" size={24} color="white" />
            </View>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textTransform: 'uppercase',
  },
  totalTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    width: Dimensions.get('screen').width - 20,
    height: 60,
    backgroundColor: 'green',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  emptyCartContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
});

export default Cart;

// type RazorpayResponse = {
//   id: string | any;
//   currency: string | any;
//   amount: string | any;
// };

// const showRazorPay = async (
//   userName: string,
//   userPhone: string,
//   userEmail: string,
//   total: string,
// ) => {
//   console.log(userName);

//   try {
// const {data} = await axios.post<RazorpayResponse>(
//   'http://localhost:4321/razorpay',
//   {userName, userPhone, userEmail, total},
//   {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//   },
// );

// console.log(JSON.stringify(data, null, 4));

//     RazorpayCheckout.open(options)
//       .then(
//         (data: {
//           razorpay_payment_id: any;
//           razorpay_order_id: any;
//           razorpay_signature: any;
//         }) => {
//           console.log('data' + data.razorpay_order_id);
//           // handle success
// console.warn(`Success: ${data.razorpay_payment_id}`);
// console.warn(`Success: ${data.razorpay_order_id}`);
// console.warn(`Success: ${data.razorpay_signature}`);
//           const razorpayOrderId = data.razorpay_order_id;

//           try {
//             axios.post(
//               'http://localhost:4321/order',
//               {userName, total, razorpayOrderId},
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   Accept: 'application/json',
//                 },
//               },
//             );
//           } catch (error) {}

//           navigation.navigate('OrderSuccess');
//         },
//       )
//       .catch((error: {code: any; description: any}) => {
//         // handle failure
//         console.warn(`Error: ${error.code} | ${error.description}`);
//       });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       // 👇️ error: AxiosError<any, any>
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// };

// import BottomSheet from '@gorhom/bottom-sheet';

// const viewUserDetails = () => {
//   bottomSheetRef.current?.expand();
// };

// const bottomSheetRef = React.useRef<BottomSheet>(null);
// const snapPoints = [10, '75%'];
// const [userName, setUserName] = React.useState<string>('');
// const [userPhone, setUserPhone] = React.useState<string>('');
// const [userEmail, setUserEmail] = React.useState<string>('');

{
  /* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <ScrollView>
          <View
            style={{
              width: Dimensions.get('screen').width,
              // backgroundColor: 'yellow',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              paddingVertical: 20,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, paddingVertical: 10}}>
              Order summary
            </Text>
            <View
              style={{
                height: 150,
                width: '90%',
                // backgroundColor: '#aaa',
                padding: 10,
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: 10,
                borderWidth: 0.25,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Total</Text>
                <Text>200</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Shipping</Text>
                <Text>200</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Tax</Text>
                <Text>200</Text>
              </View>
              <View style={{width: '100%', borderWidth: 0.5}}></View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Grand total</Text>
                <Text>200</Text>
              </View>
            </View>
            <View style={{paddingVertical: 10}}>
              <Text style={{fontSize: 20}}>User details</Text>
            </View>
            <View
              style={{
                paddingVertical: 10,
                width: '90%',
                // backgroundColor: 'orange',
              }}>
              <View style={{paddingVertical: 5}}>
                <TextInput
                  placeholder="Enter your name"
                  keyboardType="default"
                  value={userName}
                  onChangeText={setUserName}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    paddingLeft: 5,
                  }}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <TextInput
                  placeholder="Enter your phone"
                  keyboardType="numeric"
                  value={userPhone}
                  onChangeText={setUserPhone}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    paddingLeft: 5,
                  }}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="numeric"
                  value={userEmail}
                  onChangeText={setUserEmail}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 50,
                    paddingLeft: 5,
                  }}
                />
              </View>
              <View style={{paddingVertical: 5}}>
                <Pressable
                  onPress={() =>
                    showRazorPay(
                      userName,
                      userPhone,
                      userEmail,
                      cart.total.toFixed(0).toString(),
                    )
                  }>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      borderRadius: 10,
                      backgroundColor: 'green',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 20, color: 'white'}}>
                      Place order
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheet> */
}
