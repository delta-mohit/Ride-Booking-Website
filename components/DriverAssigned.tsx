"use client";
import { FaCar, FaStar, FaTimes } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { DRIVERS } from "@/utils/staticData";
import { useEffect, useState } from "react";
const DriverAssigned = () => {
  const [driver, setDriver] = useState({
    id: 0,
    name: "Loading...",
    carModel: "Loading...",
    carNumber: "Loading...",
    rating: 0,
    phone: "Loading",
    eta: 0,
  });
  useEffect(() => {
    setDriver(DRIVERS[Math.floor(Math.random() * DRIVERS.length)]);
  }, []);

  return (
    <div
      className="w-[350px] h-full rounded-xl border shadow-sm flex flex-col gap-4 overflow-y-scroll no-scrollbar items-center p-6 
        transition-all duration-700 ease-in-out"
    >
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          🚖 Your Driver is on the Way!
        </h2>

        {/* Driver Profile */}
        <div className="flex flex-col items-center mt-4">
          <div className="h-20 w-20 rounded-full">
            <Image
              src={"/driver.png"}
              width={80}
              height={80}
              alt="Driver Profile"
              className="rounded-full w-full h-full object-cover border-2 border-orange-500"
            />
          </div>
          <h3 className="mt-2 text-lg font-bold">{driver.name}</h3>
          <div className="flex items-center text-yellow-500 mt-1">
            <FaStar className="mr-1" />
            <span className="text-sm font-medium">{driver.rating} / 5.0</span>
          </div>
        </div>

        {/* Car Details */}
        <div className="bg-orange-100 p-3 rounded-lg mt-4 flex items-center">
          <FaCar className="text-orange-600 text-xl mr-3" />
          <div>
            <p className="text-gray-800 font-semibold">{driver.carModel}</p>
            <p className="text-gray-600 text-sm">{driver.carNumber}</p>
          </div>
        </div>

        {/* ETA & Contact */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-700 text-lg">
            ⏳ ETA: <span className="font-bold">{driver.eta} min</span>
          </p>
          <Link
            href={`/features/chat`}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <LuMessageCircle size={20} className="mr-2" /> Message
          </Link>
        </div>

        {/* Cancel Ride */}
        <button className="mt-5 w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
          <FaTimes className="mr-2" /> Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default DriverAssigned;
