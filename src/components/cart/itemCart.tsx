/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { deleteItemFetcher } from "@/lib/fetcher/cart/deleteItemFetecher";
import { updateQuantityItemFetcher } from "@/lib/fetcher/cart/updateQuantityItemFetcher";
import { viewItemFetcher } from "@/lib/fetcher/cart/viewItemFetcher";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

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

interface prepareCartCheckoutData {
  cartItemId: string;
  productData: {
    product_id: string;
    quantity: number;
    product_price: number;
  };
}

interface ItemCartProps {
  cartItemId: string;
  productImage: string;
  productName: string;
  productPrice: number;
  initialQuantity: number;
  productId: string;
  handleCartData: (data: CartItemsResponse) => void;
  handleCloseCartAccess: (bool: boolean) => void;
  handleSelectedCartData: (item: prepareCartCheckoutData, tf: boolean) => void;
}

const ItemCart = ({
  cartItemId,
  productImage,
  productName,
  productPrice,
  initialQuantity,
  handleCartData,
  handleCloseCartAccess,
  handleSelectedCartData,
  productId,
}: ItemCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  let timeOutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, []);

  useEffect(() => {
    setSubtotal(productPrice * quantity);
  }, [productPrice, quantity]);

  const handleSubtractQuantity = () => {
    clearTimeout(timeOutId);
    handleCloseCartAccess(false);

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

    timeOutId = setTimeout(async () => {
      await updateQuantityItemFetcher(
        `http://localhost:5000/api/cart/update/quantity/${cartItemId}/`,
        { quantity: quantity }
      );
      handleCloseCartAccess(true);
    }, 500);
  };

  const handleAddQuantity = () => {
    clearTimeout(timeOutId);
    setQuantity(quantity + 1);
    handleCloseCartAccess(false);

    timeOutId = setTimeout(async () => {
      await updateQuantityItemFetcher(
        `http://localhost:5000/api/cart/update/quantity/${cartItemId}/`,
        { quantity }
      );
      handleCloseCartAccess(true);
    }, 500);
  };

  const removeItem = async () => {
    await deleteItemFetcher(
      `http://localhost:5000/api/cart/delete/${cartItemId}`
    );

    const token = localStorage.getItem("auth_token");

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const response = await viewItemFetcher(
        `http://localhost:5000/api/cart/view/${decoded.userId}`
      );

      handleCartData(response);
    }

    return;
  };

  const handleChange = () => {
    const data = {
      cartItemId: cartItemId,
      productData: {
        product_id: productId,
        quantity: quantity,
        product_price: productPrice,
      },
    };

    setIsChecked(!isChecked);
    handleSelectedCartData(data, !isChecked);
  };

  return (
    <div className="w-full h-[10vh] grid grid-cols-[5%_40%_15%_20%_20%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <input type="checkbox" onChange={handleChange} />
        <span
          className="text-red-500 font-bold poppins-font cursor-pointer"
          onClick={removeItem}
        >
          X
        </span>
      </div>
      <div className="w-full h-full bg-white flex items-center gap-3">
        <div
          className="w-[3vw] h-[3vw] bg-yellow-400 bg-cover bg-center"
          style={{ backgroundImage: `url(${productImage})` }}
        ></div>
        <div className="w-auto h-[3vw]">
          <span className="text-[13px]">{productName}</span>
        </div>
      </div>
      <div className="flex-centered gap-1">
        <button
          className="w-[20%] border-2 border-gray-600"
          onClick={handleSubtractQuantity}
          disabled={isChecked}
        >
          -
        </button>
        <input
          type="text"
          className="w-[50%] border-2 border-gray-600 text-center"
          value={quantity}
          readOnly
        />
        <button
          className=" w-[20%] border-2 border-gray-600"
          onClick={handleAddQuantity}
          disabled={isChecked}
        >
          +
        </button>
      </div>
      <div className="flex-centered">
        <span className="text-[12px]">{`Rp ${productPrice.toLocaleString(
          "ID"
        )},-`}</span>
      </div>
      <div className="flex-centered">
        <span className="text-[12px]">{`Rp ${subtotal.toLocaleString(
          "ID"
        )},-`}</span>
      </div>
    </div>
  );
};

export default ItemCart;
