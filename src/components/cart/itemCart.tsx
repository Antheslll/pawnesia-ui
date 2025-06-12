const ItemCart = () => {
  return (
    <div className="w-full h-[10vh] grid grid-cols-[5%_40%_15%_20%_20%]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <input type="checkbox" />
        <span className="text-red-500 font-bold poppins-font">X</span>
      </div>
      <div className="w-full h-full bg-white flex items-center gap-3">
        <div className="w-[3vw] h-[3vw] bg-yellow-400"></div>
        <div className="w-auto h-[3vw]">
          <span className="text-[13px]">Product name</span>
        </div>
      </div>
      <div className="flex-centered  gap-1">
        <button className="w-[20%] border-2 border-gray-600">-</button>
        <input type="number" className="w-[50%] border-2 border-gray-600" />
        <button className=" w-[20%] border-2 border-gray-600">+</button>
      </div>
      <div className="flex-centered">
        <span>price</span>
      </div>
      <div className="flex-centered">
        <span>price</span>
      </div>
    </div>
  );
};

export default ItemCart;
