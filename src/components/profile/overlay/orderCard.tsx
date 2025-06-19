const OrderCard = () => {
  return (
    <div className="bg-white rounded-md p-6 shadow-md flex flex-row justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">
          Order-<span className="font-mono text-gray-700">[code]</span>
        </h2>
        <p className="text-sm text-red-600 mt-1">pending</p>

        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <p>Total: Rp 00.000.000,-</p>
          <a href="#" className="underline text-blue-700 hover:text-blue-900">
            produk 1 + 1 item lainnya
          </a>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 text-sm text-gray-600 text-left">
        <p>01-06-2025</p>
        <p className="mt-4">Est. tiba 02-06-2025</p>
      </div>
    </div>
  );
};

export default OrderCard;
