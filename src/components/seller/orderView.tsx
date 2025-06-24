"use client";
import { useEffect, useState } from "react";
import OrderViewCard from "./orderViewCard";
import { getSellerData } from "@/lib/fetcher/seller/getProductData";
import { OrderDataResponse } from "@/types";

const OrderView = () => {
  const [orderData, setOrderData] = useState<OrderDataResponse[] | undefined>();

  useEffect(() => {
    const getOrderData = async () => {
      const orderData = await getSellerData(
        "http://localhost:5000/api/order/view"
      );

      setOrderData(orderData?.data?.orderData);
    };

    getOrderData();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow h-[70vh]">
      <h2 className="text-lg font-semibold mb-4">Order</h2>
      <div className="h-[50vh] overflow-y-auto">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="py-2">Order Code</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order) => (
              <OrderViewCard
                key={order?.order_id}
                orderId={order?.order_id}
                status={order?.stat}
                date={order?.order_time}
                total={order?.total_price}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderView;
