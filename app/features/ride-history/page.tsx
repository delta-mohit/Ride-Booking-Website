"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ✅ Dummy ride history data
const rideHistoryData = [
  {
    id: 1,
    rider: "Joe Beer",
    riderImage: "/driver.png",
    date: "14 Sept 2023 at 08:30 AM",
    driver: "Ellen Tromp",
    vehicle: "Sedan",
    status: "Booked",
    fare: "$885.00",
  },
  {
    id: 2,
    rider: "Heather Ullrich",
    riderImage: "/driver.png",
    date: "15 Sept 2023 at 02:00 AM",
    driver: "Ellen Hill",
    vehicle: "MPV",
    status: "Cancel",
    fare: "$885.00",
  },
  {
    id: 3,
    rider: "Heather Walsh",
    riderImage: "/driver.png",
    date: "15 Sept 2023 at 12:30 PM",
    driver: "Howard G.",
    vehicle: "Mini",
    status: "Completed",
    fare: "$885.00",
  },
  {
    id: 4,
    rider: "Jared Wyman",
    riderImage: "/driver.png",
    date: "15 Sept 2023 at 02:00 AM",
    driver: "Coll Tromp",
    vehicle: "MPV",
    status: "Cancel",
    fare: "$885.00",
  },
  {
    id: 5,
    rider: "Micheal Hessel",
    riderImage: "/driver.png",
    date: "14 Sept 2023 at 08:30 AM",
    driver: "Sam Effertz",
    vehicle: "Sedan",
    status: "Booked",
    fare: "$885.00",
  },
  {
    id: 6,
    rider: "Lauren Price",
    riderImage: "/driver.png",
    date: "15 Sept 2023 at 02:00 AM",
    driver: "Miss Merle",
    vehicle: "MPV",
    status: "Cancel",
    fare: "$885.00",
  },
  {
    id: 7,
    rider: "Micheal Hessel",
    riderImage: "/driver.png",
    date: "14 Sept 2023 at 08:30 AM",
    driver: "Sam Effertz",
    vehicle: "Sedan",
    status: "Booked",
    fare: "$885.00",
  },
  {
    id: 8,
    rider: "Lauren Price",
    riderImage: "/driver.png",
    date: "15 Sept 2023 at 02:00 AM",
    driver: "Miss Merle",
    vehicle: "MPV",
    status: "Cancel",
    fare: "$885.00",
  },
];

export default function RideHistory() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // 📌 Detect screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📌 Filter rides based on status & search input
  const filteredRides = rideHistoryData.filter(
    (ride) =>
      (filterStatus === "All" || ride.status === filterStatus) &&
      ride.rider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full lg:w-[82%] xl:w-[90%] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">📜 Ride History</h2>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[200px] focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Status Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-[150px] cursor-pointer focus:ring-2 focus:ring-orange-400"
        >
          <option value="All">All</option>
          <option value="Booked">Booked</option>
          <option value="Completed">Completed</option>
          <option value="Cancel">Cancel</option>
        </select>

        {/* Date Filter (Optional) */}
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto cursor-pointer focus:ring-2 focus:ring-orange-400"
        />

        {/* Reset Filters Button */}
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
          onClick={() => {
            setSearch("");
            setFilterStatus("All");
          }}
        >
          Reset Filter
        </button>
      </div>

      {/* 📌 Ride History Table (Desktop View) */}
      {!isMobile ? (
        <div className="overflow-x-auto overflow-y-scroll no-scrollbar border-2 border-[#e45200] h-[70%]">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg relative">
            <thead className="sticky -top-[0.2px]">
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Sr.</th>
                <th className="py-3 px-4 text-left">Rider</th>
                <th className="py-3 px-4 text-left">Booking Date</th>
                <th className="py-3 px-4 text-left">Driver</th>
                <th className="py-3 px-4 text-left">Vehicle</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Fare</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride, index) => (
                  <tr key={ride.id} className="border-t hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <Image
                        src={ride.riderImage}
                        alt={ride.rider}
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                      />
                      {ride.rider}
                    </td>
                    <td className="py-3 px-4">{ride.date}</td>
                    <td className="py-3 px-4">{ride.driver}</td>
                    <td className="py-3 px-4">{ride.vehicle}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        ride.status === "Completed"
                          ? "text-green-600"
                          : ride.status === "Cancel"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {ride.status}
                    </td>
                    <td className="py-3 px-4 font-semibold">{ride.fare}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No rides found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* 📌 Mobile View (Stacked Cards) */
        <div className="space-y-4 h-[65%] overflow-y-scroll no-scrollbar border-2 border-[#e45200]">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <div
                key={ride.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={ride.riderImage}
                    alt={ride.rider}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {ride.rider}
                    </h3>
                    <p className="text-gray-500 text-sm">{ride.date}</p>
                    <p className="text-gray-500 text-sm">
                      🚗 {ride.vehicle} | 🏁 {ride.driver}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span
                    className={`text-sm font-medium ${
                      ride.status === "Completed"
                        ? "text-green-600"
                        : ride.status === "Cancel"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {ride.status}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {ride.fare}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No rides found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 font-medium">
        <button className="text-orange-500 font-medium hover:underline">
          Previous
        </button>
        <div className="flex gap-6">
          <button className="bg-orange-500 text-white px-3 py-1 rounded">
            1
          </button>
          <button className="text-gray-700 hover:underline hover:text-orange-500">
            2
          </button>
          <button className="text-gray-700 hover:underline hover:text-orange-500">
            3
          </button>
        </div>
        <button className="text-orange-500 font-medium hover:underline">
          Next
        </button>
      </div>
    </div>
  );
}
