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
  product_id: string;
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

export interface UserInfo {
  profile_picture: string;
  first_name: string;
  last_name: string;
}

export interface CommentItem {
  comment_id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comments: string;
  link: string;
  comment_time: string; // ISO date string, bisa pakai Date kalau kamu parsing
  User?: UserInfo; // Opsional karena hanya muncul di elemen pertama
}

export interface CommentResponse {
  status: string;
  message: string;
  data: CommentItem[];
}

export interface OrderDetailDraftData {
  amount: number;
  order_detail_id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  subtotal: number;
}

export interface OrdersDraftData {
  estimate_arrival: string | null;
  order_id: string;
  order_time: string | null;
  proof_of_transfer: string | null;
  status: string | null;
  total_price: number;
  user_id: string;
}

export interface ShippingAddressData {
  address: string | null;
  order_id: string;
  phone_number: string | null;
  receiver_name: string | null;
  shipping_address_id: string | null;
}

export interface CreateCheckoutDraftResponse {
  OrderDetailDraftData: OrderDetailDraftData[];
  OrdersDraftData: OrdersDraftData[];
  ShippingAddressDraftData: ShippingAddressData[];
}

export interface ReceiverDataProps {
  name: string;
  phoneNumber1: string;
  phoneNumber2: string;
  address: string;
}

export interface ProfileInfoProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface OrderDetails {
  // Sesuaikan dengan struktur isi di dalam OrderDetails jika kamu tahu fields-nya
  // Misal:
  amount: number;
  order_detail_id: string;
  order_id: string;
  product_id?: string;
  quantity?: number;
  price?: number;
  subtotal: number;
  Product: Productss;
}

export interface OrderData {
  order_id: string;
  user_id: string;
  order_time: string; // ISO timestamp
  proof_of_transfer: string;
  total_price: number;
  stat: "PENDING" | "PACKAGES" | "DELIVER" | "RECEIVED" | "CONFIRMATION";
  estimate_arrival: string | null;
  OrderDetails: OrderDetails[];
}

export interface OrderResponseDetail {
  orderDataPending: OrderData[];
  orderDataPackages: OrderData[];
  orderDataDeliver: OrderData[];
  orderDataReceived: OrderData[];
  orderDataConfirmation: OrderData[];
}

export interface OrderAPIResponse {
  status: "Success" | "Error";
  message: string;
  detail: OrderResponseDetail;
}

export interface DetailInfoProps {
  orderId: string;
  status: string;
  proof: string;
  totalPrice: number;
  purchaseDate: string;
}

export interface Productss {
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;
  product_price: number;
  stock: number;
  product_image: string;
  uuid: string;
}

//--------------------
// types.ts

export interface ProductComment {
  product_id: string;
  uuid: string;
  product_name: string;
  product_price: number;
  product_description: string;
  // Tambahan properti lain jika diperlukan, misalnya:
  // product_image?: string;
}

export interface UserComment {
  profile_picture: string;
  first_name: string;
  last_name: string;
  // Bisa tambahkan email atau ID jika dibutuhkan
}

export interface CommentItem {
  comment_id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comments: string;
  comment_time: string; // ISO Date string
  link: string | null;
  Product?: ProductComment; // Pastikan ini cocok dengan data asli
  User?: UserComment;
}

export type CommentList = CommentItem[];

//---------------------------utk getOrderData
export interface OrderDataResponse {
  order_id: string;
  user_id: string;
  order_time: string; // bisa diubah ke Date jika ingin langsung diparse
  estimate_arrival: string | null;
  stat: "PENDING" | "PACKAGES" | "DELIVER" | "CONFIRMATION" | "RECEIVED"; // tambahkan status lain sesuai kebutuhan
  total_price: number;
  proof_of_transfer: string;
}
