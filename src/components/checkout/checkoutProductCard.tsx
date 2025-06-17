/* eslint-disable react-hooks/exhaustive-deps */
import getProductById from "@/lib/fetcher/products/specificProductFetcher";
import { useEffect, useState } from "react";

interface CheckoutProductCardProps {
  productId: string;
  quantity: number;
  amount: number;
  calculateTotal: (
    productId: string,
    subtotal: number,
    quantity: number
  ) => void;
}

const CheckoutProductCard = ({
  productId,
  quantity,
  amount,
  calculateTotal,
}: CheckoutProductCardProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productInfo, setProductInfo] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [subtotal, setSubtotal] = useState(0);

  const takeProductInfo = async () => {
    const product = await getProductById(productId);
    setProductInfo(product);
  };

  useEffect(() => {
    takeProductInfo();
    setQty(quantity);
  }, []);

  const handleSubtractQuantity = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddQuantity = () => {
    setQty(qty + 1);
  };

  useEffect(() => {
    setSubtotal(amount * qty);
  }, [qty]);

  useEffect(() => {
    calculateTotal(productId, subtotal, qty);
  }, [subtotal]);

  return (
    <>
      <tr className="border-b">
        <td className="p-2 flex items-center gap-4">
          <div
            className="w-12 h-12 bg-center bg-cover rounded"
            style={{
              backgroundImage: `url(${productInfo?.dataProduct?.data?.product_image})`,
            }}
          ></div>
          <span>{productInfo?.dataProduct?.data?.product_name}</span>
        </td>
        <td className="p-2">
          <button
            className="w-[10%] border-2 border-gray-600"
            onClick={handleSubtractQuantity}
          >
            -
          </button>
          <input
            type="text"
            className="w-[20%] border-2 border-gray-600 text-center"
            value={qty ?? 1}
            readOnly
          />
          <button
            className=" w-[10%] border-2 border-gray-600"
            onClick={handleAddQuantity}
          >
            +
          </button>
        </td>
        <td className="p-2">{`Rp ${productInfo?.dataProduct?.data?.product_price.toLocaleString(
          "ID"
        )},-`}</td>
        <td className="p-2">{`Rp ${subtotal.toLocaleString("ID")},-`}</td>
      </tr>
    </>
  );
};

export default CheckoutProductCard;
