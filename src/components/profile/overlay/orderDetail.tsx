import { DetailInfoProps, OrderDetails } from "@/types";
import ProductCard from "./productCard";
import { formatDate } from "@/lib/helper/dateFormatter";

interface OrderDetailProps {
  handleOpenOrderDetail: (bool: boolean) => void;
  orderDetailData: OrderDetails[];
  detailInfo: DetailInfoProps;
}

export default function OrderDetail({
  handleOpenOrderDetail,
  orderDetailData,
  detailInfo,
}: OrderDetailProps) {
  console.log(detailInfo);
  return (
    <div
      className="w-full min-h-screen bg-gray-300 p-8 fixed z-40"
      onClick={() => {
        handleOpenOrderDetail(false);
      }}
    >
      <div
        className="bg-white rounded-md p-6 shadow-md space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">
              Order-
              <span className="font-mono text-gray-700">
                {detailInfo?.orderId}
              </span>
            </h2>
            <p className="text-sm text-red-600 mt-1">{detailInfo?.status}</p>
          </div>
          <div className="text-right text-sm text-gray-700">
            <p>{formatDate(detailInfo?.purchaseDate, 0)}</p>
            <p className="text-gray-500">
              Est. {formatDate(detailInfo?.purchaseDate, 4)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-2">
          <div className="col-span-2">Product</div>
          <div className="text-center">qty</div>
          <div className="text-center">price</div>
          <div className="text-center">total</div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 items-center py-4 border-b">
          {orderDetailData.map((product) => (
            <ProductCard
              key={product?.order_detail_id}
              amount={product?.amount}
              quantity={product?.quantity || 0}
              subtotal={product?.subtotal}
              productName={product?.Product?.product_name}
              productImage={product?.Product?.product_image}
            />
          ))}
        </div>

        <div className="flex justify-end pt-4 text-sm font-medium text-gray-800">
          <p>
            Total: &nbsp;{" "}
            <span className="font-normal">{`Rp ${detailInfo?.totalPrice.toLocaleString(
              "ID"
            )},-`}</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Bukti Transfer
          </h3>
          <div className="flex items-center gap-4 bg-gray-200 p-4 rounded-md w-full max-w-md">
            <div
              className="w-12 h-12  flex items-center justify-center"
              style={{ backgroundImage: `url(${detailInfo?.proof})` }}
            ></div>
            <p className="text-sm text-gray-800">Nama File</p>
          </div>
        </div>
      </div>
    </div>
  );
}
