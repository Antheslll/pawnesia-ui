/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductDisplay from "@/components/page/product-page/product-display";
import ProductInfo from "@/components/page/product-page/product-info";
import getProductById from "@/lib/fetcher/products/specificProductFetcher";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

const Product = async ({ params }: ProductDetailProps) => {
  const { id } = await params;

  const { dataProduct, dataComment } = await getProductById(id);

  if (!dataProduct) return notFound();

  const ratingMap = dataComment?.data?.map((comment: any) => comment.rating);
  const ratingSum = ratingMap.reduce(
    (rating: number, ratingN: number) => rating + ratingN,
    0
  );
  const ratingAverage = Math.round((ratingSum / ratingMap.length) * 10) / 10;

  return (
    <>
      <div className="w-full h-[100vh] grid grid-cols-[1.3fr_2fr] relative z-30">
        <div className="absolute z-20">
          <Link href="/">
            <h1>HOME</h1>
          </Link>
        </div>
        <ProductDisplay
          productImage={dataProduct?.data?.product_image}
          productRating={ratingAverage}
        />
        <ProductInfo
          productName={dataProduct?.data?.product_name}
          productId={dataProduct?.data?.product_id}
          productPrice={dataProduct?.data?.product_price}
          productDescription={dataProduct?.data?.product_description}
          commentData={dataComment?.data}
        />
      </div>
    </>
  );
};

export default Product;
