import React from "react";
// import { Pencil } from "lucide-react";

export default function EditProduct() {
  return (
    <div className="bg-white w-full h-[100vh] fixed z-20 p-8 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-6">
        product - <span className="text-gray-600">[code]</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Image Placeholder */}
          <div className="w-50 h-50 border-2 border-gray-400 relative bg-gray-200">
            <div className="absolute w-full h-0.5 bg-gray-500 transform rotate-45 top-1/2 left-0"></div>
            <div className="absolute w-full h-0.5 bg-gray-500 transform -rotate-45 top-1/2 left-0"></div>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <label className="w-20 font-medium">Stock</label>
            <div className="relative flex items-center w-32 bg-gray-200 p-2 rounded">
              <input
                type="number"
                className="bg-transparent w-full outline-none"
                disabled
              />
              {/* <Pencil className="w-4 h-4 text-gray-600 cursor-pointer" /> */}
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <label className="w-20 font-medium">Category</label>
            <select
              className="w-32 bg-gray-200 p-2 rounded cursor-not-allowed"
              disabled
            >
              <option>Food</option>
              <option>Accessories</option>
              <option>Animals</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <label className="w-20 font-medium">Rating</label>
            <div className="flex gap-1 text-yellow-400 text-xl">
              {Array(5)
                .fill("★")
                .map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
            </div>
          </div>

          {/* REMOVE button */}
          <button className="text-red-600 font-semibold hover:underline">
            REMOVE
          </button>
        </div>

        {/* Right Column */}
        <div className="space-y-3 h-[70vh]">
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-200 p-2 rounded pr-8"
                disabled
              />
              {/* <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-600 cursor-pointer" /> */}
            </div>
          </div>

          {/* Product Price */}
          <div>
            <label className="block font-medium mb-1">Product Price</label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-200 p-2 rounded pr-8"
                disabled
              />
              {/* <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-600 cursor-pointer" /> */}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label className="block font-medium ">Product Description</label>
            <div className="relative">
              <textarea
                className="w-full h-32 bg-gray-200 p-2 rounded pr-8"
                disabled
              />
              {/* <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-600 cursor-pointer" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end ">
        <button className="text-green-600 font-semibold hover:underline">
          CLOSE
        </button>
      </div>
    </div>
  );
}
