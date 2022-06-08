import React from 'react';
import {View, ScrollView} from 'react-native';
import ProductList from '../ProductList';
import {data} from '../../data/data';

const Product = () => {
  return (
    <View style={{paddingHorizontal: 10, paddingTop: 10}}>
      <ScrollView>
        {data.map(item => {
          return (
            <ProductList
              key={item.productID}
              productName={item.productName}
              productBrand={item.productBrand}
              productOrigin={item.productOrigin}
              productWeight={item.productWeight}
              productPrice={item.productPrice}
              productImageURL={item.productImageURL}
              productQuantity={item.productQuantity}
              productID={item.productID}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Product;
