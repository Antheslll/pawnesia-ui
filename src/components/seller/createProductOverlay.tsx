import React from "react";

export default function ProductForm() {
  return (
    <form className="bg-white w-full h-[100vh] p-8 rounded shadow-md fixed z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded bg-gray-200"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Product Price</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded bg-gray-200"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Product Description
            </label>
            <textarea
              className="w-full h-32 border border-gray-300 p-2 rounded bg-gray-200"
              placeholder="Enter description"
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div>
              <label className="block font-medium mb-1">Stock</label>
              <input
                type="number"
                className="w-24 border border-gray-300 p-2 rounded bg-gray-200"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select className="w-40 border border-gray-300 p-2 rounded bg-gray-200">
                <option>Food</option>
                <option>Accessories</option>
                <option>Animals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="flex justify-center items-center">
          <div className="w-64 h-64 border-2 border-gray-400 flex justify-center items-center bg-gray-200 relative">
            <div className="absolute w-full h-0.5 bg-gray-500 transform rotate-45"></div>
            <div className="absolute w-full h-0.5 bg-gray-500 transform -rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-6 mt-6">
        <button
          type="submit"
          className="text-green-600 font-semibold hover:underline"
        >
          ADD
        </button>
        <button
          type="button"
          className="text-red-600 font-semibold hover:underline"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
