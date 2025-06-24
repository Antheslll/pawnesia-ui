"use client";
import { profileInfoFetcher } from "@/lib/fetcher/profile/profileInfoFetcher";
import { sendNewProfileFetcher } from "@/lib/fetcher/profile/sendNewProfileFetcher";
import { ProfileInfoProps } from "@/types";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfoProps>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    const takeUserInfo = async () => {
      try {
        const response = await profileInfoFetcher(
          "http://localhost:5000/api/users/me",
          token
        );

        if (!response) {
          throw new response();
        } else {
          setProfileInfo({
            firstName: response?.data?.first_name,
            lastName: response?.data?.last_name,
            phoneNumber: response?.data?.phone_number,
            address: response?.data?.address,
            email: response?.data?.email,
          });
          return;
        }
      } catch (err) {
        console.error("Error: ", err);
        return err;
      }
    };

    takeUserInfo();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendNewProfile = async () => {
    try {
      const data = {
        firstName: profileInfo.firstName,
        lastName: profileInfo.lastName,
        phoneNumber: profileInfo.phoneNumber,
        address: profileInfo.address,
      };

      const token = localStorage.getItem("auth_token");

      const response = await sendNewProfileFetcher(
        "http://localhost:5000/api/profile/user/edit",
        data,
        token
      );

      console.log(response);

      return response;
    } catch (err) {
      console.log("Error: ", err);
      return err;
    }
  };

  return (
    <section className="bg-white shadow-md p-6 rounded-md">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Profile</h2>
        <button
          className="text-blue-600 text-sm"
          onClick={() => {
            setIsEdit((prev) => !prev);
          }}
        >
          {!isEdit ? (
            <span onClick={sendNewProfile}>Done</span>
          ) : (
            <span>Edit</span>
          )}
        </button>
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
            name="firstName"
            value={profileInfo.firstName}
            placeholder="First Name"
            className="border-2 h-[7vh] pl-3"
            onChange={handleChange}
            disabled={isEdit}
          />
          <input
            type="text"
            name="lastName"
            value={profileInfo.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="border-2 h-[7vh] pl-3"
            disabled={isEdit}
          />
          <input
            type="email"
            name="email"
            value={profileInfo.email}
            placeholder="Email"
            disabled={true}
            className="border-2 h-[7vh] pl-3"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={profileInfo.phoneNumber}
            onChange={handleChange}
            className="border-2 h-[7vh] pl-3"
            disabled={isEdit}
          />

          <textarea
            placeholder="Address"
            name="address"
            value={profileInfo.address}
            onChange={handleChange}
            className="border-2 pl-3 pt-3 col-span-2 h-20 resize-none"
            disabled={isEdit}
          />
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
