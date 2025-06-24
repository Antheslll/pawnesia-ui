"use client";
import { useEffect, useState } from "react";
import ProductSettingsRecord from "./productSettingsRecord";
import { getSellerData } from "@/lib/fetcher/seller/getProductData";
import { ProductResponse } from "@/types";

const ProductSettings = () => {
  const [productData, setProductData] = useState<ProductResponse | null>();

  useEffect(() => {
    const getProductData = async () => {
      const takeProductData = await getSellerData(
        "http://localhost:5000/api/products?category=All"
      );
      setProductData(takeProductData);
    };

    getProductData();
  }, []);

  return (
    <section className="bg-white h-[70vh] p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Product Settings</h2>
        <div className="space-x-4">
          {["ALL", "Food", "Accessories", "Animals"].map((tab) => (
            <button
              key={tab}
              className="text-sm font-medium text-gray-500 hover:text-black"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[50vh] overflow-y-auto">
        <table className="w-full table-auto  text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="py-2">Product Name</th>
              <th className="py-2">Price</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {productData?.data?.products?.map((item) => (
              <ProductSettingsRecord
                key={item.product_id}
                productId={item.product_id}
                productImage={item.product_image}
                productPrice={item.product_price}
                productName={item.product_name}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-green-500 text-right mt-2 cursor-pointer">ADD</div>
    </section>
  );
};
export default ProductSettings;
