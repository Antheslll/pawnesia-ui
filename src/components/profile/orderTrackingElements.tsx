interface OrderTrackingElementsProps {
  icon: React.ReactNode;
  text: string;
  handleOpenTracking: (bool: boolean) => void;
  handleTrackStatus: (status: string) => void;
}

const OrderTrackingElements = ({
  icon,
  text,
  handleOpenTracking,
  handleTrackStatus,
}: OrderTrackingElementsProps) => {
  return (
    <div
      className="flex flex-col items-center"
      onClick={() => {
        handleOpenTracking(true);
        handleTrackStatus(text.toUpperCase());
      }}
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
        <div className="scale-[40%]">{icon}</div>
      </div>
      <p className="mt-2 text-sm">{text}</p>
    </div>
  );
};
export default OrderTrackingElements;
