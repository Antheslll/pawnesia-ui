import { AddToCart } from "@/svg-assets/cart-icon";
import { useRouter } from "next/navigation";

interface ProductCardTypes {
  uuid: string;
  productName: string;
  productPrice: number;
  productImage: string;
}

const ProductCard = ({
  uuid,
  productName,
  productPrice,
  productImage,
}: ProductCardTypes) => {
  const router = useRouter();

  const productDetailNavigate = (uuid: string) => {
    router.push(`/product/${uuid}`);
  };
  return (
    <div
      className="w-[15vw] h-[20vw]"
      onClick={() => {
        productDetailNavigate(uuid);
      }}
    >
      <div
        className="w-[15vw] h-[15vw] bg-center bg-cover flex justify-end pt-1.5 pr-1.5"
        style={{ backgroundImage: `url(${productImage})` }}
      >
        <div className="w-[3vw] h-[3vw] bg-white absolute flex-centered">
          <AddToCart />
        </div>
      </div>
      <h4 className="text-[13px]">{productName}</h4>
      <span>{`Rp ${productPrice.toLocaleString("ID")},-`}</span>
    </div>
  );
};

export default ProductCard;
