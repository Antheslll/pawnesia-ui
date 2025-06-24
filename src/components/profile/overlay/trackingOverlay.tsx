/* eslint-disable react-hooks/exhaustive-deps */
import {
  DetailInfoProps,
  OrderAPIResponse,
  OrderData,
  OrderDetails,
} from "@/types";
import OrderCard from "./orderCard";
import { useEffect, useState } from "react";
import OrderCardConfirm from "./orderCardConfirm";

interface TrackingOverlayProps {
  trackStatus: string;
  handleOpenTracking: (bool: boolean) => void;
  orderInfo: OrderAPIResponse;
  handleOpenOrderDetail: (bool: boolean) => void;
  handleOrderDetailData: (
    data: OrderDetails[],
    details: DetailInfoProps
  ) => void;
}

const TrackingOverlay = ({
  trackStatus,
  handleOpenTracking,
  orderInfo,
  handleOpenOrderDetail,
  handleOrderDetailData,
}: TrackingOverlayProps) => {
  const [orderData, setOrderData] = useState<OrderData[]>();

  useEffect(() => {
    if (trackStatus === "PENDING") {
      setOrderData(orderInfo?.detail?.orderDataPending);
    } else if (trackStatus === "PACKAGES") {
      setOrderData(orderInfo?.detail?.orderDataPackages);
    } else if (trackStatus === "DELIVER") {
      setOrderData(orderInfo?.detail?.orderDataDeliver);
    } else if (trackStatus === "CONFIRMATION") {
      setOrderData(orderInfo?.detail?.orderDataConfirmation);
    } else if (trackStatus === "RECEIVED") {
      setOrderData(orderInfo?.detail?.orderDataReceived);
    }
  }, []);
  return (
    <div
      className="w-full h-[100vh] bg-gray-300 p-8 fixed z-30"
      onClick={() => {
        handleOpenTracking(false);
      }}
    >
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Tracking Order – <span className="font-normal">{trackStatus}</span>
      </h1>
      <div className="w-full flex-centered flex-col gap-5">
        {orderData?.map((data) =>
          trackStatus !== "RECEIVED" ? (
            <OrderCard
              key={data?.order_id}
              orderId={data?.order_id}
              status={data?.stat}
              totalPrice={data?.total_price}
              purchaseDate={data?.order_time}
              proof={data?.proof_of_transfer}
              orderDetail={data?.OrderDetails}
              handleOpenOrderDetail={handleOpenOrderDetail}
              handleOrderDetailData={handleOrderDetailData}
            />
          ) : (
            <OrderCardConfirm
              key={data?.order_id}
              orderId={data?.order_id}
              status={data?.stat}
              totalPrice={data?.total_price}
              purchaseDate={data?.order_time}
              proof={data?.proof_of_transfer}
              orderDetail={data?.OrderDetails}
              handleOpenOrderDetail={handleOpenOrderDetail}
              handleOrderDetailData={handleOrderDetailData}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TrackingOverlay;
