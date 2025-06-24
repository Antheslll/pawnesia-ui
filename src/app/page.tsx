/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import TopProducts from "@/components/home-ui/topProducts";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreateCheckoutDraftResponse,
  ProductResponse,
  UserInfoTypes,
} from "@/types";
import Navbar from "@/components/navbar/navbar";
import Banner from "@/components/page/home-page/banner/banner";
import { showProducts } from "@/lib/fetcher/products/productsFetcher";
import { validateToken } from "@/lib/fetcher/token/tokenValidator";
import ProductArea from "@/components/home-ui/productArea";
import Cart from "@/components/cart/cart";
import CheckoutOverlay from "@/components/checkout/chekoutOverlay";
import PaymentOverlay from "@/components/checkout/paymentOverlay";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserInfoTypes | null>(null);
  const [category, setCategory] = useState("All");
  const [productData, setProductData] = useState<ProductResponse | null>(null);
  const [openCart, setOpenCart] = useState(false);
  const [closeCartAccess, setCloseCartAccess] = useState(true);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [checkoutInfo, setCheckoutInfo] =
    useState<CreateCheckoutDraftResponse | null>(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("filteredCategory");
  const router = useRouter();

  const errorHandler = (message: string) => {
    setErrorMessage(message);
    console.log(errorMessage);
    router.push("auth?mode=login");
  };

  const handleUser = (data: UserInfoTypes | null) => {
    setUserData(data);
  };

  useEffect(() => {
    console.log(userData);

    const role = userData?.data?.role;

    if (role === "SELLER") {
      router.push("seller-dashboard");
    }
  }, [userData]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      validateToken(token, errorHandler, handleUser);

      if (categoryParam) {
        setCategory(categoryParam);
      }
    } else if (!token) {
      router.push("/auth?mode=login");
      return;
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const fetchProducts = async () => {
        const data = await showProducts(
          `http://localhost:5000/api/products?category=${category}`
        );
        setProductData(data);
      };
      fetchProducts();
    }
  }, [userData, category]);

  const handleCategory = (category: string) => {
    setCategory(category);
    router.replace(`/?filteredCategory=${category}`);
  };

  const handleOpenCart = () => {
    if (closeCartAccess) {
      setOpenCart(!openCart);
    } else {
      return;
    }
  };

  const handleCloseCartAccess = (bool: boolean) => {
    setCloseCartAccess(bool);
  };

  const handleCheckoutOverlay = (bool: boolean) => {
    setOpenCheckout(bool);
  };
  const handleCheckoutData = (data: any) => {
    setCheckoutInfo(data);
  };
  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };
  const handleOpenPayment = (bool: boolean) => {
    setOpenPayment(bool);
  };
  const handleTotalPrice = (price: number) => {
    setTotalPrice(price);
  };

  return (
    <>
      {openCart && (
        <Cart
          handleOpenCart={handleOpenCart}
          handleCloseCartAccess={handleCloseCartAccess}
          handleCheckoutOverlay={handleCheckoutOverlay}
          handleCheckoutData={handleCheckoutData}
        />
      )}
      {openCheckout && (
        <CheckoutOverlay
          handleCheckoutOverlay={handleCheckoutOverlay}
          checkoutInfo={checkoutInfo!}
          handleTotalPrice={handleTotalPrice}
          handlePaymentMethod={handlePaymentMethod}
          handleOpenPayment={handleOpenPayment}
        />
      )}
      {openPayment && (
        <PaymentOverlay
          paymentMethod={paymentMethod}
          totalPrice={totalPrice}
          handleOpenPayment={handleOpenPayment}
          orderId={checkoutInfo?.OrdersDraftData?.[0]?.order_id}
        />
      )}
      <div>
        <Navbar
          handleCategory={handleCategory}
          profileURL={userData?.data?.profile_url}
          handleOpenCart={handleOpenCart}
        />
        <div className="w-full h-auto grid grid-cols-[10%_90%]">
          <div></div>
          <div className="w-full h-full ">
            <Banner />
            <TopProducts
              topProductData={productData?.data?.topProducts || null}
            />
            <hr />
            <ProductArea productData={productData?.data?.products || null} />
          </div>
        </div>
      </div>
    </>
  );
}
