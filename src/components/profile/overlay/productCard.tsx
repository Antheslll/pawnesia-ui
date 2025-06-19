const ProductCard = () => {
  return (
    <>
      <div className="col-span-2 flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-gray-400">
          X
        </div>
        <span className="text-sm text-gray-700">product name</span>
      </div>
      <div className="text-center text-sm text-gray-500">1</div>
      <div className="text-center text-sm text-gray-700">Rp 00.000,-</div>
      <div className="text-center text-sm text-gray-700">Rp 00.000.000,-</div>
    </>
  );
};

export default ProductCard;
