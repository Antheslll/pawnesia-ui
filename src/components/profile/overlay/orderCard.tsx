import { formatDate } from "@/lib/helper/dateFormatter";
import { DetailInfoProps, OrderDetails } from "@/types";

interface OrderCardProps {
  orderId: string;
  status: string;
  totalPrice: number;
  purchaseDate: string;
  proof: string;
  orderDetail: OrderDetails[];
  handleOpenOrderDetail: (bool: boolean) => void;
  handleOrderDetailData: (
    data: OrderDetails[],
    details: DetailInfoProps
  ) => void;
}

const OrderCard = ({
  orderId,
  status,
  totalPrice,
  purchaseDate,
  proof,
  orderDetail,
  handleOpenOrderDetail,
  handleOrderDetailData,
}: OrderCardProps) => {
  const details = {
    orderId,
    status,
    totalPrice,
    purchaseDate,
    proof,
  };
  return (
    <div
      className="w-[90%] bg-white rounded-md p-6 shadow-md flex flex-row justify-between items-start"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        onClick={() => {
          handleOpenOrderDetail(true);
          handleOrderDetailData(orderDetail, details);
        }}
      >
        <h2 className="text-lg font-semibold">
          Order-<span className="font-mono text-gray-700">{orderId}</span>
        </h2>
        <p className="text-sm text-red-600 mt-1">{status}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <p>{`Total: Rp ${totalPrice.toLocaleString("ID")},-`}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 text-sm text-gray-600 text-left">
        <p>{formatDate(purchaseDate, 0)}</p>
        <p className="mt-4">Est. tiba {formatDate(purchaseDate, 4)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
