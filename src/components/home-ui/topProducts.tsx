/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types";
import ProductCard from "./product-card/productCard";

interface TopProductsType {
  topProductData: Product[] | null;
}

const TopProducts = ({ topProductData }: TopProductsType) => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="poppins-font font-bold text-[18px]">Top Products</h3>
      </div>
      <div className="w-full h-[60vh] pl-[5%] flex flex-row gap-3.5">
        {topProductData?.map((product: any) => (
          <ProductCard
            key={product.uuid}
            uuid={product.uuid}
            productImage={product.product_image}
            productName={product.product_name}
            productPrice={product.product_price}
          />
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
