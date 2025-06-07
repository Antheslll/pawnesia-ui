"use client";
import TopProducts from "@/components/home-ui/topProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductResponse, UserInfoTypes } from "@/types";
import Navbar from "@/components/navbar/navbar";
import Banner from "@/components/page/home-page/banner/banner";
import { showProducts } from "@/lib/fetcher/products/productsFetcher";
import { validateToken } from "@/lib/fetcher/token/tokenValidator";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserInfoTypes | null>(null);
  const [category, setCategory] = useState("All");
  const [productData, setProductData] = useState<ProductResponse | null>(null);
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
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth?mode=login");
      return;
    }
    validateToken(token, errorHandler, handleUser);
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

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <div>
      <Navbar />
      <div className="w-full h-auto grid grid-cols-[10%_90%]">
        <div></div>
        <div className="w-full h-full">
          <Banner />
          <TopProducts />
          {productData?.data.topProducts.map((product: any) => (
            <div key={product.uuid}>
              <p>nama:{product.product_name}</p>
              <p>harga:{product.product_price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// {productData?.data?.products?.length > 0 ? (
//             productData.data.products.map((product: any) => (
//               <div key={product.id} className="border p-2 mb-2">
//                 <p>Nama: {product.name}</p>
//                 <p>Harga: {product.price}</p>
//               </div>
//             ))
//           ) : (
//             <p>Tidak ada produk</p>
//           )}
