"use client"; // ✅ Ensure the component runs only on the client
import React, { useState } from "react";
import RideBook from "@/components/maps/RideBook";
import Script from "next/script";
import GoogleMaps from "@/components/maps/GoogleMaps";

const Page = () => {
  const [pickupLocation, setPickupLocation] =
    useState<google.maps.LatLngLiteral | null>({ lat: 123, lng: 123 });
  const [destinationLocation, setDestinationLocation] =
    useState<google.maps.LatLngLiteral | null>({ lat: 123, lng: 123 });

  return (
    <div className="w-[95%] h-full  gap-10 mx-auto py-5 flex">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {/* Booking Section */}
      <RideBook
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
        setPickupLocation={setPickupLocation}
        setDestinationLocation={setDestinationLocation}
      />

      {/* Map Section */}
      <div className="map grow border-2 border-[#e45200] rounded-xl">
        {/* <GoogleMaps
          pickupLocation={pickupLocation}
          destinationLocation={destinationLocation}
        /> */}
      </div>
    </div>
  );
};

export default Page;
