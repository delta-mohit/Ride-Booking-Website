"use client"; // ✅ Ensure the component runs only on the client
import React, { ReactNode, useState } from "react";
import RideBook from "@/components/maps/RideBook";
import Script from "next/script";
import GoogleMaps from "@/components/maps/GoogleMaps";

const Page = () => {
  const [pickupLocation, setPickupLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [destinationLocation, setDestinationLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  //Yaha se tak ka code sahi hai

  return (
    <div className="w-[95%] h-full gap-10 mx-auto py-5 flex ">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="flex flex-col-reverse items-center  gap-5 lg:flex-row h-full w-full">
        <div className="h-1/2 lg:h-full">
          <RideBook
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
            setPickupLocation={setPickupLocation}
            setDestinationLocation={setDestinationLocation}
          />
        </div>
        <div className="map w-full h-1/2 lg:h-full lg:grow border-2 border-[#e45200] rounded-xl -z-10">
          {console.log("Page Rerender") as ReactNode}
          <GoogleMaps
            pickupLocation={pickupLocation}
            destinationLocation={destinationLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
