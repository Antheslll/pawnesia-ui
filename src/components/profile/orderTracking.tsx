import {
  ConfirmationIcon,
  DeliverIcon,
  PackageIcon,
  PendingIcon,
  ReceivedIcon,
} from "@/svg-assets/tracking-order-assets";
import OrderTrackingElements from "./orderTrackingElements";

interface OrderTrackingProps {
  handleOpenTracking: (bool: boolean) => void;
  handleTrackStatus: (status: string) => void;
}

const OrderTracking = ({
  handleOpenTracking,
  handleTrackStatus,
}: OrderTrackingProps) => {
  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Tracking Order</h2>
      <div className="flex-centered flex-row gap-[13%] text-center">
        <OrderTrackingElements
          icon={<PendingIcon />}
          text="Pending"
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />
        <OrderTrackingElements
          icon={<PackageIcon />}
          text="Package"
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />
        <OrderTrackingElements
          icon={<DeliverIcon />}
          text="Deliver"
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />
        <OrderTrackingElements
          icon={<ConfirmationIcon />}
          text="Confirmation"
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />
        <OrderTrackingElements
          icon={<ReceivedIcon />}
          text="Received"
          handleOpenTracking={handleOpenTracking}
          handleTrackStatus={handleTrackStatus}
        />
      </div>
    </section>
  );
};

export default OrderTracking;
