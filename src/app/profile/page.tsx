"use client";
import Faq from "@/components/profile/faq";
import OrderTracking from "@/components/profile/orderTracking";
import OrderDetail from "@/components/profile/overlay/orderDetail";
import TrackingOverlay from "@/components/profile/overlay/trackingOverlay";
import SidebarProfile from "@/components/profile/sidebarProfile";
import UserInfo from "@/components/profile/userInfo";
import { getOrderFetcher } from "@/lib/fetcher/profile/getOrderFetcher";
import { DetailInfoProps, OrderAPIResponse, OrderDetails } from "@/types";
import { useEffect, useState } from "react";

// Dashboard.tsx
export default function Profile() {
  const [openTrackingOverlay, setOpenTrackingOverlay] = useState(false);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [trackStatus, setTrackStatus] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderAPIResponse | undefined>();
  const [orderDetailData, setOrderDetailData] = useState<OrderDetails[]>();
  const [detailInfo, setDetailInfo] = useState({
    orderId: "",
    status: "",
    totalPrice: 0,
    purchaseDate: "",
    proof: "",
  });

  const handleOpenTracking = (bool: boolean) => {
    setOpenTrackingOverlay(bool);
  };

  const handleOpenOrderDetail = (bool: boolean) => {
    setOpenOrderDetail(bool);
  };

  const handleTrackStatus = (status: string) => {
    setTrackStatus(status);
  };

  const handleOrderDetailData = (
    data: OrderDetails[],
    details: DetailInfoProps
  ) => {
    setOrderDetailData(data);
    setDetailInfo(details);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      const gettingOrder = async () => {
        const response = await getOrderFetcher(
          "http://localhost:5000/api/profile/user/order",
          token
        );
        if (response) {
          setOrderInfo(response);
          return response;
        }
      };
      gettingOrder();
    }
  }, []);

  return (
    <div className="min-h-screen gray-background-color flex">
      <SidebarProfile />
      {openOrderDetail && (
        <OrderDetail
          handleOpenOrderDetail={handleOpenOrderDetail}
          orderDetailData={orderDetailData ?? []}
          detailInfo={detailInfo}
        />
      )}
      {openTrackingOverlay && (
        <TrackingOverlay
          trackStatus={trackStatus}
          handleOpenTracking={handleOpenTracking}
          orderInfo={orderInfo!}
          handleOpenOrderDetail={handleOpenOrderDetail}
          handleOrderDetailData={handleOrderDetailData}
        />
      )}
      <main className="flex-1  p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        <UserInfo />

        <OrderTracking
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />

        <Faq />
      </main>
    </div>
  );
}
