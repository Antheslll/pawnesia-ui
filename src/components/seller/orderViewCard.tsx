import { formatDate } from "@/lib/helper/dateFormatter";

interface OrderViewCardProps {
  orderId: string;
  status: string;
  date: string;
  total: number;
}

const OrderViewCard = ({
  orderId,
  status,
  date,
  total,
}: OrderViewCardProps) => {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 text-[8px]">Order-{orderId}</td>
      <td className="py-2 text-red-500 text-left">{status}</td>
      <td className="py-2">{formatDate(date)}</td>
      <td className="py-2">{`Rp ${total.toLocaleString("ID")},-`}</td>
    </tr>
  );
};

export default OrderViewCard;
