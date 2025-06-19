import OrderTrackingElements from "./orderTrackingElements";

const OrderTracking = () => {
  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Tracking Order</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        <OrderTrackingElements />
        <OrderTrackingElements />
        <OrderTrackingElements />
        <OrderTrackingElements />
      </div>
    </section>
  );
};

export default OrderTracking;
