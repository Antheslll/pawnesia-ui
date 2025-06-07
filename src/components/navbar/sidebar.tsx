import {
  DashboardIcon,
  HistoryIcon,
  HomeIcon,
} from "@/svg-assets/sidebar-icon";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="fixed w-[10%] h-[100vh] flex flex-col gap-2">
      <div className="w-full flex-centered">
        <Image
          src="/logo/pawnesia-logo.png"
          className="w-[70px] h-[70px]"
          alt="pawnesia-logo"
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-full scale-[50%] flex-centered">
        <HomeIcon />
      </div>
      <div className="w-full scale-[50%] flex-centered">
        <DashboardIcon />
      </div>
      <div className="w-full scale-[50%] flex-centered">
        <HistoryIcon />
      </div>
    </div>
  );
};

export default Sidebar;
