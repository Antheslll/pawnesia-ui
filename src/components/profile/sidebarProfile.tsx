import {
  DashboardIcon,
  HistoryIcon,
  HomeIcon,
} from "@/svg-assets/sidebar-icon";
import Image from "next/image";
import Link from "next/link";

const SidebarProfile = () => {
  return (
    <aside className="w-[10%]  text-white flex flex-col items-center py-4 space-y-6">
      <div className="text-2xl font-bold">
        <Image
          src="/logo/pawnesia-logo.png"
          alt="logo pawnesia"
          width={1000}
          height={1000}
        />
      </div>
      <nav className="flex flex-col space-y-4 text-xl">
        <Link href="/">
          <HomeIcon />
        </Link>
        <Link href="/profile">
          <DashboardIcon />
        </Link>
        <Link href="">
          <HistoryIcon />
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarProfile;
