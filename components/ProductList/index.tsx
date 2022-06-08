import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  addItemToCart,
  decrementQuantity,
  incrementQuantity,
} from '../../features/Cart/cartSlice';
import {Product} from '../../types/types';

const ProductList = (data: Product) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cartReducer);
  const [showButton, setShowButton] = React.useState(true);

  const addItem = (data: Product) => {
    dispatch(addItemToCart(data));
    setShowButton(false);
  };

  const decrementItemInCart = (item: Product) => {
    dispatch(decrementQuantity(item));
  };

  const incrementItemInCart = (item: Product) => {
    dispatch(incrementQuantity(item));
  };

  React.useEffect(() => {
    const foundItem = cart.products.find(
      item => item.productID == data.productID,
    );
    if (foundItem === undefined) {
      setShowButton(true);
    } else {
      foundItem?.productQuantity > 0
        ? setShowButton(false)
        : setShowButton(true);
    }
  }, [cart.products, data]);

  return (
    <View style={styles.productListContainer} key={data.productID}>
      <View style={styles.productListInnerContainer}>
        <View style={styles.productListImageContainer}>
          <Image
            style={styles.productImage}
            source={{
              uri: data.productImageURL,
            }}
          />
        </View>
        <View style={styles.productListDetailsContainer}>
          <Text style={styles.productName}>{data.productName}</Text>
          <View style={styles.productBrandDetailsContainer}>
            <Text style={styles.productBrand}>{data.productBrand}</Text>
            <Text style={styles.productOrigin}>{data.productOrigin}</Text>
          </View>
          <View style={styles.productPriceContainer}>
            <Text>{data.productWeight}</Text>
            <Text style={styles.productPrice}>Rs. {data.productPrice}</Text>
          </View>

          <View style={styles.buynowContainer}>
            {showButton && (
              <Pressable
                onPress={() => addItem(data)}
                style={styles.buynowPressable}>
                <Text style={styles.buynowText}>Buy now</Text>
              </Pressable>
            )}
            {!showButton && (
              <View style={styles.quantityChangeContainer}>
                <Pressable
                  style={styles.decrementPressable}
                  onPress={() => decrementItemInCart(data)}>
                  <Text style={styles.decrementText}>-</Text>
                </Pressable>
                <View style={styles.quantityValueContainer}>
                  {cart.products.map(cartItem => {
                    return cartItem.productID === data.productID ? (
                      cartItem.productQuantity > 0 ? (
                        <Text style={{fontSize: 16, fontWeight: '500'}}>
                          {cartItem.productQuantity}
                        </Text>
                      ) : (
                        <Text>0</Text>
                      )
                    ) : (
                      <></>
                    );
                  })}
                </View>
                <Pressable
                  style={styles.incrementPressable}
                  onPress={() => incrementItemInCart(data)}>
                  <Text style={styles.incrementText}>+</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productListContainer: {
    display: 'flex',
    width: Dimensions.get('screen').width - 20,
    height: 160,
    // backgroundColor: '#22ee12',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  productListInnerContainer: {
    width: '95%',
    height: '90%',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.25,
    borderColor: '#aaa',
  },
  productListImageContainer: {
    width: '35%',
    height: '100%',
    // backgroundColor: '#0d345a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productListDetailsContainer: {
    paddingHorizontal: 5,
    width: '65%',
    height: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  productBrandDetailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPriceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buynowContainer: {
    width: '100%',
    height: '35%',
    // backgroundColor: 'blue',
  },
  quantityChangeContainer: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityValueContainer: {
    height: '100%',
    width: '33%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  buynowPressable: {
    width: '100%',
    height: '100%',
    backgroundColor: '#58b52d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  decrementPressable: {
    height: '100%',
    width: '33%',
    backgroundColor: '#58b52d',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incrementPressable: {
    height: '100%',
    width: '33%',
    backgroundColor: '#58b52d',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productBrand: {fontSize: 14},
  productOrigin: {fontSize: 14, textTransform: 'uppercase'},
  productPrice: {fontSize: 15, fontWeight: 'bold'},
  buynowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  decrementText: {fontSize: 28, color: 'white'},
  incrementText: {fontSize: 28, color: 'white'},
});

export default ProductList;
