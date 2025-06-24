const SidebarSellerDashboard = () => {
  return (
    <aside className="w-[10%] bg-white p-4 flex flex-col items-center">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-gray-700">Sellers point</h1>
      </div>
      <button className="mt-auto text-gray-600 hover:text-red-500">
        Logout
      </button>
    </aside>
  );
};

export default SidebarSellerDashboard;
