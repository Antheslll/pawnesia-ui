import { AddToCartWhite } from "@/svg-assets/cart-icon";
import { ProductDetailResponse } from "@/types";
import { notFound } from "next/navigation";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

async function getProductById(
  id: string
): Promise<ProductDetailResponse | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      cache: "no-store", // atau "force-cache" kalau mau SSG
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const Product = async ({ params }: ProductDetailProps) => {
  const { id } = params;

  const product = await getProductById(id);
  console.log(product?.data?.product_image);

  if (!product) return notFound();

  return (
    <div className="w-full h-[100vh] grid grid-cols-[1.3fr_2fr]">
      <div className="w-full h-full bg-red-500 flex-centered">
        <div className="flex flex-col gap-y-5">
          <div
            className="w-[20vw] h-[20vw] bg-cover bg-center"
            style={{ backgroundImage: `url(${product?.data?.product_image})` }}
          ></div>
          <div className="flex gap-x-2">
            <button className="w-[4vw] h-[4vw] button-background-color flex-centered">
              <AddToCartWhite />
            </button>
            <button className="w-[15.2vw] h-[4vw] button-background-color text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Product;
