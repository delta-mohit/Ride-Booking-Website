"use client"; // ✅ Ensure the component runs only on the client
import React, { useState } from "react";
import dynamic from "next/dynamic";
import getLocationSuggestion from "@/lib/getLocationSuggestion";
import { Input } from "@/components/ui/input";
import LocationSearch from "@/components/LocationSearch";
import RideBook from "@/components/maps/RideBook";

// ✅ Dynamically import `MapsTest` to avoid SSR issues
const MapsTest = dynamic(() => import("@/components/maps/MapsTest"), {
  ssr: false,
});

const Page = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const handleLocationInput = async (query: string, type: string) => {
    const data = await getLocationSuggestion(query);
    if (type == "pickup") {
      console.log("Pickup Suggestions :- ", data);
    } else {
      console.log("Pickup Suggestions :- ", data);
    }
  };
  return (
    <div className="w-[95%] h-full  gap-10 mx-auto py-5 flex">
      {/* Booking Section */}
      <RideBook />

      {/* Map Section */}
      <div className="map grow border-2 border-[#e45200] rounded-xl">
        <MapsTest pickup={pickup} destination={destination} />
      </div>
    </div>
  );
};

export default Page;
