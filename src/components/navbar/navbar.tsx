import { CartIcon, MailIcon } from "@/svg-assets/cart-icon";
import { SearchIcon } from "@/svg-assets/search-icon";
import Sidebar from "./sidebar";

const Navbar = () => {
  return (
    <nav className="w-full h-[15vh] grid grid-cols-[10%_90%]">
      <Sidebar />
      <div className="w-full h-full flex-centered"></div>
      <div className=" grid grid-cols-[30%_40%_10%_15%]">
        <ul className=" flex flex-row text-[8px] gap-3 flex-centered poppins-font font-bold gray-blue-text-color">
          <li>ALL</li>
          <li>FOOD</li>
          <li>ACCESSORIES</li>
          <li>ANIMALS</li>
        </ul>
        <div className="w-full h-full  flex items-center">
          <input
            type="text"
            className="w-[90%] h-[8vh] bg-white gray-blue-text-color text-[10px] focus:outline-none pl-2"
            placeholder="Find everything your pet needs..."
          />
          <div className="absolute ml-[29%]">
            <SearchIcon />
          </div>
        </div>
        <div className="flex-centered gap-3">
          <CartIcon />
          <MailIcon />
        </div>
        <div className="w-full h-full flex-centered">
          <div className="bg-white w-[30px] h-[30px] rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
