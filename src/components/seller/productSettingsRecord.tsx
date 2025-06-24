interface ProductSettingsRecordProps {
  productName: string;
  productPrice: number;
  productId: string;
  productImage: string;
}

const ProductSettingsRecord = ({
  productName,
  productPrice,
}: ProductSettingsRecordProps) => {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2">{productName}</td>
      <td className="py-2">{`Rp ${productPrice.toLocaleString("ID")} ,-`}</td>
      <td className="py-2 text-blue-500 cursor-pointer">edit</td>
    </tr>
  );
};

export default ProductSettingsRecord;
