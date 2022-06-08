export interface Product {
  productID: number;
  productName: string;
  productImageURL: string;
  productOrigin: string;
  productBrand: string;
  productWeight: string;
  productPrice: number;
  productQuantity: number;
}

export interface CartInterface {
  products: Product[];
  total: number;
}

export interface User {
  userName: string;
  userPhone: string;
  userEmail: string;
  userAddress: Address;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  addressLandmark: string;
  pincode: string;
  city: string;
  state: string;
}
