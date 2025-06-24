// import ProductForm from "@/components/seller/createProductOverlay";
import CommentView from "@/components/seller/commentView";
import OrderView from "@/components/seller/orderView";
import ProductSettings from "@/components/seller/productSettings";
import SidebarSellerDashboard from "@/components/seller/sidebarSellerDashboard";
// import EditProduct from "@/components/seller/updateProduct";
import React from "react";

export default function SellersPoint() {
  return (
    <>
      {/* <ProductForm /> */}
      {/* <EditProduct /> */}
      <div className="min-h-screen bg-gray-200 flex">
        <SidebarSellerDashboard />

        <main className="flex-1 p-6 space-y-8">
          <ProductSettings />
          <CommentView />
          <OrderView />
        </main>
      </div>
    </>
  );
}
