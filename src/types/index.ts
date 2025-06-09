//definisi tipe data

export type AuthResponseType = {
  message: string;
  token: string;
  user: {
    user_id: string;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    phoneNumber: string;
    address: string;
  };
};

export interface UserDataTypes {
  userId: string;
  email: string;
  role: string;
  profile_url: string;
  iat: number;
  exp: number;
}

export interface UserInfoTypes {
  success: boolean;
  message: string;
  data: UserDataTypes;
}

// types/Product.ts
export interface Product {
  uuid: string;
  product_image: string;
  product_name: string;
  product_price: number;
}

export interface ProductResponse {
  status: string;
  message: string;
  data: {
    products: Product[];
    topProducts: Product[];
  };
}

export interface ProductDetailResponse {
  status: string;
  message: string;
  data: {
    uuid: string;
    product_id: string;
    product_name: string;
    product_price: number;
    product_image: string;
    product_description: string;
    category: string;
    stock: number;
  };
}
