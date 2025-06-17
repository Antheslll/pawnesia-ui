import { useEffect, useState } from "react";
import ItemCart from "./itemCart";
import { viewItemFetcher } from "@/lib/fetcher/cart/viewItemFetcher";
import { jwtDecode } from "jwt-decode";
import { checkoutDraftCreateFetcher } from "@/lib/fetcher/checkout/checkoutDraftCreateFetcher";

interface CartProps {
  handleOpenCart: () => void;
  handleCloseCartAccess: (bool: boolean) => void;
  handleCheckoutData: (data: any) => void;
  handleCheckoutOverlay: (bool: boolean) => void;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  profile_url: string;
  first_name: string;
  last_name?: string;
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
  created_at: string;
  product_id: string;
  quantity: number;
  user_id: string;
  Product: Product;
}

interface CartItemsResponse {
  data: CartItem[];
}

interface prepareCartCheckoutData {
  cartItemId: string;
  productData: {
    product_id: string;
    quantity: number;
    product_price: number;
  };
}

type prepareCartCheckoutItem = prepareCartCheckoutData[];

const Cart = ({
  handleOpenCart,
  handleCloseCartAccess,
  handleCheckoutData,
  handleCheckoutOverlay,
}: CartProps) => {
  const [cartData, setCartData] = useState<CartItemsResponse>();
  const [selectedCartData, setSelectedCartData] =
    useState<prepareCartCheckoutItem>([]);
  const [totalSelectedPrice, setTotalSelectedPrice] = useState(0);
  const [cartDataLength, setCartDataLength] = useState(0);
  const handleCartData = (data: CartItemsResponse) => {
    setCartData(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const getCartInfo = async () => {
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        const response = await viewItemFetcher(
          `http://localhost:5000/api/cart/view/${decoded.userId}`
        );

        setCartData(response);
        setCartDataLength(
          Array.isArray(response?.data) ? response.data.length : 0
        );
        console.log(response);
      }
    };
    getCartInfo();
  }, []);

  useEffect(() => {
    const priceArray = selectedCartData.map(
      (item) => item.productData.product_price * item.productData.quantity
    );
    const totalPrice = priceArray.reduce((item1, item2) => item1 + item2, 0);
    setTotalSelectedPrice(totalPrice);
  }, [selectedCartData]);

  const handleSelectedCartData = (
    item: prepareCartCheckoutData,
    tf: boolean
  ) => {
    if (tf) {
      setSelectedCartData((prev) => [...prev, item]);
    } else if (!tf) {
      const targetCartItemId = item.cartItemId;
      const filteredCartData = selectedCartData.filter(
        (data) => data.cartItemId !== targetCartItemId
      );
      setSelectedCartData(filteredCartData);
    }
  };

  const toCheckoutPage = async () => {
    const token = localStorage.getItem("auth_token");
    if (token && cartData && Array.isArray(cartData.data)) {
      const decode = jwtDecode<JwtPayload>(token);
      const itemId = selectedCartData.map((id) => id.cartItemId);

      if (selectedCartData.length !== 0) {
        const productData = selectedCartData?.map((product) => ({
          product_id: product.productData.product_id,
          quantity: product.productData.quantity,
        }));
        const data = {
          userId: decode.userId,
          cartItemId: itemId,
          productData: productData,
        };
        try {
          const fetchResponse = await checkoutDraftCreateFetcher(
            "http://localhost:5000/api/checkout/draft",
            data
          );
          if (fetchResponse.status === "Success") {
            handleCheckoutOverlay(true);
            handleCheckoutData(fetchResponse.detail.data);
            handleOpenCart();
            //ini terakhir sampai sini yaa ntar kita buat function lagi di mother component abis itu kita oper responsenya ke sana dan lalu kita oper lagi ke component checkoutOverlay
          } else {
            const errorResult = fetchResponse.json();
            throw new Error(JSON.stringify(errorResult));
          }
        } catch (err) {
          console.error("Gagal membuat draft checkout", err);
          alert("Gagal membuat draft Checkout");
        }
      } else {
        alert("Tidak ada produk yang anda select");
      }
    } else {
      alert("Tidak bisa checkout, tidak ada produk didalam keranjang");
    }
  };

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
            <span className="text-[23px] poppins-font font-bold">
              {cartDataLength} Items
            </span>
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
              productId={cartData?.Product?.product_id}
              initialQuantity={cartData?.quantity}
              handleCartData={handleCartData}
              handleCloseCartAccess={handleCloseCartAccess}
              handleSelectedCartData={handleSelectedCartData}
            />
          ))}
        </div>
        <div className="w-[80%] h-[20vh] grid grid-cols-2 border-t-2">
          <div className="flex pl-5">
            <h2 className="text-[15px] nunito-font"></h2>
          </div>
          <div className="flex flex-col items-end justify-between pr-5 pb-5">
            <span className="text-[15px] nunito-font">{`Rp ${totalSelectedPrice.toLocaleString(
              "ID"
            )},-`}</span>
            <button
              className="w-[60%] h-[8vh] button-background-color poppins-font font-bold text-white"
              onClick={() => {
                toCheckoutPage();
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
