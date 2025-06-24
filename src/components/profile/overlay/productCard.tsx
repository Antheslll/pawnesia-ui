interface ProductCardProps {
  amount: number;
  quantity: number;
  subtotal: number;
  productName: string;
  productImage: string;
}

const ProductCard = ({
  amount,
  quantity,
  subtotal,
  productName,
  productImage,
}: ProductCardProps) => {
  return (
    <>
      <div className="col-span-2 flex items-center gap-4">
        <div
          className="w-12 h-12 bg-cover bg-fit flex items-center justify-center"
          style={{ backgroundImage: `url(${productImage})` }}
        ></div>
        <span className="text-sm text-gray-700">{productName}</span>
      </div>
      <div className="text-center text-sm text-gray-500">{quantity}</div>
      <div className="text-center text-sm text-gray-700">
        Rp {amount.toLocaleString("ID")},-
      </div>
      <div className="text-center text-sm text-gray-700">
        Rp {subtotal.toLocaleString("ID")},-
      </div>
    </>
  );
};

export default ProductCard;
