import OrderCard from "./orderCard";

const TrackingOverlay = () => {
  return (
    <div className="w-full h-[100vh] bg-gray-300 p-8 absolute">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Tracking Order – <span className="font-normal">Pending</span>
      </h1>

      <OrderCard />
    </div>
  );
};

export default TrackingOverlay;
