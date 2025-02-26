"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaCamera, FaEdit, FaSave } from "react-icons/fa";
import { fetchUserData } from "@/lib/getUserDetails";
import { rideStats } from "@/utils/staticData";
export default function Profile() {
  const [user, setUser] = useState({
    name: "Loading...",
    userName: "Loading...",
    email: "Loading...",
    phone: "Loading...",
  });
  // Function to fetch user data only when needed
  const loadUserData = useCallback(async () => {
    const userData = await fetchUserData();
    if (userData) {
      setUser({
        name: userData.firstName + " " + userData.lastName,
        userName: userData.username,
        email: userData.email,
        phone: userData.phone,
      });
    }
  }, []); // No dependencies, runs only on mount

  useEffect(() => {
    loadUserData(); // Call function when component mounts
  }, [loadUserData]);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-screen overflow-auto no-scrollbar p-6 flex flex-col justify-evenly lg:flex-row gap-6">
      {/* Left Side - Profile Details */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-[45%]">
        <h2 className="text-xl font-semibold mb-4">Profile Management</h2>
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="relative w-24 h-24">
            <div className="w-full h-full">
              <Image
                src={"/profile.jpg"}
                alt="User Avatar"
                width={80}
                height={80}
                className="rounded-full border h-full w-full object-cover scale-105 border-gray-300"
              />
            </div>
            {/* Upload Button */}
            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer">
              <FaCamera size={14} />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Profile Info & Edit Mode */}
        <div className="mt-4 space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-500 rounded-md mt-1  text-xs lg:text-lg"
                />
              </div>

              {/* User Name */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={user.userName}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-500 rounded-md mt-1  text-xs lg:text-lg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-500 rounded-md mt-1 text-xs lg:text-lg"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="w-full p-1 border border-gray-500 rounded-md mt-1  text-xs lg:text-lg"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 ">
              {/* Full Name */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-xs p-1 mt-1 lg:text-lg font-medium overflow-auto">
                  {user.name}
                </p>
              </div>

              {/* User Name */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  User Name
                </label>
                <p className="text-xs p-1 mt-1 lg:text-lg font-medium overflow-auto">
                  {user.userName}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-xs p-1 mt-1 lg:text-lg font-medium overflow-auto">
                  {user.email}
                </p>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-xs lg:text-sm font-medium text-gray-500">
                  Mobile Number
                </label>
                <p className="text-xs p-1 mt-1 lg:text-lg font-medium overflow-auto">
                  {user.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Edit & Save Button */}
        <button
          className="w-full mt-4 p-2 rounded-md text-white flex items-center justify-center gap-2
                     bg-orange-500 hover:bg-orange-600 transition-all"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* Right Side - Ride Statistics */}
      <div className="w-full p-6 shadow-md rounded-lg lg:w-[45%]">
        <h2 className="text-xl font-semibold mb-4">Ride Statistics</h2>
        <div className="grid grid-cols-2 gap-4 place-items-center">
          {rideStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 lg:w-3/4 rounded-lg shadow-md text-center"
            >
              <div className="text-3xl">{stat.icon}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
