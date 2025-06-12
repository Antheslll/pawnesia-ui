import { useEffect, useState } from "react";
import ItemCart from "./itemCart";
import { viewItemFetcher } from "@/lib/fetcher/cart/viewItemFetcher";
import { jwtDecode } from "jwt-decode";

interface CartProps {
  handleOpenCart: () => void;
  handleCloseCartAccess: (bool: boolean) => void;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  profile_url: string;
  first_name: string; // Tambahkan ini
  last_name?: string; // Optional kalau perlu
  iat?: number;
  exp?: number;
}
interface Product {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  uuid: string;
}

interface CartItem {
  cart_item_id: string;
  created_at: string; // atau Date, kalau kamu langsung parse pakai new Date()
  product_id: string;
  quantity: number;
  user_id: string;
  Product: Product;
}

interface CartItemsResponse {
  data: CartItem[];
}

const Cart = ({ handleOpenCart, handleCloseCartAccess }: CartProps) => {
  const [cartData, setCartData] = useState<CartItemsResponse>();

  const handleCartData = (data: CartItemsResponse) => {
    setCartData(data);
  };

  useEffect(() => {
    const getCartInfo = async () => {
      const token = localStorage.getItem("auth_token");

      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        const response = await viewItemFetcher(
          `http://localhost:5000/api/cart/view/${decoded.userId}`
        );

        setCartData(response);
      }
    };
    getCartInfo();
  }, []);

  return (
    <div
      className="w-full h-[100vh] fixed z-40 bg-black/50 flex-centered"
      onClick={handleOpenCart}
    >
      <div
        className="w-[60%] h-[70vh] bg-white flex flex-col items-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-[80%] h-[10vh] grid grid-cols-2 border-b-2">
          <div className="flex items-center pl-5">
            <h2 className="text-[25px] poppins-font font-bold">Cart</h2>
          </div>
          <div className="flex justify-end items-center pr-5">
            <span className="text-[23px] poppins-font font-bold">1 Items</span>
          </div>
        </div>
        <div className="w-[80%] h-[40vh] pt-5">
          {cartData?.data?.map((cartData) => (
            <ItemCart
              key={cartData?.cart_item_id}
              cartItemId={cartData?.cart_item_id}
              productImage={cartData?.Product?.product_image}
              productName={cartData?.Product?.product_name}
              productPrice={cartData?.Product?.product_price}
              initialQuantity={cartData?.quantity}
              handleCartData={handleCartData}
              handleCloseCartAccess={handleCloseCartAccess}
            />
          ))}
        </div>
        <div className="w-[80%] h-[20vh] grid grid-cols-2 border-t-2">
          <div className="flex pl-5">
            <h2 className="text-[15px] nunito-font">1 Items selected</h2>
          </div>
          <div className="flex flex-col items-end justify-between pr-5 pb-5">
            <span className="text-[15px] nunito-font">Rp.00.000.000,-</span>
            <button className="w-[60%] h-[8vh] button-background-color poppins-font font-bold text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
