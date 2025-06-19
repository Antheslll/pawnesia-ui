const UserInfo = () => {
  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Profile</h2>
        <a href="#" className="text-blue-600 text-sm">
          Edit
        </a>
      </div>

      <div className="mt-4 flex gap-6">
        <div className="flex flex-col items-center w-40">
          <div className="w-[10vw] h-[10vw] bg-black rounded-full"></div>
          <p className="mt-2 font-semibold">Anthony Liem</p>
          <span className="text-sm text-gray-500">customer</span>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 gap-y-7">
          <input
            type="text"
            placeholder="First Name"
            className="border-2 h-[7vh] pl-3"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border-2 h-[7vh] pl-3"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 h-[7vh] pl-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 h-[7vh] pl-3"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border-2 h-[7vh] pl-3 col-span-2"
          />
          <textarea
            placeholder="Address"
            className="border-2 pl-3 pt-3 col-span-2 h-20 resize-none"
          />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
