"use client"; // ✅ Ensure the component runs only on the client

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GoogleMapComponent from "@/components/maps/GoogleMaps";

// ✅ Dynamically import `SimpleMap` to avoid SSR issues
const SimpleMap = dynamic(() => import("@/components/maps/SimpleMap"), {
  ssr: false,
});
const MapsTest = dynamic(() => import("@/components/maps/MapsTest"), {
  ssr: false,
});

const Page = () => {
  const [pickup, setPickup] = useState("khargpur");
  const [destination, setDestination] = useState("kolkata");
  return (
    <div className="w-[95%] h-full gap-10 mx-auto py-5 flex">
      {/* Booking Section */}
      <div className="booking w-[30%] border-2 border-black">
        {/* 📌 Address Inputs */}
        <div className="flex gap-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* 📌 Get Route Button */}
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Get Route
        </button>
      </div>

      {/* Map Section */}
      <div className="map grow border-2 border-red-500 rounded-xl">
        {/* <SimpleMap /> */}
        <MapsTest pickup={pickup} destination={destination} />
      </div>
    </div>
  );
};

export default Page;
