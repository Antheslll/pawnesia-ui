import { AddToCartWhite } from "@/svg-assets/cart-icon";
import { StarIcon } from "@/svg-assets/star-icon";

interface ProductDisplayProps {
  productImage: string;
  productRating: number;
}

const ProductDisplay = ({
  productImage,
  productRating,
}: ProductDisplayProps) => {
  return (
    <div className="w-full h-full pt-[10vh] flex justify-center">
      <div className="flex flex-col gap-y-5">
        <div
          className="w-[20vw] h-[20vw] bg-cover bg-center"
          style={{
            backgroundImage: `url(${productImage})`,
          }}
        ></div>
        <div className="grid grid-cols-[1fr_3fr]">
          <div className="flex-centered">
            <span>{productRating}</span>
          </div>
          <div className="flex flex-row">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
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
  );
};

export default ProductDisplay;
