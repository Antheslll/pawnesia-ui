import ItemCart from "./itemCart";

const Cart = () => {
  return (
    <div className="w-full h-[100vh] fixed z-40 bg-black/50 flex-centered">
      <div className="w-[60%] h-[70vh] bg-white flex flex-col items-center">
        <div className="w-[80%] h-[10vh] grid grid-cols-2 border-b-2">
          <div className="flex items-center pl-5">
            <h2 className="text-[25px] poppins-font font-bold">Cart</h2>
          </div>
          <div className="flex justify-end items-center pr-5">
            <span className="text-[23px] poppins-font font-bold">1 Items</span>
          </div>
        </div>
        <div className="w-[80%] h-[40vh] pt-5">
          <ItemCart />
        </div>
        <div className="w-[80%] h-[20vh] grid grid-cols-2 border-t-2">
          <div className="flex pl-5">
            <h2 className="text-[15px] nunito-font">1 Items selected</h2>
          </div>
          <div className="flex flex-col items-end justify-between pr-5 pb-5">
            <span className="text-[15px] nunito-font">Rp.00.000.000,-</span>
            <button className="w-[60%] h-[8vh] button-background-color poppins-font font-bold text-white">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
