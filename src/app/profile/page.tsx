import Faq from "@/components/profile/faq";
import OrderTracking from "@/components/profile/orderTracking";
import OrderDetail from "@/components/profile/overlay/orderDetail";
import TrackingOverlay from "@/components/profile/overlay/trackingOverlay";
import SidebarProfile from "@/components/profile/sidebarProfile";
import UserInfo from "@/components/profile/userInfo";

// Dashboard.tsx
export default function Profile() {
  return (
    <div className="min-h-screen gray-background-color flex">
      <SidebarProfile />
      {/* <TrackingOverlay /> */}
      <OrderDetail />
      <main className="flex-1  p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

        <UserInfo />

        <OrderTracking />

        <Faq />
      </main>
    </div>
  );
}
