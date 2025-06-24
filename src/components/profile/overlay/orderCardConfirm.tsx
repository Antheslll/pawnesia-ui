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

const OrderCardConfirm = ({
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
      className="w-[90%] bg-white rounded-md p-6 shadow-md flex flex-col justify-between items-start border border-gray-300"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex justify-between items-start text-sm text-gray-600">
        <div
          onClick={() => {
            handleOpenOrderDetail(true);
            handleOrderDetailData(orderDetail, details);
          }}
        >
          <h2 className="text-lg font-semibold text-black">
            Order–<span className="font-mono text-gray-700">{orderId}</span>
          </h2>
          <p className="text-red-500 text-xs mt-1">{status}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-800">
            <p>Total: Rp {totalPrice.toLocaleString("ID")},-</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 text-right mt-1 sm:mt-0">
          <p>{formatDate(purchaseDate, 0)}</p>
          <p className="mt-4">Est. tiba {formatDate(purchaseDate, 4)}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center w-full text-sm">
        <div className="flex items-center space-x-1 text-green-600 font-medium cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Received</span>
        </div>

        <div className="flex items-center space-x-1 text-red-600 font-medium cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Not Yet Received</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCardConfirm;
