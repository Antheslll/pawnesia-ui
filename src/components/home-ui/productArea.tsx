/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductCard from "./product-card/productCard";
import { Product } from "@/types";

interface ProductAreaTypes {
  productData: Product[] | null;
}

const ProductArea = ({ productData }: ProductAreaTypes) => {
  return (
    <div className="pt-10 pb-[20vh]">
      <div className="w-full h-auto pl-[5%] flex flex-row flex-wrap gap-x-3.5 gap-y-7">
        {productData?.map((product: any) => (
          <ProductCard
            key={product.uuid}
            productId={product.product_id}
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

export default ProductArea;
