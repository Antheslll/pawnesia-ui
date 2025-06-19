import ProductCard from "./productCard";

export default function OrderDetail() {
  return (
    <div className="w-full min-h-screen bg-gray-300 p-8 absolute z-30">
      <div className="bg-white rounded-md p-6 shadow-md space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">
              Order-<span className="font-mono text-gray-700">[code]</span>
            </h2>
            <p className="text-sm text-red-600 mt-1">packages</p>
          </div>
          <div className="text-right text-sm text-gray-700">
            <p>01-06-2025</p>
            <p className="text-gray-500">Est. 06-06-2025</p>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 font-semibold text-gray-700 border-b pb-2">
          <div className="col-span-2">Product</div>
          <div className="text-center">qty</div>
          <div className="text-center">price</div>
          <div className="text-center">total</div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 items-center py-4 border-b">
          <ProductCard />
        </div>

        <div className="flex justify-end pt-4 text-sm font-medium text-gray-800">
          <p>
            Total: &nbsp; <span className="font-normal">Rp 00.000.000,-</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Bukti Transfer
          </h3>
          <div className="flex items-center gap-4 bg-gray-200 p-4 rounded-md w-full max-w-md">
            <div className="w-12 h-12 bg-gray-400 flex items-center justify-center text-white font-bold">
              X
            </div>
            <p className="text-sm text-gray-800">Nama File</p>
          </div>
        </div>
      </div>
    </div>
  );
}
