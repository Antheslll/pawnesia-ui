"use client";
import TopProducts from "@/components/home-ui/topProducts";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductResponse, UserInfoTypes } from "@/types";
import Navbar from "@/components/navbar/navbar";
import Banner from "@/components/page/home-page/banner/banner";
import { showProducts } from "@/lib/fetcher/products/productsFetcher";
import { validateToken } from "@/lib/fetcher/token/tokenValidator";
import ProductArea from "@/components/home-ui/productArea";
import Cart from "@/components/cart/cart";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserInfoTypes | null>(null);
  const [category, setCategory] = useState("All");
  const [productData, setProductData] = useState<ProductResponse | null>(null);
  const [openCart, setOpenCart] = useState(false);
  const [closeCartAccess, setCloseCartAccess] = useState(true);
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
    console.log(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth?mode=login");
      return;
    }
    validateToken(token, errorHandler, handleUser);
    if (categoryParam) {
      setCategory(categoryParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <>
      {openCart && (
        <Cart
          handleOpenCart={handleOpenCart}
          handleCloseCartAccess={handleCloseCartAccess}
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
