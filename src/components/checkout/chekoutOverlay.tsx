/* eslint-disable react-hooks/exhaustive-deps */
import {
  CreateCheckoutDraftResponse,
  OrderDetailDraftData,
  OrdersDraftData,
  ReceiverDataProps,
  ShippingAddressData,
} from "@/types";
import CheckoutProductCard from "./checkoutProductCard";
import { useEffect, useState } from "react";
import ReceiverInfo from "./receiverInfo";
import { draftFinalizeFetcher } from "@/lib/fetcher/checkout/draftFinalizeFetcher";

interface ChekoutOverlayProps {
  handleCheckoutOverlay: (bool: boolean) => void;
  checkoutInfo: CreateCheckoutDraftResponse;
  handlePaymentMethod: (method: string) => void;
  handleOpenPayment: (bool: boolean) => void;
  handleTotalPrice: (price: number) => void;
}

type Item = {
  id: string;
  subtotal: number;
};

const CheckoutOverlay = ({
  checkoutInfo,
  handlePaymentMethod,
  handleCheckoutOverlay,
  handleOpenPayment,
  handleTotalPrice,
}: ChekoutOverlayProps) => {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [receiverData, setReceiverData] = useState<ReceiverDataProps>({
    name: "",
    phoneNumber1: "",
    phoneNumber2: "",
    address: "",
  });
  const [orderDetailDraft, setOrderDetailDraft] = useState<
    OrderDetailDraftData[]
  >([]);
  const [orderDraftData, setOrderDraftData] = useState<OrdersDraftData[]>([]);
  const [shippingAddressData, setShippingAddressData] = useState<
    ShippingAddressData[]
  >([]);

  console.log(checkoutInfo);

  useEffect(() => {
    const newItemMap = checkoutInfo?.OrderDetailDraftData?.map((item) => ({
      id: item.product_id,
      subtotal: item.subtotal,
    }));

    setItemList(newItemMap);
    setOrderDetailDraft(checkoutInfo?.OrderDetailDraftData);
    setOrderDraftData(checkoutInfo?.OrdersDraftData);
    setShippingAddressData(checkoutInfo?.ShippingAddressDraftData);
  }, []);

  useEffect(() => {
    console.log("shipping: ", shippingAddressData);
  }, [shippingAddressData]);

  const calculateTotal = (
    productId: string,
    subtotal: number,
    quantity: number
  ) => {
    setItemList((prev) => {
      const filtered = prev.filter((item) => item.id !== productId);
      return [...filtered, { id: productId, subtotal }];
    });

    setOrderDetailDraft((prev) =>
      prev.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              subtotal,
              quantity,
            }
          : item
      )
    );
  };

  useEffect(() => {
    const price = itemList.map((item) => item.subtotal);
    const calculatedSubtotal = price.reduce(
      (itemPrev, itemNext) => itemPrev + itemNext,
      0
    );

    setTotalPrice(calculatedSubtotal);
  }, [itemList]);

  useEffect(() => {
    setOrderDraftData((prev) => {
      if (!prev.length) return prev;

      const updated = [...prev];
      updated[0] = {
        ...updated[0],
        total_price: totalPrice,
      };
      return updated;
    });
  }, [totalPrice]);

  const handleReceiverData = (
    name: string,
    phoneNumber1: string,
    phoneNumber2: string,
    address: string
  ) => {
    setReceiverData((prev) => {
      if (
        prev.name === name &&
        prev.phoneNumber1 === phoneNumber1 &&
        prev.phoneNumber2 === phoneNumber2 &&
        prev.address === address
      ) {
        return prev; // tidak ada perubahan
      }

      return {
        name,
        phoneNumber1,
        phoneNumber2,
        address,
      };
    });
  };

  useEffect(() => {
    const isReceiverFilled =
      receiverData.name !== "" &&
      receiverData.phoneNumber1 !== "" &&
      receiverData.address !== "";

    if (!isReceiverFilled || !shippingAddressData.length) return;

    const updatedShippingAddressData: ShippingAddressData = {
      address: receiverData.address,
      order_id: shippingAddressData?.[0]?.order_id,
      phone_number: receiverData.phoneNumber1,
      receiver_name: receiverData.name,
      shipping_address_id: shippingAddressData?.[0]?.shipping_address_id,
    };

    setShippingAddressData([updatedShippingAddressData]);
  }, [receiverData]);

  const draftSubmit = async () => {
    const data = {
      orderDetailDraftData: orderDetailDraft,
      ordersDraftData: orderDraftData,
      shippingAddressDraftData: shippingAddressData,
    };

    console.log("ini datanya: ", data);

    try {
      const submit = draftFinalizeFetcher(
        "http://localhost:5000/api/checkout/finalize",
        data
      );
      handleTotalPrice(totalPrice);
      handleOpenPayment(true);
      handleCheckoutOverlay(false);

      return submit;
    } catch (err) {
      console.error(err, "kena di yang terakhir");
      return err;
    }
  };

  return (
    <div className="fixed z-40 w-full h-full bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>
      <div className="grid grid-cols-[70%_30%]">
        <div>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Product</th>
                  <th className="p-2 pl-[6%]">Qty</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {checkoutInfo?.OrderDetailDraftData?.map((product) => (
                  <CheckoutProductCard
                    key={product.order_detail_id}
                    productId={product.product_id}
                    quantity={product.quantity}
                    amount={product.amount}
                    calculateTotal={calculateTotal}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mb-6">
            <span className="font-medium text-lg">
              Total: Rp {`${totalPrice.toLocaleString("ID")}`},-
            </span>
          </div>
        </div>
        <div className="pl-5 pt-3">
          <h3>Payment Method</h3>
          <br />
          <div>
            <select
              className="border-2 border-black"
              onChange={(e) => handlePaymentMethod(e.target.value)}
            >
              <option>-</option>
              <option>BCA</option>
              <option>BRI</option>
              <option>MANDIRI</option>
            </select>
          </div>
        </div>
      </div>

      <ReceiverInfo handleReceiverData={handleReceiverData} />

      <div className="flex justify-end">
        <button
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          onClick={draftSubmit}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutOverlay;
