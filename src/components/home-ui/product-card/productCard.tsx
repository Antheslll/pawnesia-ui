import createItemFetcher from "@/lib/fetcher/cart/createItemFetcher";
import { AddToCart } from "@/svg-assets/cart-icon";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductCardTypes {
  uuid: string;
  productName: string;
  productId: string;
  productPrice: number;
  productImage: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  profile_url: string;
  first_name: string; // Tambahkan ini
  last_name?: string; // Optional kalau perlu
  iat?: number;
  exp?: number;
}

const ProductCard = ({
  uuid,
  productName,
  productId,
  productPrice,
  productImage,
}: ProductCardTypes) => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const productDetailNavigate = (uuid: string) => {
    router.push(`/product/${uuid}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserId(decoded.userId);
    }
  }, []);

  const data = {
    userId: userId,
    productId: productId,
    quantity: 1,
  };

  const addItem = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    await createItemFetcher("http://localhost:5000/api/cart/create", data);

    alert(`item ${productId} sudah ditambahkan`);
    return;
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
        <div
          className="w-[3vw] h-[3vw] bg-white absolute flex-centered"
          onClick={(e) => {
            addItem(e);
          }}
        >
          <div>
            <AddToCart />
          </div>
        </div>
      </div>
      <h4 className="text-[13px]">{productName}</h4>
      <span>{`Rp ${productPrice.toLocaleString("ID")},-`}</span>
    </div>
  );
};

export default ProductCard;
